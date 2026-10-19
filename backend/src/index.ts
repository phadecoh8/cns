import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

app.listen(env.PORT, () => {
  process.stdout.write(`CNS API listening on port ${env.PORT}\n`);
});
