const Supplier = require("../models/supplierModel");
const Products = require("../models/productModel");

const categoryCtrl = {
  getSupplier: async (req, res) => {
    try {
      const categories = await Supplier.findAll();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createSupplier: async (req, res) => {
    try {
      // if user have role = 1 ---> admin
      // only admin can create , delete and update category
      const { name, tel, address } = req.body;
      const category = await Supplier.findOne({ where: { name: name } });
      if (category)
        return res.status(400).json({ msg: "This category already exists." });

      Supplier.create({ name, tel, address });

      res.json({ msg: "ສ້າງຜູ້ສະໜອງສຳເລັດແລ້ວ." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteSupplier: async (req, res) => {
    try {
      // const products = await Products.findOne({ category: req.params.id });
      // if (products)
      //   return res.status(400).json({
      //     msg: "Please delete all products with a relationship.",
      //   });

      await Supplier.findByIdAndDelete(req.params.id);
      res.json({ msg: "ລົບຜູ້ສະໜອງສຳເລັດແລ້ວ." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateSupplier: async (req, res) => {
    try {
      const { name, tel, address } = req.body;
      const _id = req.params.id;
      await Category.update({ name, tel, address }, { where: { id: _id } });

      res.json({ msg: "ແກ້ໄຂຜູ້ສະໜອງສຳເລັດແລ້ວ." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryCtrl;
