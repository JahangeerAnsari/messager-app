
const express = require('express');
const { signup, signin } = require('../../controllers/admin/admin.controller');
const { isRequestValidates, validateSignupRequest, validateSigninRequest } = require('../../validators/auth.validates');

const route = express.Router();

route.post('/admin/signup',validateSignupRequest, isRequestValidates, signup);
route.post('/admin/signin',validateSigninRequest, isRequestValidates,signin);
// route.post('/getAllUsers',fetchedAllUsers)
// middleWare 

module.exports = route;