import {Module} from '@nestjs/common';
import {databaseProviders} from './providers/database.providers';
import {ConfigModule} from '@nestjs/config';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
