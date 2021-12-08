import mongoose from 'mongoose'; // not necessary to install @types/mongoose, because mongoose has own types.
import config from '../config/configs'

export default function () {

  mongoose.connect(config.mongo.uri, {
    user: config.mongo.user,
    pass: config.mongo.password,
    dbName: config.mongo.database,
  });

  mongoose.connection.on('connected', () => {
    console.log('CONNECTED TO DATABASE!');
  });

  mongoose.connection.on('error', async () => {
    console.error('DATABASE CONNECTION ERROR!');
    await mongoose.disconnect();
  });

  mongoose.connection.on('disconnect', () => {
    console.error('DATABASE DISCONNECTED!');
  });
}
