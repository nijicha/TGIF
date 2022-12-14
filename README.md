# TGIF

> TGIF (4U): This gift is for you 🎁

### Project Structure

```text
├── app/
│     ├── assets/
│     ├── adapters/
│     ├── components/
│     ├── helpers/
│     ├── initializers/
│     ├── pages/
│     ├── services/
│     ├── App.tsx
│     ├── index.css
│     ├── index.tsx
├── bin
│     ├── build.ts
│     └── setup.ts
├── config
│     ├── locales/
│     └── index.ts
├── lib
│     └── middlewares/
├── public/
├── spec
│     └── support/
└── index.html
```

- `app/`: Close to 100% of the application code must be in there. It’s often named `src/` but it must also contain non-JS files such as `assets/` (which are often stored in public).
- `bin/` CLI scripts e.g. application setup, distribution build or deployment.
- `config/`: The configuration files for the application such as environment variables and locales.
- `dist/`: The compiled application code and assets for production deployment. Do not commit this directory to the Git repository.
- `lib/`: Non-specific application or shared code.
- `server/`: The Node.JS web server configuration and boot scripts.
- `spec/`: The tests for the application and the config for the test environment (stored in support/).
- `./`: The root of the styles folder contains the NPM package configuration and other dot files.
