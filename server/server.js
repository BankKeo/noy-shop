require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/database");
const Products = require("./models/productModel");
const { Op } = require("sequelize");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

const connectDatabase = async () => {
  try {
    await db.authenticate();
    console.log("Database Connected");
  } catch (error) {
    console.error("Database Disable", error);
  }
};

connectDatabase();

// Routes
app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/productRouter"));
app.use("/api", require("./routes/paymentRouter"));
app.use("/api", require("./routes/paymentOfflineRouter"));
app.use("/api", require("./routes/supplierRouter"));

app.get("/product", async (req, res) => {
  const { q } = req.query;

  const products = await Products.findAll({
    where: {
      product_id: { [Op.like]: `%${q}%` },
    },
    limit: 10,
  });

  res.json(products);

  try {
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
