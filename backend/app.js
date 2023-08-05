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

app.use(cors({  
origin: 'http://localhost:3000',
credentials: true,
}
 ));

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

module.exports = app;