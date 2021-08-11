const jwt  = require('jsonwebtoken');

exports.requiredSignin = (req,res,next) => {
 
    // if user is authorized then ony generate token otherwise error msg
    if(req.headers.authorization){
      console.log("role of authorization", req.body.role)
      // lets get the token
    const token = req.headers.authorization.split(' ')[1];
    //  verify token (we passed id at time of token creation we can verify user by its token)
        //  jwt.verify => token me kya kya present hai
     const user = jwt.verify(token, process.env.SECRET_KEY);
    //  we can access the user in next call
    console.log("user", user)
     if(user){
      console.log("role of authorization --->", req.body.role)
       req.user = user;
       next();
     }else{
       res.status(400).json({
        message:'Token expired!'
       })
     }
    }else{
      res.status(400).json({
        message:'Authorization is required'
      })
    }
  
    
}


// ADMIN REQUIRED ACCESS
exports.adminMiddleWare = (req,res,next) =>{
  console.log("role********************", req.user.role)
   if(req.user.role !== "admin"){
     return res.status(400).json({
       message: 'Admin Access Denied'
     })
   }
   next();
}
exports.userMiddleWare = (req,res,next) =>{
  console.log("role", req.body.role)
   if(req.user.role !== "user"){
     return res.status(400).json({
       message: 'User Access Denied'
     })
   }
   next();
}