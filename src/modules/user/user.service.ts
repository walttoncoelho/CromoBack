import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    let salt = await bcrypt.genSalt();
    let password = await bcrypt.hash(
      /* data */ data.password,
      /* saltOrRounds */ salt
    );
    return await this.prisma.user.create({ data: { ...data, password } });
  }

  async list() {
    return await this.prisma.user.findMany();
  }

  async show(id: number) {
    let user = await this.prisma.user.findUnique({
      where: { id }
    });
    if (!user)
      throw new NotFoundException("Usuário não encontrado.");
    return user;
  }

  async update(
    id: number,
    data: UpdateUserDTO
  ) {
    let user = await this.show(id);

    let password = data.password;
    if (data.password) {
      let salt = await bcrypt.genSalt();
      password = await bcrypt.hash(
        /* data */ data.password,
        /* saltOrRounds */ salt
      );
    }
    return await this.prisma.user.update({
      data: { ...data, password },
      where: { id: user.id }
    });
  }

  async toggleStatus(id: number) {
    let user = await this.show(id);

    return await this.prisma.user.update({
      data: { status: !user.status },
      where: { id: user.id }
    });
  }
}