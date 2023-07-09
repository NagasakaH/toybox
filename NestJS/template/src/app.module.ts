import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import configuration from './config/configuration';
import {DatabaseModule} from './database/database.module';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
