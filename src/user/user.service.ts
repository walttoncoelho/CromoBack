import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { ToggleUserStatusDTO } from "./dto/toggle-user-status.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    return await this.prisma.user.create({
      data: { 
        ...data,
        papelId: 1 
      }
    });
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

    return await this.prisma.user.update({
      data,
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

  async changeStatus(
    user: User,
    status: boolean
  ) {
    
  }
}