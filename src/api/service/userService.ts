import express, { Request, Response } from 'express';
import { NotFoundError } from '@takesure/common';
import { User } from '../../repository/models/user';
import userRepository from '../../repository/userRepository';

/** Description - User must be authenticated inorder to access todo endpoints*/


/**
 * Description - get all users
 * @param {Request} req
 * @param {Response} res
 */
export const getAllUsers = async (req: Request, res: Response) => {
    const users = await userRepository.getList({})

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users: users
        }

    })


}

/**
 * Description - get user by id
 * @param {Request} req
 * @param {Response} res
 */
export const getUser = async (req: Request, res: Response) => {
    const user = await userRepository.getById(req.params.id)

    res.status(200).json({
        status: 'success',
        data: {
            user
        }

    })


}

/**
 * Description -update user by id
 * @param {Request} req
 * @param {Response} res
 */
export const updateUser = async (req: Request, res: Response) => {
    const user = await userRepository.updateById(req.params.id, req.body)

    res.status(200).json({
        status: 'success',
        data: {
            user: user
        }
    })
}

/**
 * Description - delete user by id
 * @param {Request} req
 * @param {Response} res
 */
export const deleteUser = async (req: Request, res: Response) => {
    const user = await userRepository.deleteById(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    })
}