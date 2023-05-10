import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/modules/user/user.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService
    // private readonly mailer: MailerService,
  ) {}

  createToken(user: User) {
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

  checkToken(token: string) {
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

  isValidToken(token: string) {
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
      where: { email }
    });
    if (!user) {
      throw new UnauthorizedException("Email e/ou senha incorretos!");
    }
    if (!user.status) {
      throw new UnauthorizedException("Credenciais inválidas!");
    }
    if (!await bcrypt.compare(password, user.password)) {
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
    let token = this.jwtService.sign({
      id: user.id,
    }, {
      expiresIn: "5 minutes",
      subject: String(user.id),
      issuer: "forget",
      audience: "users"
    })
    // await this.mailer.sendMail({
    //   subject: "Recuperação de senha",
    //   to: user.email,
    //   template: "forget",
    //   context: {
    //     name: user.name,
    //     token
    //   }
    // });
    return { token };
  }

  async reset(
    newPassword: string, 
    token: string
  ) {
    try {
      let data: { id: number } = this.jwtService.verify(token, {
        issuer: "forget",
        audience: "users"
      });
      let id = Number(data.id);
      if (isNaN(id)) {
        throw new BadRequestException("Token inválido!");
      }
      let salt = await bcrypt.genSalt();
      let password = await bcrypt.hash(newPassword, salt);
      let user = await this.prisma.user.update({
        where: { id },
        data: { password }
      });
      return this.createToken(user);
    }
    catch (error) {
      throw new BadRequestException(error);
    }
  }

  async register(data: AuthRegisterDTO) 
  {
    let user = await this.userService.create(data);
    return this.createToken(user); 
  }
}