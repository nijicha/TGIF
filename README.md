# TGIF

> TGIF (4U): This gift is for you π

### Project Structure

```text
βββ app/
β     βββ assets/
β     βββ adapters/
β     βββ components/
β     βββ helpers/
β     βββ initializers/
β     βββ pages/
β     βββ services/
β     βββ App.tsx
β     βββ index.css
β     βββ index.tsx
βββ bin
β     βββ build.ts
β     βββ setup.ts
βββ config
β     βββ locales/
β     βββ index.ts
βββ lib
β     βββ middlewares/
βββ public/
βββ spec
β     βββ support/
βββ index.html
```

- `app/`: Close to 100% of the application code must be in there. Itβs often named `src/` but it must also contain non-JS files such as `assets/` (which are often stored in public).
- `bin/` CLI scripts e.g. application setup, distribution build or deployment.
- `config/`: The configuration files for the application such as environment variables and locales.
- `dist/`: The compiled application code and assets for production deployment. Do not commit this directory to the Git repository.
- `lib/`: Non-specific application or shared code.
- `server/`: The Node.JS web server configuration and boot scripts.
- `spec/`: The tests for the application and the config for the test environment (stored in support/).
- `./`: The root of the styles folder contains the NPM package configuration and other dot files.
