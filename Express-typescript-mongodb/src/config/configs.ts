import { config } from 'dotenv';

config();

interface IConfig {
  app: {
    port: string | number;
    environment: string;
  };
  mongo: {
    uri: string;
    database: string;
    user: string;
    password: string;
  };
}

function setup(): IConfig {
  return {
    app: {
      port: process.env.APP_PORT || 8080,
      environment: process.env.APPLICATION_ENV || '',
    },
    mongo: {
      uri: process.env.DB_URI || '',
      database: process.env.DB_DATABASE || '',
      user: process.env.DB_USER || '',
      password: process.env.DB_PASSWORD || '',
    },
  };
}
export default setup();
