import axios from "axios";
import * as XLSX from "xlsx";

export const readExcelFromUrl = async (fileUrl: string) => {
  try {
    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
    const workbook = XLSX.read(response.data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" }) as Record<
      string,
      any
    >[];

    return jsonData;
  } catch (error) {
    console.error("Error reading Excel file from URL:", error);
    throw new Error("Failed to fetch or parse Excel file.");
  }
};
