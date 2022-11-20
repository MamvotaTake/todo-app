import express, { Request, Response } from 'express'
import * as todoService from '../service/todoService'
const router = express.Router();

router
.route('/')
.post(todoService.createTodo)
.get(todoService.getAllTodo)

router
.route('/:id')
.get(todoService.getTodo)
.patch(todoService.updateTodo)
.delete(todoService.deleteTodo)

export default router;