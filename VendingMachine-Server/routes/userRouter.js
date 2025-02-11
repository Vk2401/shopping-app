import express from 'express';
import {addUser} from '../Contoller/userController.js';
const userRouter=express.Router();

userRouter.post('/signin',addUser);

export default userRouter;