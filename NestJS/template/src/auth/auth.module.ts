import {Module} from '@nestjs/common';
import {AuthController} from './controllers/auth.controller';
import {AuthService} from './services/auth.service';
import {UserModule} from 'src/user/user.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtModule, JwtService} from '@nestjs/jwt';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
