import { Request, Response } from 'express'
import {NotFoundError} from '@takesure/common';
import { Todo } from '../../repository/models/todo'
import todoRepository from '../../repository/todoRepository'

/** Description - User must be authenticated inorder to access todo endpoints*/

/**
 * Description - create todo.
 * @param {Request} req
 * @param {Response} res
 */
export const createTodo = async (req: Request, res: Response) => {
    const {title, description, isCompleted} = req.body;

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


/**
 * Description - Get the list of all todos 
 * @param {Request} req
 * @param {Response} res
 */
export const getAllTodo = async (req: Request, res: Response) => {

    /**Description - Filtering all todos by:
     * - title
     * - description
     * - isCompleted
    */
    const queryObj = {...req.query};
    const excludeFields = ['page', 'sort', 'page']

    excludeFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query =  todoRepository.getList(JSON.parse(queryStr));

    /**Description - Sorting
     * Sorting todos by any of the attributes in ITodo object
     * ?sort=title (example)
    */
    if(req.query.sort){
        const sortBy = (req.query.sort as string).split(',').join(' ')
        query = query.sort(sortBy)
    } else{
        query = query.sort('-createdAt')    
    }

    /** Description - Pagination the list of todos
     * ?page=2&limit=12
     * page - page you want to access
     * limit - number of todos per page
    */
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


/**
 * Description - get one todo by id
 * @param {Request} req
 * @param {Response} res
 */
export const getTodo = async (req: Request, res: Response) => {
    const todo = await todoRepository.getById(req.params.id);

    res.status(200).send(todo);
}

/**
 * Description - update user by id
 * @param {Request} req
 * @param {Response} res
 */
export const updateTodo = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const todo = await todoRepository.updateById(userId, req.body);

    res.status(200).json({
        status:'success',
        data: {
            todo:todo
        }
    })

}

/**
 * Description - delete todo by id
 * @param {Request} req
 * @param {Response} res
 */
export const deleteTodo = async (req: Request, res: Response) => {
    const todo = await todoRepository.deleteById(req.params.id);

    res.status(204).json({
        status:'success',
        data: todo
    })
}


