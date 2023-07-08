import configuration from '../config/configuration';
import {DataSource, DataSourceOptions} from 'typeorm';

// migration用の接続設定ファイル
const ormconfig: DataSourceOptions = {
  type: 'postgres',
  ...configuration().database,
  synchronize: false,
  logging: true,
  entities: ['src/entity/*.entity.ts'],
  migrations: ['src/migrations/*-migration.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
};

const dataSource = new DataSource(ormconfig);

export default dataSource;
