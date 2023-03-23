import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService
  ) {}

  async createToken(user: User) {
    let accessToken = this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    }, {
      expiresIn: "12h",
      subject: String(user.id),
      issuer: "login Cromo",
      audience: "users"
    });
    return { accessToken };
  }

  async checkToken(token: string) {
    try {
      let data = this.jwtService.verify(token, {
        audience: "users",
        issuer: "login Cromo",
      });
      return data;
    } catch (exception) {
      throw new BadRequestException(exception);
    }
  }

  async isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (exception) {
      return false;
    }
  }

  async login(
    email: string, 
    password: string
  ) {
    let user = await this.prisma.user.findFirst({
      where: { email, password }
    });
    if (!user) {
      throw new UnauthorizedException("Email e/ou senha incorretos!");
    }
    return this.createToken(user);
  }

  async forget(email: string) {
    let user = await this.prisma.user.findFirst({
      where: { email }
    });
    if (!user) {
      throw new UnauthorizedException("Email incorreto!");
    }
    // To-do: enviar o email
    return user;
  }

  async reset(
    password: string, 
    token: string) 
  {
    // To-do: validação do token
    let id = 0;
    let user = await this.prisma.user.update({
      where: { id },
      data: { password }
    });
    return await this.createToken(user);
  }

  async register(data: AuthRegisterDTO) 
  {
    let user = await this.userService.create(data);
    return this.createToken(user); 
  }
}