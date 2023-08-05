const ErrorHandler = require('../middlewares/ErrorHandler');
const Product = require('../Models/ProductModel');
const catchasyncerror = require('../middlewares/AsyncError');
const apifeature = require('../utils/apiFeatures');

//const User = require('../Models/UserModel');




//create product--Admin
exports.createProduct = catchasyncerror(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product })
});



//get Product Details
exports.getProductDetail = catchasyncerror(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('SellerInfo','SellerEmail FullName BuisnessName');;
  if (!product) {
    return next({ message: 'Product not found', statusCode: 404 });
  }
  res.status(200).json({ success: true, product });
});



//get all products
exports.geAllProducts = catchasyncerror(async (req, res) => {
  const limit = 48;
  //const product = await Product.find();
  const productcount = await Product.countDocuments();
  const feature = apifeature(Product.find(), req.query)
  feature.search()
  feature.filter()
  //feature.paginate();
  const products = await feature.paginate(limit).populate('SellerInfo','SellerEmail FullName BuisnessName');

  res.status(200).json({ success: true, products, productcount, limit });
});

//Products for specific category
exports.getProductsByCategory = catchasyncerror(async (req, res) => {
 const limit = 8;
  const category = req.params.category;
  const productcount = await Product.countDocuments({ category }); // count products that match the category filter
  const feature = apifeature(Product.find({ category }),req.query);
  const products = await feature.paginate(limit).populate('SellerInfo','SellerEmail FullName BuisnessName');
 //const products = await Product.find({category});
  res.status(200).json({ success: true, products ,productcount});
});



// get similar products for a selected product
exports.getSimilarProducts = catchasyncerror(async (req, res) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  const feature = apifeature(Product.find(
    { $text: { $search: product.name } },
    { score: { $meta: 'textScore' } }
  ).sort({score : {$meta: 'textScore'}}) ,req.query);
  feature.filter();

  const relatedProducts = await feature.paginate(21).populate('SellerInfo','SellerEmail FullName BuisnessName');;
  const MaxAmount = Math.max(...relatedProducts.map((P)=>P.price));
    
    res.status(200).json({ success: true, relatedProducts,MaxAmount });
});

//Update All Products
exports.UpdateAll = catchasyncerror(async(req,res,next)=>{

const sellerId = req.params.id; // Provide the SellerId in the request body or use any other means to obtain it
const {Category} = req.body; // Array of product IDs to update and populate

// Update the products with the provided sellerId
const Products = await Product.updateMany(
  { category:Category },
  { SellerInfo: sellerId }
);

res.status(200).json({ success: true,message:'Updated',Products});
});




//Update product--Admin
exports.updateProduct = catchasyncerror(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next({ message: 'Product not found', statusCode: 404 });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  res.status(200).json({
    success: true,
    product
  })
});



//delete product
exports.deleteProduct = catchasyncerror(async (req, res) => {

  const product = await Product.findById(req.params.id);
  if (!product) {
    return next({ message: 'Product not found', statusCode: 404 });
  }
  await Product.deleteOne({ _id: req.params.id });
  res.status(200).json(
    {
      success: true,
      message: "product deleted successfully"
    })
});

