import fs from 'fs';
import path from 'path';
import { config } from './envconfig';
export type ENValues = string | number | boolean;
export type ENVKeys = Record<string, ENValues>; // https://stackoverflow.com/questions/51936369/what-is-the-record-type-in-typescript
export interface Config {
  dir: string;
  filename: string;
  variables: ENVKeys;
}

// a generated dsiclaimer message, because we do not want users to overwrite the file unsafely
const DISCLAIMER = [
  '# This is a generated file.',
  '# DO NOT MODIFY.',
  `# Go to ${require.resolve('./envconfig.ts')} to make changes.`,
  '',
].join('\n');

const environmentValuesToString = (value: ENValues): string => {
  console.log('environmentValuesToString');
  if (typeof value === 'boolean') {
    if (value) {
      return 'true';
    } else {
      return 'false';
    }
  } else {
    return `${value}`;
  }
};

const toDotEnv = (vars: ENVKeys) => {
  console.log('toDotEnv');
  const lines = [DISCLAIMER];
  Object.keys(vars).forEach((key) => {
    const value = vars[key];
    const finalValue = environmentValuesToString(value);
    const line = `${key}=${finalValue}`;
    lines.push(line);
  });
  lines.push('');
  lines.push(DISCLAIMER);
  return lines.join(`\n`);
};

export const generate = () => {
  const { filename, dir, variables } = config;
  const dotenv = toDotEnv(variables);
  const filepath = path.join(dir, filename);

  fs.rmSync(filepath, {
    force: true,
  });

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true,
    });
  }

  fs.writeFileSync(filepath, dotenv, {
    encoding: 'utf-8',
  });

  console.log('Successfully generated environment variables.');
};
