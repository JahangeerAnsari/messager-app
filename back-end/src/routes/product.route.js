
const express = require('express');
const multer  = require('multer');
const path = require('path');
const shortid = require('shortid')
const { requiredSignin, adminMiddleWare } = require('../common-middleware');
const { addProduct } = require('../controllers/product.controller');


const route = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // path.dirname => currentDirectory name =routes
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate()+ '-' + file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

route.post('/product/create',requiredSignin,adminMiddleWare, upload.array('productPictures'), addProduct);


module.exports = route;