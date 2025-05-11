import { NextFunction, Request, Response } from "express";
import JSZip from "jszip";
import mongoose from "mongoose";
import puppeteer, { Browser } from "puppeteer";
import { InfoModel } from "../../../models/info.model";
import { StudentModel } from "../../../models/student.model";
import { generateCertificate } from "../../../template/generateCertificate";
import { ErrorResponse, ErrorType } from "../../../utils/customError";
import { imageUrlToBase64 } from "../../../utils/imageURLToBase64";
import qrCode from "qrcode";

const renderHtmlToPNG = async (
  html: string,
  browser: Browser
): Promise<Buffer> => {
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 1700,
    deviceScaleFactor: 2,
  });
  await page.setContent(html, { waitUntil: "networkidle0" });
  const imageBuffer = await page.screenshot({
    type: "png",
    fullPage: true,
  });
  await page.close();
  return Buffer.from(imageBuffer);
};

export const genereateCertificateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trainingId = req.params.trainingId;
    const info = await InfoModel.findOne({});
    const protocol = req.protocol;
    const host = req.get("host");

    if (!info) {
      return next(
        new ErrorResponse(ErrorType.INTERNAL_ERROR, "Internal Server Error", "")
      );
    }

    const data = await StudentModel.aggregate([
      {
        $match: {
          trainingId: new mongoose.Types.ObjectId(trainingId),
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
      { $unwind: "$trainingData" },
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
      { $unwind: "$atcData" },
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
      { $unwind: "$collegeData" },
      {
        $lookup: {
          from: "managers",
          localField: "trainingAtcId",
          foreignField: "listOfATC",
          as: "managerData",
        },
      },
      { $unwind: "$managerData" },
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
      { $project: { _id: 0, commonData: 1, students: 1 } },
    ]);

    if (!data || data.length === 0) {
      return next(
        new ErrorResponse(ErrorType.INTERNAL_ERROR, "No student data found", "")
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

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const certificatePromises = students.map(async (student: any) => {
      const urlLink = `${protocol}://${host}/verify/${student.qrLink}`;
      const qrcodeImg = await qrCode.toDataURL(urlLink);

      const html = generateCertificate(student, commonData, {
        collegeLogo,
        coordinator: coordinatorSignature,
        director: directorSignature,
        mitDesignation: info.designationOfMitsubhiHead,
        mitHead: mitsubishiHeadSignature,
        mitHeadName: info.nameOfMitsubishiHead,
        qrCodeImage: qrcodeImg,
      });

      const imageBuffer = await renderHtmlToPNG(html, browser);

      const fileName = `${student.studentName.replace(
        /\s+/g,
        "_"
      )}_certificate.png`;
      return { fileName, imageBuffer };
    });

    const results = await Promise.all(certificatePromises);
    await browser.close();

    results.forEach(({ fileName, imageBuffer }) => {
      zip.file(fileName, imageBuffer);
    });

    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="certificates.zip"',
    });

    return res.status(200).send(zipBuffer);
  } catch (error) {
    console.log((error as Error).message, "thhis is the error ");
    return next(
      new ErrorResponse(
        ErrorType.INTERNAL_ERROR,
        "Certificate generation failed",
        ""
      )
    );
  }
};
