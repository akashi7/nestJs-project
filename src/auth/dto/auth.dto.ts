/* eslint-disable */

import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class signUpAuthData {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  firstName: string
  @IsString()
  lastName: string

}

export class signInAuthData {
  @IsEmail()
  email: string

  @IsString()
  password: string
}


