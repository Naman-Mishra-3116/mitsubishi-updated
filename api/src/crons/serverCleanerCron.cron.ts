import fs from "fs";
import cron from "node-cron";
import path from "path";
import { AdminUser } from "../models/adminUser.model";
import { ATC } from "../models/atc.model";
import { CollegeModel } from "../models/college.model";
import { InfoModel } from "../models/info.model";
import { Training } from "../models/training.model";

const getAllUsedFiles = async (): Promise<Set<string>> => {
  const [adminImages, atcImages, collegeImages, infoImages, trainingImages] =
    await Promise.all([
      AdminUser.find({}, { profileImage: 1 }).lean(),
      ATC.find({}, { atcImage: 1 }).lean(),
      CollegeModel.find(
        {},
        { collegeLogo: 1, managerSignature: 1, hodSignature: 1 }
      ).lean(),
      InfoModel.find(
        {},
        { signatureOfMitsubhiHead: 1, calenderLink: 1 }
      ).lean(),
      Training.find({}, { trainingImages: 1 }).lean(),
    ]);

  const allFiles = [
    ...adminImages.map((i) => i.profileImage).filter(Boolean),
    ...atcImages.map((i) => i.atcImage).filter(Boolean),
    ...collegeImages.map((i) => i.collegeLogo).filter(Boolean),
    ...collegeImages.map((i) => i.managerSignature).filter(Boolean),
    ...collegeImages.map((i) => i.hodSignature).filter(Boolean),
    ...infoImages.map((i) => i.signatureOfMitsubhiHead).filter(Boolean),
    ...infoImages.map((i) => i.calenderLink).filter(Boolean),
    ...trainingImages.flatMap((doc) => doc.trainingImages).filter(Boolean),
  ];

  const fileNames = allFiles.map((url) => url?.split("/").pop()!);

  return new Set(fileNames);
};

const STORAGE_PATH = path.join(__dirname, "../../../uploads/:folder");

type FolderName = "pdfs" | "images";

const deleteUnusedFilesFrom = (
  folderName: FolderName,
  usedFiles: Set<string>
) => {
  const folderLocation = STORAGE_PATH.replace(":folder", folderName);
  if (!fs.existsSync(folderLocation)) {
    console.warn(`Folder not found: ${folderLocation}`);
    return;
  }

  const files = fs.readdirSync(folderLocation);

  for (const file of files) {
    if (!usedFiles.has(file)) {
      const filePath = path.join(folderLocation, file);
      console.log("file deleted: ", file);
      fs.unlinkSync(filePath);
    }
  }
};

cron.schedule("*/10 * * * *", async () => {
  console.log("Cron job started for cleaning unused files...");

  try {
    const usedFiles = await getAllUsedFiles();
    deleteUnusedFilesFrom("images", usedFiles);
    deleteUnusedFilesFrom("pdfs", usedFiles);
    console.log("Cleanup job finished successfully.");
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
});
