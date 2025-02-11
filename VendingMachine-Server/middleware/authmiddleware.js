import jwt from "jsonwebtoken";


const verifyUser=async(req,res,next)=>{
 
    try{
       const token=req.headers.authorization.split(' ')[1];

       if(!token){
        return res.status(404).json({sucess:false,error:'Token Not Provided'});
       }

       const decoded=await jwt.verify(token,process.env.JWT_KEY);
       if(!decoded){
        return res.status(404).json({sucess:false,error:'Token Not Provided'});
       }
 
       const user=await getUserByID(decoded._id);

       if(!user){
        return res.status(404).json({sucess:false,error:'User not found'});
       }

       console.log('koo');
       req.user=user;
       next();
    }
    catch(err){
        return res.status(500).json({sucess:false,error:'Server side error'});
    }
}

export default verifyUser;