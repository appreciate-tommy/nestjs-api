import path from 'path';
import { Config } from './envgen';

export const rootConfig = {};
export const localConfig = {};

export const config: Config = {
  dir: path.join(__dirname),
  filename: '../.env.local',
  variables: {
    NODE_ENV: `development`,
    DATABASE_URL: 'postgres://postgres:1234@localhost:5432/nest?schema=public',
  },
};

// DATABASE_URL=""
