import pool from '../db/dbconfig.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const addNewUser=async (newUser)=>{
    console.log(newUser.pnumber);
  
    // const { username, useremail, userpassword } = newUser;
    // const role='';
    // const hashedPassword = await bcrypt.hash(userpassword, 10); 
  
    const query = `INSERT INTO user (mobileNo) VALUES (?)`;
    const [result] = await pool.query(query, [newUser.pnumber]);
    console.log(result);
        
    if (result.affectedRows === 1) {
        return { success: true };
    } else {
        return { success: false };
    }
  
}


// const checkUser = async (userData) => {
 
//     const { useremail, userpassword } = userData;
//     const query = `SELECT * FROM users WHERE email = ?`;
  
//     const [result] = await pool.query(query, [useremail]);
//     if (result.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const user = result[0]; // User details from DB
//     const isMatch = await bcrypt.compare(userpassword, user.password);

//     if (isMatch) {
//       // Create a JWT token if passwords match
//       const token = jwt.sign(
//           { _id: user.ID, role: user.role },
//           process.env.JWT_KEY,
//           { expiresIn: '10d' }
//       );

//       return {
//           success: true,
//           message: 'Login successful',
//           token,
//           user: {
//               _id: user.ID,
//               name: user.username,
//               role: user.role,
//           }
//       }
//   } else {
//       return { success: true,message: 'Invalied Data'}
//   }
// };

  
export {addNewUser};