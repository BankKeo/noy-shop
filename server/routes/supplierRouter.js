const router = require("express").Router();
const supplierCtrl = require("../controllers/supplierCtrl");
const auth = require("../middleware/auth");

router
  .route("/supplier")
  .get(supplierCtrl.getSupplier)
  .post(auth, supplierCtrl.createSupplier);

router
  .route("/supplier/:id")
  .delete(auth, supplierCtrl.deleteSupplier)
  .put(auth, supplierCtrl.updateSupplier);

module.exports = router;
