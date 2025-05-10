import { Request, Response, NextFunction } from "express";
import { StudentModel } from "../../../models/student.model";
import mongoose from "mongoose";
import { InfoModel } from "../../../models/info.model";
import fs from "fs";
import { imageUrlToBase64 } from "../../../utils/imageURLToBase64";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import puppeteer from "puppeteer";
import JSZip from "jszip";
import { generateCertificate } from "../../../template/generateCertificate";

const renderHtmlToPDF = async (html: string): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  });

  await browser.close();
  return Buffer.from(pdfBuffer);
};

export const genereateCertificateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const trainingId = req.params.trainingId;
  const info = await InfoModel.findOne({});

  if (!info) {
    return next(
      new ErrorResponse(ErrorType.INTERNAL_ERROR, "Internal Server Error", "")
    );
  }

  const data = await StudentModel.aggregate([
    {
      $match: {
        trainingId: new mongoose.Schema.ObjectId(trainingId),
      },
    },
    {
      $lookup: {
        from: "trainings",
        localField: "trainingId",
        foreignField: "_id",
        as: "trainingData",
      },
    },
    {
      $unwind: {
        path: "$trainingData",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        trainingAtcId: "$trainingData.atcId",
      },
    },
    {
      $lookup: {
        from: "atcs",
        localField: "trainingAtcId",
        foreignField: "_id",
        as: "atcData",
      },
    },
    {
      $unwind: {
        path: "$atcData",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        collegeId: "$atcData.collegeID",
      },
    },
    {
      $lookup: {
        from: "colleges",
        localField: "collegeId",
        foreignField: "_id",
        as: "collegeData",
      },
    },
    {
      $unwind: {
        path: "$collegeData",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "managers",
        localField: "trainingAtcId",
        foreignField: "listOfATC",
        as: "managerData",
      },
    },
    {
      $unwind: {
        path: "$managerData",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        student: {
          studentName: "$name",
          studentCollegeName: "$studentCollegeName",
          qrLink: "$_id",
        },
        common: {
          trainingTitle: "$trainingData.title",
          startDate: "$trainingData.startDate",
          endDate: "$trainingData.endDate",
          college: "$collegeData.collegeName",
          atcCity: "$collegeData.collegeCity",
          directorName: "$collegeData.nameOfHOD",
          directorDesignation: "Director",
          managerName: "$managerData.name",
          directorSignature: "$collegeData.hodSignature",
          managerSignature: "$collegeData.managerSignature",
          collegeLogo: "$collegeData.collegeLogo",
        },
      },
    },
    {
      $group: {
        _id: null,
        commonData: { $first: "$common" },
        students: { $push: "$student" },
      },
    },
    {
      $project: {
        _id: 0,
        commonData: 1,
        students: 1,
      },
    },
  ]);

  if (!data || data.length === 0) {
    return next(
      new ErrorResponse(ErrorType.INTERNAL_ERROR, "Internal Server Error", "")
    );
  }

  const commonData: CommonData = data[0].commonData;
  const students = data[0].students;
  const [
    mitsubishiHeadSignature,
    directorSignature,
    coordinatorSignature,
    collegeLogo,
  ] = await Promise.all([
    imageUrlToBase64(info.signatureOfMitsubhiHead),
    imageUrlToBase64(commonData.directorSignature),
    imageUrlToBase64(commonData.managerSignature),
    imageUrlToBase64(commonData.collegeLogo),
  ]);

  const zip = new JSZip();

  for (const student of students) {
    const html = generateCertificate(student, commonData, {
      collegeLogo,
      coordinator: coordinatorSignature,
      director: directorSignature,
      mitDesignation: info.designationOfMitsubhiHead,
      mitHead: mitsubishiHeadSignature,
      mitHeadName: info.nameOfMitsubishiHead,
    });
    const imageBuffer = await renderHtmlToPDF(html);

    const fileName = `${student.studentName.replace(
      /\s+/g,
      "_"
    )}_certificate.png`;
    zip.file(fileName, imageBuffer);
  }

  const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
  res.set({
    "Content-Type": "application/zip",
    "Content-Disposition": 'attachment; filename="certificates.zip"',
  });

  res.send(zipBuffer);
};
