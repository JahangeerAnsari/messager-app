const { check, validationResult } = require('express-validator')
exports.validateSignupRequest = [
      check('firstName')
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage('firstName must be at least 5 chars long'),
      
        check('lastName')
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage('lastName must be at least 5 chars long'),
      
        check('email')
        .isEmail()
        .withMessage('Valid email is required'),

        check('password')
        .isLength({ min: 6 })
        .withMessage('password must be at least 6chars long'),
];
exports.validateSigninRequest = [

   check('email')
        .isEmail()
        .withMessage('Valid email is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('password must be at least 6chars long'),
    
];


exports.isRequestValidates = (req,res,next) =>{
    const errors = validationResult(req);
    if(errors.array().length > 0){
       return res.status(400).json({
        error: errors.array()[0].msg,  
        //   message: " valid input"
    
          
        })
    }
    next();
}