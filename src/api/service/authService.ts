import { BadRequestError } from '@takesure/common';
import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import { User } from '../../repository/models/user';
import { Password } from '../../utils/password';

/**
 * Description - Generating user token function
 * @param {string} id 
 * @param {string} email
 */
const signToken = (id: string, email: string) => jwt.sign({ id, email }, process.env.JWT_KEY!, {
    expiresIn: process.env.JWT_EXPIRES_IN
})


/**
 * Description - signup the user, and generate the JWT token
 * @param {Request} req
 * @param {Response} res
 */
export const signup = async (req: Request, res: Response) => {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email in use');
    }

    const user = User.build(req.body);

    await user.save();

    /** Descripton Generate JWT */
    const token = signToken(user.id, user.email)

    /** Description - Store it on session Object */
    req.session = {
        jwt: token,
    }

    res.status(201).json({
        user: user,
    })
}


/**
 * Description - Signin the registered user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const signin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const existingUser = await User.findOne({ email }).select('+password');

    if (!existingUser) {
        throw new BadRequestError('Invalid credentials')
    }

    if (!existingUser || !(await Password.correctPassword(password, existingUser.password))) {
        throw new BadRequestError('Invalid credentials')
    }

    /** Descripton Generate JWT */
    const token = signToken(existingUser.id, existingUser.email)

    /** Description - Store it on session Object */
    req.session = {
        jwt: token
    }

    res.status(200).json({
        status: 'success',
        existingUser
    })
}

/**
 * Description - signout the current user
 * @param {Request} req
 * @param {Response} res
 */
export const signout = (req: Request, res: Response) => {
    req.session = null;
    res.status(204).json({ status: 'success' })
}


/**
 * Description - Getting current user
 * @param {Request} req
 * @param {Response} res
 */
export const currentUser = (req: Request, res: Response) => {
    res.status(200).json({ 
        status: 'success', 
        currentUser: req.currentUser! || null 
    });
}