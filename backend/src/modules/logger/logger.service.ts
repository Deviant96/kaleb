import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggingService implements LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/combined.log',
        }),
      ],
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message}`;
        }),
      ),
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, {
      trace,
    });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }

  logLoginSuccess(username: string, ipAddress: string) {
    const timestamp = new Date().toISOString();
    this.log(
      `User ${username} logged in successfully from IP ${ipAddress} at ${timestamp}`,
    );
  }

  // Log failed login attempt with IP address
  logLoginFailure(username: string, ipAddress: string) {
    const timestamp = new Date().toISOString();
    this.warn(
      `Failed login attempt for user ${username} from IP ${ipAddress} at ${timestamp}`,
    );
  }
}
