 const Product = require('../modals/product')
 const slugify = require('slugify')
exports.addProduct = (req,res) =>{
//   unque product
 Product.findOne({ name : req.body.name})
 .exec((error, product) =>{
   if(error){
     return res.status(400).json({
       message:'Someting went wrong',
       error
     })
   }
   if(product){
     return res.status(400).json({
       message:'Product Already Exits',
        product
     })
   }
 })
  
 const { name ,price , description,quantity,category,createdBy} = req.body;

  //  add single image /
//   res.status(200).json({
      // file: req.file,    req.files=> for multiple pictures
//       body: req.body
//   })

  //  let add multiple product pictures
  let productPictures = [];
    // in case of there is an image we have to add
    if(req.files.length > 0){
      productPictures = req.files.map(file =>{
        return { img : file.filename}
      })
    }
   const product = new Product({
     name: req.body.name,
     slug : slugify(name),
     price,
     description,
     quantity,
     category,
     productPictures,
     createdBy : req.user._id
   })


   product.save((error,_product) =>{
        if(error){
            return res.status(400).json({
                message:'Could not add product',
                error
            })
        }
        if(_product){
            return res.status(201).json({
                message:'New Product is Added !',
                _product
            })
        }
    })
     



}