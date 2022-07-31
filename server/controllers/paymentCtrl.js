const Payments = require("../models/paymentModel");
const Users = require("../models/userModel");
const PaymentOffline = require("../models/paymentOfflineModel");
const Products = require("../models/productModel");

const paymentCtrl = {
  getPayments: async (req, res) => {
    try {
      const payments = await Payments.findAll();
      res.json(payments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await Users.findOne({ where: { id: req.user.id } });
      if (!user)
        return res.status(400).json({ msg: "ຍັງບໍ່ມີຜູ້ໃຊ້ກະລຸນາລົງທະບຽນ." });

      const { cart, paymentID, address } = req.body;

      const { id, name, email } = user;

      Payments.create({
        user_id: id,
        name: name,
        email: email,
        cart: cart,
        paymentID: paymentID,
        address: address,
      });
      res.json({ msg: "ການສັ່ງຊ້ື້ສຳເລັດ!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPayments: async (req, res) => {
    try {
      const PaymentOffline = await Payments.findAll();
      res.json(PaymentOffline);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = paymentCtrl;
