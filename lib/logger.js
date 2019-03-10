//Get config.
const config  = require('config');

//Get winston functions.
const { 
  createLogger, 
  format, 
  transports 
} = require('winston');

//Create the logger.
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: config.get('service.name')+'-'+process.pid },
  transports: [
    new transports.File({ filename: config.get('log') })
  ]
});

//If we are in dev mode, colorize outputs.
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

module.exports=logger;