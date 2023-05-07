import { Injectable } from "@nestjs/common";
import { writeFile } from "fs/promises";
import { join } from "path";
import * as fs from "fs";

@Injectable()
export class FileService {
  async upload(
    directory: string,
    file: Express.Multer.File
  ): Promise<string> {
    let filename = file.originalname;
    let path = join(
      /* file */ __dirname,
      /* modules */ "..",
      /* src */ "..",
      /* root */ "..",
      "storage",
      directory
    );
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    let completePath = join(
      path, 
      filename
    );
    try {
      await writeFile(completePath, file.buffer);
      return filename;
    }
    catch (error) {
      return "";
    }
  }

  async retrieve(
    filename: string
  ): Promise<string> {
    let path = join(
      /* file */ __dirname,
      /* modules */ "..",
      /* src */ "..",
      /* root */ "..",
      "storage",
      filename
    );
    return fs.existsSync(path) ? path : "";
  }
}