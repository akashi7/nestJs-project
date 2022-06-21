/* eslint-disable */
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { signInAuthData, signUpAuthData } from "./dto";


@Controller('auth')

export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')

  signUp(@Body() dto: signUpAuthData) {
    return this.authService.signUp(dto);
  }

  @Post('signin')

  signIn(@Body() dto: signInAuthData) {
    return this.authService.signIn(dto);
  }



}