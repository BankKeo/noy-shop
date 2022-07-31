const Products = require("../models/productModel");

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const products = await Products.findAll();

      res.json({
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        images,
        quantity,
        category,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      const product = await Products.findOne({
        where: { product_id: product_id },
      });
      if (product)
        return res.status(400).json({ msg: "This product already exists." });

      await Products.create({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        images,
        category,
        quantity,
      });

      res.json({ msg: "Created a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { title, price, description, images, category, quantity } =
        req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      await Products.update(
        {
          title: title.toLowerCase(),
          price: price,
          description: description,
          content: content,
          images: images,
          category: category,
          quatity: quantity,
        },
        { where: { id: req.params.id } }
      );

      res.json({ msg: "Updated a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productCtrl;
