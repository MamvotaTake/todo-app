import 'express-async-errors'
import cookieSession from "cookie-session";
import express, { Request, Response, NextFunction} from "express";
require('dotenv').config();
import morgan from "morgan";
import routes from './api/routes';
import { NotFoundError } from '@takesure/common';

const app = express();

//App middlewares
app.use(morgan('dev'))
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
    signed: false,
    // secure: true,
}))

routes(app)

//Error Handler Middleware
app.all('*', async (req, res, next) => {
    next(new NotFoundError());
});

export default app;