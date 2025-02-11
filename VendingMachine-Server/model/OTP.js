import pool from '../db/dbconfig.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
const otps = {};

const generateOTP2 = (phoneNumber2) => {
    const phoneNumber=phoneNumber2.pnumber;
    const OTP_EXPIRATION = 5 * 60 * 1000;
    const otp = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit OTP

    const expiresAt = Date.now() + OTP_EXPIRATION;

    const token = jwt.sign({ phoneNumber, otp, expiresAt },  process.env.JWT_KEY, {
      expiresIn: "5m",
    });
  
    true;

    otps[phoneNumber] = { otp, expiresAt, token }; // Store OTP temporarily
  
    return { success: true , message: "OTP Generaterd successfully",data:[otp, expiresAt, token] };
  };

const verifyOTP = (PnoData) => {
    const { phoneNumber, otp } = PnoData;
 

    if (!phoneNumber || !otp) {
        return { success: false , message: "Phone number and OTP are required" };
      }

    const storedOTP = otps[phoneNumber];
      if (!storedOTP) {
        return { success: false , message: "OTP expired or not requested" };
    } 

    if (storedOTP.otp !== parseInt(otp)) {
        return { success: false , message: "Invalid OTP" };
    }
    
    delete otps[phoneNumber]; // Remove OTP after successful verification
    return { success: true , message: "OTP verified successfully" };
}

  export {generateOTP2,verifyOTP};