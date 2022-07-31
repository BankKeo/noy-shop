const Users = require("../models/userModel");
const PaymentOffline = require("../models/paymentOfflineModel");

const paymentCtrl = {
  getPaymentsOffline: async (req, res) => {
    try {
      const paymentOffline = await PaymentOffline.findAll();
      res.json(paymentOffline);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createPaymentOffline: async (req, res) => {
    try {
      const user = await Users.findOne({ where: { id: req.user.id } });
      if (!user)
        return res.status(400).json({ msg: "ຍັງບໍ່ມີຜູ້ໃຊ້ກະລຸນາລົງທະບຽນ." });

      const { cart } = req.body;

      PaymentOffline.create({
        cart,
      });
      res.json({ msg: "ການສັ່ງຊື້ສຳເລັດ!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = paymentCtrl;
