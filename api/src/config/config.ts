import mongoose from "mongoose";
import fs from "fs";

class Config {
  private mongoUri: string = process.env.MONGO_URI ?? "";

  /**
   * @function: this function is a public function that will initiate a connection with the datbase
   * @creates this fn() checks whether there exist an uplods folder which will contain all the uploaded docs from the multer middleware
   * @returns Promise of type void;
   */
  public async start(): Promise<{ name: string; URL: string }> {
    try {
      if (!fs.existsSync("./uploads")) {
        fs.mkdirSync("./uploads");
        fs.mkdirSync("./uploads/images");
        fs.mkdirSync("./uploads/pdfs");
        fs.mkdirSync("./uploads/attendence");
      }
      await this.connectDatabase(this.mongoUri);
      return Promise.resolve({ name: "Database", URL: "Connected!" });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * @private function because it will be invoked only once by the instance of the config class
   * @param uri which is the connection string for mongodb database
   * @returns Promise of type void;
   */
  private async connectDatabase(uri: string): Promise<void> {
    try {
      await mongoose.connect(uri);
    } catch (error) {
      console.error("Mongo DB error occured!");
      return Promise.reject(error);
    }
  }
}

export default Config;
