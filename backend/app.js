const express = require('express');
const bodyparser = require('body-parser');
const errorHandler = require('./middlewares/ErrorHandler');
const UserRoute = require('./Routes/UserRoute');
const ProductRoute = require('./Routes/ProductRoute');
const ShippingInfoRoute = require('./Routes/ShippingInfoRoute.js');
const CartRoute = require('./Routes/CartRoute.js');
const PaymentRoute = require('./Routes/PaymentRoute.js');
const SellerRoute = require('./Routes/SellerRoutes.js');
const OrderRoute = require('./Routes/OrderRoute.js');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const cors = require('cors');
const app = express();






app.use(bodyparser.urlencoded({extended:true}));

const allowedOrigins = [
  'http://localhost:3000', // Add other origins as needed
  'https://shop-plaza-frontend.vercel.app', // Remove the trailing slash from the URL
  'https://shop-plaza-frontend-git-master-janardanayachi3-gmailcom.vercel.app',
  'https://shop-plaza-frontend-nhsera55b-janardanayachi3-gmailcom.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(fileupload());



app.use("/api/users/",UserRoute);
app.use("/api/Products/",ProductRoute);
app.use("/api/",ShippingInfoRoute);
app.use("/api/Cart/",CartRoute);
app.use("/api/Payment/",PaymentRoute);
app.use("/api/BecomeSeller",SellerRoute);
app.use("/api/Orders/",OrderRoute);
app.use(errorHandler);

app.get('/',(req,res)=>{
res.json('Wroking, Hello');
});

module.exports = app;