import { MongooseModuleOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';
import { ConfigService } from '@nestjs/config';
import { IConfig } from './configuration';

export default function (configService: ConfigService): Promise<MongooseModuleOptions> | MongooseModuleOptions {
  const { uri, user, password, database } = configService.get('mongo') as IConfig['mongo'];
  return {
    uri,
    user,
    pass: password,
    dbName: database,
    connectionFactory: (connection) => {
      connection.on('connected', () => {
        console.log('DATABASE CONNECTED!');
      });
      connection.on('disconnected', () => {
        console.log('DATABASE DISCONNECTED!');
      });
      connection.on('error', () => {
        console.log('DATABASE CONNECTION ERROR!');
      });
      return connection;
    },
  };
}
