import * as express from 'express';
import * as cors from 'cors';
require('dotenv').config();

import { FRONTEND_URL } from './config';

// controllers
import pingController from './controllers/ping';
import eventsController from './controllers/events';
import recipientsController from './controllers/recipients';

const app = express();

// cors options
const corsOpt = {
  origin: FRONTEND_URL,
  methods: ['GET', 'OPTIONS'],
  allowedHeaders:
    'Access-Control-Allow-Headers, Origin,OPTIONS,Accept,Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  //   credentials: true,
};

app.use(cors(corsOpt));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(pingController);
app.use('/events', eventsController);
app.use('/recipients', recipientsController);

export default app;