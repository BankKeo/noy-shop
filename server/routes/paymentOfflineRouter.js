const router = require("express").Router();
const paymentOfflineCtrl = require("../controllers/paymentOfflineCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/paymentOffline")
  .get(auth, paymentOfflineCtrl.getPaymentsOffline)
  .post(auth, paymentOfflineCtrl.createPaymentOffline);

module.exports = router;
