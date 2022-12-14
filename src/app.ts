import 'express-async-errors'
import cookieSession from "cookie-session";
import cors from 'cors';
import express, { Request, Response, NextFunction} from "express";
require('dotenv').config();
import morgan from "morgan";
import routes from './api/routes';
import { NotFoundError } from '@takesure/common';

const app = express();

/**Description - App middlewares*/
app.use(morgan('dev'))
app.set('trust proxy', true);
app.use(cors())
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: false,
}))

routes(app)

/**Description - Error Handler Middleware*/
app.all('*', async (req, res, next) => {
    next(new NotFoundError());
});

export default app;