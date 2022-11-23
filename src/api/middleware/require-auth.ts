import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '@takesure/common';

/**
 * Description - The middleware for protecting our routes
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError();
    }

    next();
}