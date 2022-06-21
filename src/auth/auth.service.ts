/* eslint-disable */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { signInAuthData, signUpAuthData } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";



@Injectable()

export class AuthService {

  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService,
    private readonly config: ConfigService
  ) { }

  generateToken(userId: number, email: string) {
    const token = this.jwt.sign({ userId, email }, { expiresIn: "2h", secret: this.config.get("JWT_SECRET") })
    return { token }
  }

  async signUp(dto: signUpAuthData) {
    const password = await argon.hash(dto.password)
    const { email, firstName, lastName } = dto

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password,
          firstName,
          lastName
        }
      })
      return this.generateToken(user.id, user.email)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') throw new ForbiddenException('Email is arleady registered')
        else throw error
      }
    }
  }

  async signIn(dto: signInAuthData) {
    console.log({ dto })
    const user = await this.prisma.user.findFirst({ where: { email: dto.email } })
    if (!user) {
      throw new ForbiddenException('Email not found !')
    }
    else if (!(await argon.verify(user.password, dto.password))) {
      throw new ForbiddenException('Wrong password !')
    }
    return this.generateToken(user.id, user.email)
  }

}