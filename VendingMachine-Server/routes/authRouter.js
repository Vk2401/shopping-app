import express from 'express';
import {generateOTP,validateOTP} from '../Contoller/authController.js';
const authRouter=express.Router();

// authRouter.post('/signin',signIN);
// authRouter.post('/login',login);
authRouter.post('/request-otp',generateOTP);
authRouter.post('/verify-otp',validateOTP);
export default authRouter;