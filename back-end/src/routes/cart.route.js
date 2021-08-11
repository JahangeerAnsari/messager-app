
const express = require('express');

const route = express.Router();
const { requiredSignin, userMiddleWare } = require('../common-middleware');
const { addToCart } = require('../controllers/cart.controller');
route.post('/cart/add-to-cart',  requiredSignin,userMiddleWare, addToCart);
// route.get('/category/getCategory',getCategory);

// middleWare 
module.exports = route;