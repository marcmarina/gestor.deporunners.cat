import { Config } from './config';

export const production: Config = {
  API_URL: 'https://deporunners-api.onrender.com',
  API_TOKEN: import.meta.env.VITE_API_TOKEN,
  STRIPE_PUB_KEY: 'pk_live_Mr7IflqsHTvia79JXncob2C3',
};
