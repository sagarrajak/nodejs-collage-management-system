let winston = require('winston'),
    format = winston.format,
    createLogger = winston.createLogger,
    transports = winston.transports;



let logger = undefined;
const NODE_ENV = process.env.NODE_ENV;

if( NODE_ENV !== 'production' ) {
    logger = createLogger({
        level: 'debug',
        format: format.combine(
            format.timestamp(), 
            format.prettyPrint(),
            format.splat(),
            format.simple()       
        ),
        transports: [
               new transports.File({ filename: 'error.log', level: 'error' }),
               new transports.File({ filename: 'combined.log', level: 'debug' }),
               new transports.Console({ format: winston.format.simple() })
        ],
        exitOnError: true
    });
} else {
    logger = createLogger({
        level: 'info',
        format: format.timestamp(),
        /*    
            from winston docs 
            logger.log('info', 'test message %s', 'my string');

            // info: test message 123 {}
            logger.log('info', 'test message %d', 123);
            
            // info: test message first second {number: 123}
            logger.log('info', 'test message %s, %s', 'first', 'second', { number: 123 });

           */
        format: format.combine(
            format.timestamp(),
            format.prettyPrint(),
            format.splat(),
            format.simple()
        ),
        exitOnError: false
    });
}
if( NODE_ENV !== 'production' ) {
    logger.log('debug', 'logging initialized at debug level');
}

module.exports = logger;