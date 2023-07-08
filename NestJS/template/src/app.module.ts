import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import configuration from './config/configuration';
import {DatabaseModule} from './database/database.module';
import {UserModule} from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({load: [configuration], envFilePath: ['.env']}),
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
