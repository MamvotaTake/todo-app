import express from 'express';
import { currentUser } from '../middleware/current-user';
import { requireAuth } from '../middleware/require-auth';
import * as userService from '../service/userService'
const router = express.Router();

router
    .route('/')
    .get(
        currentUser,
        requireAuth,
        userService.getAllUsers
    );

router
    .route('/:id')
    .get(
        currentUser,
        requireAuth,
        userService.getUser
    )
    .patch(
        currentUser,
        requireAuth,
        userService.updateUser
    )
    .delete(
        currentUser,
        requireAuth,
        userService.deleteUser
    )

export default router;