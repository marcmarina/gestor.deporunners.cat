import { development } from './development';
import { staging } from './staging';
import { production } from './production';

enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

const envVars = import.meta.env;

const environment = envVars.MODE as Environment;

export type Config = {
  API_URL: string;
  API_TOKEN: string;
  STRIPE_PUB_KEY: string;
};

function getConfigForEnvironment(env: Environment): Config {
  switch (envVars.MODE) {
    case Environment.Development:
      return development;
    case Environment.Staging:
      return staging;
    case Environment.Production:
      return production;
    default:
      throw new Error(`No config found for environment ${env}`);
  }
}

const config = getConfigForEnvironment(environment);

export default config;
