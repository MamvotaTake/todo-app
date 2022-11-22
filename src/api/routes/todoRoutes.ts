import { requireAuth } from '../middleware/require-auth';
import express, { Request, Response } from 'express'
import * as todoService from '../service/todoService'
import { currentUser } from '../middleware/current-user';
const router = express.Router();

router
    .route('/')
    .post(currentUser, requireAuth, todoService.createTodo)
    .get(todoService.getAllTodo)

router
    .route('/:id')
    .get(
        currentUser,
        requireAuth,
        todoService.getTodo
    )
    .patch(
        currentUser,
        requireAuth,
        todoService.updateTodo
    )
    .delete(
        currentUser,
        requireAuth,
        todoService.deleteTodo
    )

export default router;