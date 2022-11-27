# Deporunners - Website

This is one of two front-end apps for this project. The other two are the [app][app] and [API][api].

## Setup

Requirements:

- The [API][api] properly configured and running.
- `yarn`

To set up the project, install dependencies with `yarn` and then create a `.env` file using the provided example.

### `.env` variables

`VITE_API_URL` is the url for your locally running API (e.g. `http://localhost:8080`).

`VITE_API_TOKEN` is the token you have set up for your API.

`VITE_STRIPE_PUB_KEY` is Stripe's publishable key.

### Serving the project

```
yarn serve
```

## Deployment

This app is deployed twice, with [Netlify](https://netlify.com), one for staging and one for production. You won't be able to access the production app.

- Production: https://deporunners.netlify.app
- Staging: https://deporunners-dev.netlify.app
  - Username: john@doe.com
  - Password: 123456

[api]: https://github.com/marcmarina/api.deporunners.cat
[app]: https://github.com/marcmarina/Deporunners
