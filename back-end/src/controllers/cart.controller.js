const { response } = require('express');
const Cart = require('../modals/cart')

exports.addToCart = async (req, res) => {
    // lets check cart exits then only we store items into it
    const { productId, quantity, price, userId } = req.body;

    try {

        // if there is userId present then cat is also assig
        let cart = await Cart.findOne({ userId });
        // if cart exits we have to add items on it
        let response = {
            status: 500,
            message: '',
            error: '',
        }
        if (cart) {
            //cart -> products [ { }, { } ]
            const existedProduct = cart.products.find(obj => {
                console.log('---->******8 product --- > ', obj.productId, productId, obj.productId == productId)
                if (obj.productId == productId) {
                    response.message = 'Product quantity updated in the cart!';
                    response.status = 201;
                    obj.quantity += quantity;
                    return obj;
                }
            })
            console.log('----> exiisted product --- > ', existedProduct)
            if (!existedProduct) {
                console.log("---> product not existing....", { productId, quantity, price })
                cart.products.push({
                    productId, quantity, price
                });
                response.message = 'New product added to the user cart!';
                response.status = 201;
            }

            const updatedCart = await cart.save();
            if (updatedCart) {
                response.cart = updatedCart;
                return res.status(200).json(response)
            }
            response.message = 'Something went wrong!';
            return res.status(201).json(response)
        } else {
            console.log('====> inserting new cart...', { productId, userId, quantity, price })
            // there is not cart we have to create cart for user
            const newCart = new Cart({
                userId,
                products: [{
                    productId, quantity, price
                }]
            });

            newCart.save((error, _newCart) => {
                if (error) {
                    return res.status(400).json({
                        message: 'Could not create new cart',
                        error
                    })
                }
                if (_newCart) {
                    return res.status(201).json({
                        message: 'New Cart has been created',
                        _newCart
                    })
                }
            })

        }

    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'Something went wrong',
            err
        });
    }


}