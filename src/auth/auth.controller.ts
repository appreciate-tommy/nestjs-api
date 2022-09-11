import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

//controller needs to call the service.

@Controller('auth')
export class AuthController {
  // having the private here means that the service can only be used within this class.

  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log('signup:', {
      dto: dto,
    });
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: AuthDto) {
    console.log('login: ', {
      dto: dto,
    });
    return this.authService.login(dto);
  }

  @Get('me')
  currentUser(@Body() dto: AuthDto) {
    return this.authService.currentUser(dto);
  }
}
