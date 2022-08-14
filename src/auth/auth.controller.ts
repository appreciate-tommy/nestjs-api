import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

//controller needs to call the service.

@Controller('auth')
export class AuthController {
  // having the private here means that the service can only be used within this class.

  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log({
      dto: dto,
    });
    return this.authService.signup();
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
