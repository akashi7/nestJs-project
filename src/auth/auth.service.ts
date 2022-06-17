/* eslint-disable */
import { Injectable } from "@nestjs/common";



@Injectable()

export class AuthService {

  signUp(){
    return {msg:"sign up success"};
  }

  signIn(){
   return {msg:"sign in success"};
  }

}