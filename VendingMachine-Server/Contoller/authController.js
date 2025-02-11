import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import multer from 'multer';
import { cpSync } from 'fs';
import {generateOTP2,verifyOTP} from '../model/OTP.js';
// const login=async(req,res)=>{
 
//     try{
//         const result=await checkUser(req.body);

//         if(result.success){
//             res.status(200).json(result);
//         }
        
//         res.result;
//     }catch(err){
//         console.log(err);
//     }
// }

// const signIN=async(req,res)=>{
//     console.log(req.body);
// }

const generateOTP = async(req,res) => {

    try{
        const result= generateOTP2(req.body);

        if(result.success){
            res.status(200).json(result);
        }
        
        res.result;
    }catch(err){
        console.log(err);
    }
};


const validateOTP = async(req,res) => {
    try{
        const result= verifyOTP(req.body);

        if(result.success){
            console.log(result.success);
            res.status(200).json(result);
        }
        
        res.result;
    }catch(err){
        console.log(err);
    }
};
export {generateOTP,validateOTP};