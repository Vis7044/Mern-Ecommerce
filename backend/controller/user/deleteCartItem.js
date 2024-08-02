const addToCartModel = require("../../models/CartProduct")

const deleteAddToCartProduct = async (req,res) => {
    try {
        const addToCartProductId = req.body._id
        const deleteProduct = await addToCartModel.deleteOne({_id:addToCartProductId})

        res.json({
            message: 'Product Delete from Cart Successfully',
            error: false,
            success: true,
            data: deleteProduct
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
        
    }
}

module.exports = deleteAddToCartProduct