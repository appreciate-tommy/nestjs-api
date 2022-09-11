import { FactoryProvider } from '@nestjs/common';
import * as t from 'io-ts';
import { NumberFromString, JsonFromString } from 'io-ts-types';
import dotenv from 'dotenv';
import path from 'path';
import { classMaker } from '../utils/classMaker';

export const Config = classMaker<t.TypeOf<typeof configCodec>>();
export type Config = InstanceType<typeof Config>;

export const configMock: Config = {
  NODE_ENV: 'TESTCONFIG',
};

const configCodec = t.type({
  NODE_ENV: t.string,
});

export function useFactory() {
  if (process.env.LOCAL === 'true') {
    dotenv.config({
      path: path.join(__dirname, '../../env/.env.local'),
    });
  }
  if (process.env.NODE_ENV === 'test') {
    return configMock;
  }
  const configError = configCodec.decode(process.env);
  if (configError._tag === 'Left') {
    configError.left.forEach((valdiationError, index) => {
      const keyList = valdiationError.context.map((context) => context.key);
      const key = keyList.join(' > ');
      console.error(`${index}, ${key}`);
    });
    throw new Error(`Environment variables not configured properly`);
  } else {
    return new Config(configError.right);
  }
}

export const configFactory = {
  provide: Config,
  useFactory,
};
