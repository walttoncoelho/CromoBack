import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {

  }

  async create({
    name,
    username,
    email,
    password,
    status
  }: CreateUserDTO) {
    return await this.prisma.user.create({
      data: {
        name,
        username,
        email,
        password,
        status,
        papelId: 1
      },
      select: {
        id: true
      }
    });
  }
}