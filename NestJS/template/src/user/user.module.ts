import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {UserProviders} from './providers/user.proivders';
import {UserService} from './services/user.service';
import {UserController} from './controllers/user.controller';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {TransformInterceptor} from 'src/common/interceptor/transform.interceptor';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [UserController],
  providers: [
    ...UserProviders,
    UserService,
    {provide: APP_INTERCEPTOR, useClass: TransformInterceptor},
  ],
  exports: [...UserProviders, UserService],
})
export class UserModule {}
