import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // create the user
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
      // select: {
      //   id: true,
      //   email: true,
      //   createdAt: true,
      // },
    });
    // dirty fix
    delete user.hash;
    console.log(user);
    return user;
  }

  login() {
    return { msg: 'I have logged in' };
  }

  me() {
    return { msg: 'I am the user' };
  }
}
