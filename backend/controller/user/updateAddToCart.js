const addToCartModel = require("../../models/CartProduct");

const updateAddToCartProduct = async (req, res) => {
  try {
    const addToCartProductId = req.body._id
    const qty = req.body.quantity

    const updateProduct = await addToCartModel.updateOne({_id : addToCartProductId},{
      ...(qty && {quantity : qty})
  })
    res.json({
        message: 'product updated',
        data: updateProduct,
        error: false,
        success: true
    })
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = updateAddToCartProduct
