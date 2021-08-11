
const express = require('express');
const { signup, signin, getAllUsers } = require('../controllers/user.controller');
const { validateSignupRequest, isRequestValidates, validateSigninRequest } = require('../validators/auth.validates');

const route = express.Router();

 route.post('/signup', validateSignupRequest, isRequestValidates, signup);
 route.post('/signin', validateSigninRequest, isRequestValidates, signin);
 route.get('/getAllUser',  getAllUsers );

// middleWare 
// getAllUser



module.exports = route;