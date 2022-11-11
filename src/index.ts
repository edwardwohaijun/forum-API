import express, { Express, Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import bodyParser from "body-parser";
import { router } from './routes/api';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(router);

const jsonErrorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode).send(err.message)
}
app.use(jsonErrorHandler)

const port = process.env.PORT;
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
  });  
}

module.exports = app;
