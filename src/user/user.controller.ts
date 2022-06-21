/* eslint-disable */
import { Body, Controller, Get, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { bookmarkDto } from 'src/book-mark/dto';
import { UserService } from './user.service';


@UseGuards(JwtGuard)
@Controller('user')

export class UserController {

  constructor(private UserService: UserService) { }


  @Post('addBook')

  addBookmark(@GetUser() user: any, @Body() bookDto: bookmarkDto) {
    return this.UserService.addBookmark(user, bookDto)
  }

  @Get('bookmarks')

  seeBookmarks(@GetUser() user: any) {
    return this.UserService.seeBookmarks(user)
  }

  @Get('param')

  seeParams(@Query('id') id: any) {
    return { id }
  }

}
