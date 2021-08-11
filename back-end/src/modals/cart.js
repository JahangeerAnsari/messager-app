const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
 userId: {
     type: mongoose.Schema.Types.ObjectId,
     ref:'User'
 },
 products:[{
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
     },
     quantity:{
         type: Number,
         default: 1
     },
     price:{
         type:String,
         required:String
     }
 }]
    
},
    {
        timestamps: true
    }  
)

module.exports = mongoose.model('Cart', cartSchema);