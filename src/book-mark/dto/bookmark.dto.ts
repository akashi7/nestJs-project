/* eslint-disable */

import { IsNumber, IsString } from "class-validator";

export class bookmarkDto {

  @IsString()
  title: string
  @IsString()
  description: string
  @IsString()
  link: string

}