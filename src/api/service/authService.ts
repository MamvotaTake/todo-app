import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import { User } from '../../repository/models/user';
import { Password } from '../../utils/password';


export const signup = async (req: Request, res: Response) => {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.send('Email in use')
    }

    const user = User.build(req.body);

    await user.save();

    // Generate JWT
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    //store it on session object
    req.session = {
        jwt: userJwt
    }

    res.status(201).json({
        user: user,
    })
}


export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            res.send('Invalid credentials')
        }

        const passwordsMatch = await Password.compare(
            existingUser!.password,
            password
        );

        if (!passwordsMatch) {
            res.send('Invalid credentials')
        }

         // Generate JWT

         const userJwt = jwt.sign({
            id: existingUser!.id,
            email: existingUser!.email
        },
            process.env.JWT_KEY!
        )


        // Store iton session Object
        req.session = {
            jwt: userJwt,
        }

        res.status(200).send(existingUser)
}


export const signout = (req: Request, res: Response) => {
    req.session = null;
    res.send({})
}


export const currentUser = (req: Request, res: Response) => {
    res.send({currentUser: req.currentUser || null});
}