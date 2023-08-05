const express = require('express');
//const { authenticate, authenticaterole } = require('../middlewares/Auth');
const {RegisterSeller,DeleteSellerAccount} = require('../Controllers/SellerController.js');
const router = express.Router();


router.route('/RegisterSeller/:id').post(RegisterSeller);
router.route('/DeleteAccount/:SellerId/:UserId').delete(DeleteSellerAccount);

module.exports = router;