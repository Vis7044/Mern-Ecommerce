const express = require('express')

const router = express.Router()

const userSignupController = require('../controller/user/userSignup');
const userSinginController = require('../controller/user/userSignin');
const userDetaisController = require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout');
const allUserController = require('../controller/user/allUsers');
const updateUserController = require('../controller/user/updateUser');
const UploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getProductCategoryController = require('../controller/product/getSingleCategoryProduct');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCartProduct = require('../controller/user/countAddToCartProduct');
const getAddToCartProduct = require('../controller/user/getAddToCartProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCart');
const deleteAddToCartProduct = require('../controller/user/deleteCartItem');
const searchProduct = require('../controller/product/searchProduct');
const filterProductcontroller = require('../controller/product/filterProduct');
const paymentController = require('../controller/order/paymentController');
const webhooks = require('../controller/order/webhook');
const orderController = require('../controller/order/order_controller');


router.post('/signup',userSignupController);
router.post('/signin',userSinginController);
router.get('/user-details',authToken,userDetaisController)
router.get('/userLogout',authToken,userLogout)

//admin panel
router.get('/all-user',authToken,allUserController)
router.post('/update-user',authToken,updateUserController)


//products

router.post('/upload-product',authToken,UploadProductController)
router.get('/get-product',getProductController)
router.post('/update-product',authToken,updateProductController)
router.get('/get-ProductCategory',getProductCategoryController)
router.post('/category-product',getCategoryWiseProduct)
router.post('/product-details',getProductDetails)
router.get('/search',searchProduct)
router.post('/filter-product',filterProductcontroller)

//user add to cart
router.post('/addToCart',authToken,addToCartController)
router.get('/countAddToCartProduct',authToken,countAddToCartProduct)
router.get('/view-cart-product',authToken,getAddToCartProduct)
router.post('/update-cart-product',authToken,updateAddToCartProduct)
router.post('/deleteCartProduct',authToken,deleteAddToCartProduct)


//payments and orders
router.post('/checkout',authToken,paymentController)
router.post('/webhook',webhooks) // /api/webhook
router.get('/order-list',authToken,orderController)

module.exports = router;