import dotenv from 'dotenv';
import app from './app';
import { PORT } from './config/env_variables';

dotenv.config();
const port = PORT || 7000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App started on http://localhost:${port}`);
});
