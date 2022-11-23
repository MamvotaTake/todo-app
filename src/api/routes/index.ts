import { Router } from "express";
import authRouter from "./authRoutes"
import todoRouter from './todoRoutes'
import userRouter from './userRoutes'

/**
 * Description defining our routes
 * @param {any} app:{use:(org0:string
 * @param {Router} org1
 */
export default(app: {use: (org0: string, org1: Router) =>void;}) => {
    app.use('/api/auth', authRouter)
    app.use('/api/todo', todoRouter)
    app.use('/api/user', userRouter)
}