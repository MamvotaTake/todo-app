import express, { Request, Response } from 'express'


export const signup = (req: Request, res: Response) => {
    return res.send('signup please')
}


export const signin = (req: Request, res: Response) => {
    return res.send('signin please')
}


export const signout = (req: Request, res: Response) => {
    return res.send('signout please')
}


export const currentUser = (req: Request, res: Response) => {
    return res.send('currentUser please')
}