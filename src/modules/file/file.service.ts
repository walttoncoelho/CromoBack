import { Injectable } from "@nestjs/common";
import { writeFile } from "fs/promises";
import { join } from "path";
import * as fs from "fs";
import * as bcrypt from "bcrypt";
import * as Path from "path";

@Injectable()
export class FileService {
  async upload(
    directory: string,
    file: Express.Multer.File
  ): Promise<string> {
    let filename = await this.generateFilename(file);
    let path = join(
      process.cwd(),
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
      process.cwd(),
      "storage",
      filename
    );
    return path;
  }

  private async generateFilename(file: Express.Multer.File) {
    let salt = await bcrypt.genSalt();
    let extension = Path.extname(file.originalname);
    let hash = await bcrypt.hash(file.originalname, salt);
    return `${hash.replace(/[^\w\s]/gi, '')}${extension}`;
  }
}