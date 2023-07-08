import {ConfigService} from '@nestjs/config';
import {DataSource, DataSourceOptions} from 'typeorm';

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
        entities: ['../entity/*.entity.ts'],
        synchronize: false, // 勝手にEntityとDBのカラムを同期してしまうので絶対にtrueにしない
        logging: configService.get<boolean>('database.logging'), // production時はoffになる
      };
      const dataSource = new DataSource(databaseOptions);
      return dataSource.initialize();
    },
  },
];
