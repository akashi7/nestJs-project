/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { bookmarkDto } from 'src/book-mark/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { }

  async addBookmark(user: any, bookDto: bookmarkDto) {

    try {
      const book = await this.prisma.bookmark.create({
        data: {
          userId: user.userId,
          ...bookDto
        }
      })
      return { book }
    } catch (error) {
      console.log({ error })
    }
  }

  async seeBookmarks(user: any) {
    try {
      const userBooks = await this.prisma.bookmark.findMany({ where: { userId: user.userId } })
      return userBooks
    } catch (error) {
      console.log({ error })
    }
  }



}
