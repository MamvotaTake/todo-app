import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '@takesure/common';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError();
    }

    next();
}