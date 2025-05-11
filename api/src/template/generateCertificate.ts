import { MITSUBISHI_LOGO } from "./getMitsubishiLogo";
import moment from "moment";

export const generateCertificate = (
  student: Student,
  commonData: CommonData,
  imageAndMitsubishiData: {
    mitHead: string;
    director: string;
    coordinator: string;
    collegeLogo: string;
    mitDesignation: string;
    mitHeadName: string;
    qrCodeImage: string;
  }
) => {
  const startDate = moment(commonData.startDate).format("DD MMM");
  const endDate = moment(commonData.endDate).format("DD MMM YYYY");
  const today = moment().format("DD-MMM-YYYY");
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Certificate of Participation</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: 'Times New Roman', serif;
      background-color: #f5f5f5;
    "
  >
    <div
      style="
        width: 1100px;
        margin: 50px auto;
        padding: 40px;
        background-color: #ffffff;
        border: 10px double #bfa14c;
        outline: 10px solid #ec1a0f;
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        position: relative;
      "
    >
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        "
      >
        <img
          src=${imageAndMitsubishiData.collegeLogo}
          alt="University Logo"
          style="
            position: absolute;
            top: 14px;
            left: 30px;
            height: 130px;
            width: 150px;
            object-fit: contain;
            margin-right: 20px;
          "
        />

        <img
          src=${MITSUBISHI_LOGO}
          alt="Mitsubishi Logo"
          style="
            position: absolute;
            height: 130px;
            object-fit: contain;
            width: 160px;
            top: 2px;
            right: 30px;
          "
        />
        <div
          style="
            background-color: #ec1a0f;
            color: white;
            position: absolute;
            width: 150px;
            font-size: 12px;
            top: 120px;
            right: 32px;
            font-family: Arial;
            padding: 2px;
            text-align: center;
            font-weight: 600;
          "
        >
          <span>KNOWLEDGE PARTNER</span>
        </div>
      </div>

      <div style="flex-grow: 1; text-align: center">
        <h1
          style="
            font-family: 'Old English Text MT', serif;
            font-size: 52px;
            color: #003366;
            margin: 0;
            border-bottom: 2px solid #003366;
            display: inline-block;
            padding-bottom: 5px;
          "
        >
          Certificate of Participation
        </h1>
      </div>
      <div
        style="
          font-size: 20px;
          line-height: 1.7;
          text-align: justify;
          padding: 0 15px;
          margin-top: 58px;
        "
      >
        <p>
          This is to certify that <strong>${
            student.studentName
          }</strong>, a student from
          <strong>${
            student.studentCollegeName
          }</strong>, has successfully attended a
          <strong>Training Program</strong> on
          <strong>“ ${commonData.trainingTitle} ”</strong> from
          <strong>${startDate} – ${endDate}</strong>.
        </p>
        <p>
          The program was conducted in collaboration with
          <strong>Mitsubishi Electric India</strong> (Authorised Training Center
          – Factory Automation) at <strong style="text-transform: capitalize;">${commonData.college.toLowerCase()}, ${
    commonData.atcCity
  }</strong>.
        </p>

        <pi style="color: #d62828fc; font-weight: bold; font-size: 18px">
          Issue Date: ${today}
        </pi  
      </div>

      <div
        style="
          display: flex;
          justify-content: space-evenly;
          text-align: center;
          font-size: 14px;
          margin-top: 80px;
        "
      >
        <div style="width: 30%; position: relative">
          <img
            src=${imageAndMitsubishiData.mitHead}
            style="
              position: absolute;
              width: 150px;
              height: 80px;
              top: -65px;
              left: 80px;
            "
          />
          <div style="margin-bottom: 10px">_________________________</div>
          <strong style="color: #d62828fc; font-weight: bolder"
>${imageAndMitsubishiData.mitHeadName}</strong
          ><br />
${imageAndMitsubishiData.mitDesignation}<br />
<strong style="color: black; font-weight: bolder"
>Mitsubishi Electric India Pvt. Ltd.</strong>
          
        </div>
        <div style="width: 30%; position: relative">
          <img
            src=${imageAndMitsubishiData.director}
            style="
              position: absolute;
              width: 150px;
              height: 80px;
              top: -65px;
              left: 80px;
            "
          />
          <div style="margin-bottom: 10px">_________________________</div>
          <strong style="color: #d62828fc; font-weight: bolder"
>${commonData.directorName}</strong
          ><br />
         ${commonData.directorDesignation}<br />

         <strong style="color: black; font-weight: bolder; text-transform: capitalize;"
>${commonData.college.toLowerCase()}</strong>
         
        </div>
        <div style="width: 30%; position: relative">
          <img
            src=${imageAndMitsubishiData.coordinator}
            style="
              position: absolute;
              width: 150px;
              height: 80px;
              top: -65px;
              left: 80px;
            "
          />
          <div style="margin-bottom: 10px; font-weight: bolder">
            _________________________
          </div>
          <strong style="color: #d62828fc">${
            commonData.managerName
          }</strong><br />
          Coordinator<br />
          <strong style="color: black; font-weight: bolder; text-transform: capitalize;"
>${commonData.college.toLowerCase()}</strong>
        </div>

        <div style="text-align: center; font-size: 12px; position: relative; width: 8%;">
          <div style="position: absolute; top: -4px;"> 
            <img
            src=${imageAndMitsubishiData.qrCodeImage}
            alt="QR Code"
            style="border: 1px solid #ccc; padding: 1px; background: #fff; width:85px; height:85px; "
          />
          <p style="text-align:center; font-size: 8px; margin-top: -5px;">Scan to Verify</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`;
};
