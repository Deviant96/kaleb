import { ConfigProps } from 'src/config/config.interface';

export const config = (): ConfigProps => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES,
  },
  api: {
    apiUrl: process.env.API_URL,
  },
});
