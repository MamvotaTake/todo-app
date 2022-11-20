import express from "express";
import cookieSession from "cookie-session";
require('dotenv').config();
import morgan from "morgan";
import routes from './api/routes';

const app = express();

//App middlewares
app.use(morgan('dev'))
app.use(express.json());
app.set('trust proxy', true);
app.use(cookieSession({
    signed: false,
    secure:true,
}))

routes(app)

export default app;