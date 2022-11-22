import express, { Request, Response } from 'express';
import {NotFoundError} from '@takesure/common';
import { User } from '../../repository/models/user';


export const getAllUsers = async (req: Request, res: Response) =>{
    const users = await User.find({})

    res.status(200).json({
        status:'success',
        results: users.length,
        data: {
            users: users
        }

    })


}

export const getUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        throw new NotFoundError();
    }

    res.status(200).send(user);


}

export const updateUser = async (req: Request, res: Response) =>{
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    if(!user){
        throw new NotFoundError();
    }

    res.status(200).json({
        status: 'success',
        data: {
            user: user
        }
    })
}

export const deleteUser = async (req: Request, res: Response) =>{
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user) {
        throw new NotFoundError();
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
}