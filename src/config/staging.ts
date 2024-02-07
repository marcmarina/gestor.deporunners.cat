import { Config } from './config';

export const staging: Config = {
  API_URL: 'https://deporunners-api-staging.onrender.com',
  API_TOKEN: import.meta.env.VITE_API_TOKEN,
  STRIPE_PUB_KEY:
    'pk_test_51D84cOEHf0A3zmt8dw5uwY9cSgwBAyL0ltom8TTIEMK30xkxbjQ5xf8ppwVaMxdiDqzehqvLIwEfmrcMuMfdGqTO00Vv6IfY9H',
};
