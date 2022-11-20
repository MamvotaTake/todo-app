import express from 'express';
import * as userService from '../service/userService'
const router = express.Router();

router
.route('/')
.post(userService.createUser)
.get(userService.getAllUsers);

router
.route('/:id')
.get(userService.getUser)
.patch(userService.updateUser)
.delete(userService.deleteUser)

export default router;