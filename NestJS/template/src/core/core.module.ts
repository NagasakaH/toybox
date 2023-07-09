import {Global, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtModule, JwtService} from '@nestjs/jwt';
import configuration from 'src/config/configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: ['.env'],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('jwt.secret');
        const timeout = configService.get<number>('jwt.timeout');
        return {
          secretOrPrivateKey: secret,
          signOptions: {expiresIn: timeout},
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule, ConfigModule],
})
export class CoreModule {}
