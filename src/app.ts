import express from "express";
import morgan from "morgan";
import routes from './api/routes';

const app = express();

//App middlewares
app.use(morgan('dev'))
app.use(express.json());

routes(app)

export default app;