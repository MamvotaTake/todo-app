import express, { Request, Response} from 'express';
import { currentUser } from '../middleware/current-user';
import * as authService from '../service/authService'


export const router = express.Router();

router
.post('/signup', authService.signup)
.post('/signin', authService.signin)
.post('/signout', authService.signout)
.get('/currentUser',currentUser, authService.currentUser)

export default router;