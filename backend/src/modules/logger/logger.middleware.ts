import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import * as winston from 'winston';
import { LoggingService } from './logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger: winston.Logger;

  constructor(
    private readonly loggingService: LoggingService,
    private readonly jwtService: JwtService,
  ) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = req;

    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decoded = this.jwtService.decode(token);
      console.log('Decoded JWT Token:', decoded);
    } else {
      console.log('No JWT Token found in request headers');
    }

    res.on('finish', () => {
      const { statusCode } = res;
      this.loggingService.log(`${method} ${originalUrl} ${statusCode} - ${ip}`);
    });

    next();
  }
}
