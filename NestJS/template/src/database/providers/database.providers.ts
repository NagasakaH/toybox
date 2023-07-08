import {ConfigService} from '@nestjs/config';
import {DataSource, DataSourceOptions} from 'typeorm';
import {User} from 'src/entity/user.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const databaseOptions: DataSourceOptions = {
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: ['dist/**/*.entity.{js,ts}'],
        synchronize: false, // 勝手にEntityとDBのカラムを同期してしまうので絶対にtrueにしない
        logging: configService.get<boolean>('database.logging'), // production時はoffになる
      };
      const dataSource = new DataSource(databaseOptions);
      return dataSource.initialize();
    },
  },
];
