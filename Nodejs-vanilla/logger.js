import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/combinedServer.log',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        winston.format.align(),
        winston.format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
    new winston.transports.File({
      filename: 'logs/errors.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        winston.format.align(),
        winston.format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
});

// * Make sure the env settings on package.json looks like this: NODE_ENV=your_value&& any_command
// * If you set variable like this: NODE_ENV=your_value && any_command, this will produce an wxtra white space!
if (String(process.env.NODE_ENV) !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export function logUncaughtExceptions() {
  process.on('uncaughtException', (reason, p) => {
    logger.error(reason.message);
    throw reason;
  });
}

export default logger;
