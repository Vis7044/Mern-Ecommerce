const productModel = require("../../models/productModel")

const filterProductcontroller = async(req,res) => {
    try {
        const categoryList = req.body?.category
        const product = await productModel.find({
            category: {
                '$in' : categoryList
            }
        })

        res.json({
            data: product,
            success: true,
            error: false,
            message: 'product retrieved'
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
        
    }
}

module.exports = filterProductcontroller