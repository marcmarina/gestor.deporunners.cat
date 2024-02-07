import { development } from './development';
import { staging } from './staging';
import { production } from './production';

enum Mode {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

const env = import.meta.env;

const mode = env.MODE as Mode;

export type Config = {
  API_URL: string;
  API_TOKEN: string;
  STRIPE_PUB_KEY: string;
};

function getConfigForMode(mode: Mode): Config {
  switch (mode) {
    case Mode.Development:
      return development;
    case Mode.Staging:
      return staging;
    case Mode.Production:
      return production;
    default:
      throw new Error(`No config found for environment ${mode}`);
  }
}

const config = getConfigForMode(mode);

export default config;
