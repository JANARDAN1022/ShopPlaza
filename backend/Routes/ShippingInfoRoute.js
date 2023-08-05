const router = require("express").Router();
const { authenticate } = require("../middlewares/Auth");
const {
  CreateShippingInfo,
  GetUsersShippingInfo,
  DeleteShippingInfo,
  UpdateShippingInfo,
} = require("../Controllers/ShippingInfoController.js");

router
  .route("/ShippingInfo/:id")
  .post(authenticate, CreateShippingInfo)
  .get(authenticate, GetUsersShippingInfo)
  .delete(authenticate, DeleteShippingInfo)
  .put(authenticate, UpdateShippingInfo);

module.exports = router;
