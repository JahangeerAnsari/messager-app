const User = require('../modals/users')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const { validationResult} = require('express-validator');

// signup, signup,

exports.signup = (req, res) => {
    // console.log(" ++++++++-==>",req.body)
    User.findOne({ email: req.body.email }).exec( async(error, user) => {
    if (user)
      return res.status(400).json({
        error: "User already registered",
      });

    const { firstName, lastName, email, password } = req.body;
   const hash_password = await bcrypt.hash(password,10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
      role: "user",
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      if (data) {
        return res.status(201).json({
          message: "User has been successfully created ",
          user: data,
        });
      }
    });
  });
};

exports.signin = (req,res) => {
    User.findOne({ email: req.body.email }).exec( async(error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
          const isPassword = await user.authenticate(req.body.password);
          if ( isPassword) {
            const token = jwt.sign(
              { _id: user._id, role: user.role },
              process.env.SECRET_KEY,
              { expiresIn: "1d" }
            );
            const { firstName, lastName, email, role, fullName } = user;
    
            res.status(200).json({
                message: "User Login SuccesssFully",
              token,
              user: {
                firstName,
                lastName,
                email,
                role,
                fullName,
              },
            });
          } else {
            return res.status(400).json({
              message: "Invalid Email or Password",
            });
          }
        } else {
          res.status(400).json({
            message: "somrthing went wrong",
          });
        }
      });
}

exports.getAllUsers = (req,res) => {
    User.find ({}).exec((error,users) => {
        if(error){
            return res.status(400).json({
                message:'Could not get the users'
            })
        }
        if(users) {
            return res.status(200).json({
                message:'Fetched all users',
                users
            })
        }
    })
}

exports.getUsers = async (req,res) => {
    try {
        return {
            status: 200,
            users: await User.find({})
        }
    } catch(e) {
        return {
            status: 500,
            message: "Error : " + e
        }
    }
}