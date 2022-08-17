import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

//controller needs to call the service.

@Controller('auth')
export class AuthController {
  // having the private here means that the service can only be used within this class.

  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthDto, @Req() req: Request) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login() {
    return this.authService.login();
  }

  @Get('me')
  me() {
    return this.authService.me();
  }
}
