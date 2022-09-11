import path from 'path';
import { Config } from './envgen';

export const rootConfig = {};
export const localConfig = {};

export const config: Config = {
  dir: path.join(__dirname),
  filename: '../.env',
  variables: {
    NODE_ENV: `development`,
    LOCAL_DATABASE_URL:
      'postgres://postgres:1234@localhost:5432/nest?schema=public',
    JWT_SECRET: 'jwt-secret',
  },
};

// DATABASE_URL=""
