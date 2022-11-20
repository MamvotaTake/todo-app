import { Request, Response } from 'express'

export const createTodo = (req: Request, res: Response) => {}


export const getAllTodo = (req: Request, res: Response) => {}


export const getTodo = (req: Request, res: Response) => {
    return res.status(200).send('this is a todo yes')
}


export const deleteTodo = (req: Request, res: Response) => {}


export const updateTodo = (req: Request, res: Response) => {}
