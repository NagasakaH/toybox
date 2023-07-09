import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {AuthGuard} from '../auth.guard';
import {TokenPayload} from '../dto/auth.dto';
import {LoggedInUser} from 'src/common/decorators/loggedInUser.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('local/login')
  async signIn(@Body() loginInfo: {email: string; password: string}) {
    return this.authSerivce.signInLocal(loginInfo.email, loginInfo.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@LoggedInUser() loggedInUser): Promise<TokenPayload> {
    return loggedInUser;
  }
}
