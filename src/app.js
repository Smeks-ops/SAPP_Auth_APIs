import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import v1Routes from './routes';
import { failureResponse, statusCodes, successResponse } from './utils/api-response';

const cors = require('cors');

dotenv.config();

// initialize express
const app = express();

/*  this protect the server from some well-known web vulnerabilities
 by setting HTTP headers appropriately. */
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'too many requests',
});

// apply rate limiter as a middleware limiter
app.use(limiter);

/* Returns middleware that only parses json and only looks at requests
where the Content-Type header matches the type option. */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// using the formidable middleware
// app.use(expressFormidable({
//   multiples: true,
// }));
app.use(fileUpload({
  useTempFiles: true,
}));

/*
specifies which origin can access the api,
you can add multiple origin to the array
*/

app.use(cors({
  origin: '*',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
}));

// it logs status requests and request details to the console
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'tiny'));

// catch invalid JSON payloads
// eslint-disable-next-line consistent-return
app.use((_err, _req, _res, _) => {
  if (_err instanceof SyntaxError) {
    return failureResponse(_res, statusCodes.UNPROCESSED_ENTITY, 'Invalid json payload', _);
  }
});

app.get('/', (req, res) => successResponse(res, statusCodes.SUCCESS, 'server is up and running'));

app.use('/api/v1', v1Routes);

// catch all invalid routes
app.all('*', (req, res) => failureResponse(res, statusCodes.NOT_FOUND, 'route not found'));

export default app;
