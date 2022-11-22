import { Request, Response } from 'express'
import {NotFoundError} from '@takesure/common';
import { Todo } from '../../repository/models/todo'

export const createTodo = async (req: Request, res: Response) => {
    const {title, description, isCompleted} = req.body;

    // console.log(req.currentUser!.id)

    const todo = Todo.build({
        title,
        description,
        isCompleted,
        userId: req.currentUser!.id
    });    

    await todo.save();

    res.status(200).json({
        todo: todo
    })
}


export const getAllTodo = async (req: Request, res: Response) => {

    // Filtering
    const queryObj = {...req.query};
    const excludeFields = ['page', 'sort', 'page']

    excludeFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query =  Todo.find(JSON.parse(queryStr));

    //Sorting
    if(req.query.sort){
        const sortBy = (req.query.sort as string).split(',').join(' ')
        query = query.sort(sortBy)
    } else{
        query = query.sort('-createdAt')    
    }

    //Pagination
    const page = (req.query.page as any) * 1 || 1;
    const limit = (req.query.limit as any) * 1 || 30;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit)
    
    const todos = await query

    res.status(200).json({
        status: 'success',
        results: todos.length,
        data: {
            todos,
        }
    });
}


export const getTodo = async (req: Request, res: Response) => {
    const todo = await Todo.findById(req.params.id)

    if(!todo){
        throw new NotFoundError();
    }

    res.status(200).send(todo);
}

export const updateTodo = async (req: Request, res: Response) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    if(!todo) {
        throw new NotFoundError();
    }

    res.status(200).json({
        status:'success',
        data: {
            todo:todo
        }
    })

}

export const deleteTodo = async (req: Request, res: Response) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if(!todo){
        throw new NotFoundError();
    }
    res.status(204).json({
        status:'success',
        data: null
    })
}


