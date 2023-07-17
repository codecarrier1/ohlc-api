import url from 'url';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import ohlcRouter from './routes/ohlc.route';
import Database from './db';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', ohlcRouter);

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'OHLC API with Swagger',
      version: '0.1.0',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['**/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

if (process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'PRODUCTION') {
  Database.getInstance();
}

export default app;
