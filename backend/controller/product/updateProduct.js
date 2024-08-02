const productModel = require("../../models/productModel");
const uploadProductPermission = require('../../helpers/permission')

async function updateProductController(req,res) {
    try {
        if(uploadProductPermission(req.userId)==true) {
            throw new Error('Permission Denied');
        }

        const { _id, ...rest} = req.body;
        const updateProduct = await productModel.findByIdAndUpdate(_id,rest)
        res.json({
            message: 'product updated successfully',
            data: updateProduct,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
          });
    }
}

module.exports = updateProductController