import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import multer from 'multer';
import { cpSync } from 'fs';
import {addNewUser} from '../model/User.js';

const addUser=async(req,res)=>{
    try{
        const result=await addNewUser(req.body);

        if(result.success){
            res.status(200).json({success:true, message: 'Use signin successfully!' })
        }
        res.status(500).json({ message: 'Database error' })
    }catch(err){
        console.log(err);
    }
}

export {addUser};