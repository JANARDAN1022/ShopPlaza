const express = require('express');
const { geAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail,getProductsByCategory,getSimilarProducts,UpdateAll } = require('../Controllers/Product-Controller');
const { authenticate, authenticaterole } = require('../middlewares/Auth');

const router = express.Router();

router.route('/').get( geAllProducts);
router.route('/product/new').post(authenticate,authenticaterole("admin"),  createProduct);
router.route('/product/:id').get(getProductDetail).put(authenticate,authenticaterole("admin"),  updateProduct).delete(authenticate,authenticaterole("admin"),  deleteProduct);
router.route("/category/:category").get(getProductsByCategory);
router.route("/similar/:productId").get(getSimilarProducts);
router.route("/UpdateAll/:id").put(UpdateAll);


module.exports = router;