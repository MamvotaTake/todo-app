import logger from  'pino';

export const log = logger({
    transport : {
        target: 'pino-pretty',
        options : {
            colorize: true,
            ignore: 'pid,hostname',
            translateTime: 'SYS:standard'
        }
    }
})
