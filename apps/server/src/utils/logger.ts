import 'winston-daily-rotate-file';

import path from 'path';
import winston from 'winston';

const { createLogger, format, transports } = winston;
const { combine, splat, timestamp, printf, colorize } = format;
const npmLevels = winston.config.cli.levels;

const customLevels = {
    colors: {
        data: 'magenta',
        debug: 'blue',
        error: 'red',
        info: 'green',
        warn: 'yellow'
    },
    levels: { ...npmLevels }
};

winston.addColors(customLevels.colors);

const blue = '\x1b[34m';
const reset = '\x1b[0m';

const isPlainObject = (value: any) => {
    return Object.prototype.toString.call(value) === '[object Object]';
};

const formatValue = (value: any, level: string): string => {
    if (Array.isArray(value)) {
        return `[${value.map((val) => formatValue(val, level)).join(', ')}]`;
    } else if (isPlainObject(value)) {
        const keyColor = blue;
        return `{ ${Object.entries(value)
            .map(([key, val]) => `${keyColor}${key}${reset}: ${formatValue(val, level)}`)
            .join(', ')} }`;
    } else if (typeof value === 'string') {
        return value;
    }
    return value;
};

const formatMetadata = (metadata: Record<string, unknown>, level: string) => {
    if (!metadata || Object.keys(metadata).length === 0) return '';
    const keyColor = blue;
    return `{ ${Object.entries(metadata)
        .map(([key, value]) => `${keyColor}${key}${reset}: ${formatValue(value, level)}`)
        .join(', ')} }`;
};

const myFormat = printf(({ level, message, timestamp, service, ...metadata }) => {
    const formattedMetadata = formatMetadata(metadata, level);
    return `${timestamp} [${level}] [${service}]: ${message} ${formattedMetadata}`;
});

const customTimestampFormat = format.timestamp({
    format: 'h:mm:ss A'
});

const logLevel = 'debug';

const getLogger = (type: string) => {
    const transport = new transports.DailyRotateFile({
        datePattern: 'YYYY-MM-DD-HH',
        filename: `${path.join(__dirname, '../', '../', '/logs')}/${type}-%DATE%.log`,
        maxFiles: '14d',
        maxSize: '20m',
        zippedArchive: true
    });

    const logger = createLogger({
        defaultMeta: { service: type },
        format: combine(colorize({ all: true }), customTimestampFormat, myFormat),
        level: logLevel,
        levels: customLevels.levels,
        transports: [new transports.Console(), transport]
    });

    return logger;
};

const log = getLogger('server');

log.info(`Log Level: ${logLevel}`);

// Example usage:
// log.error('Error level log', { nested: { key: 'value' } });
// log.warn('Warn level log', { nested: { key: 'value' } });
// log.info('Info level log', { nested: { key: 'value' } });
// log.debug('Debug level log', { nested: { key: 'value' } });
// log.data('Data level log', { nested: { key: 'value' } });

export default log;
