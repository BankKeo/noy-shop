import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

const OrderDetails = () => {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetails, setOrderDetails] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (params.id !== item.id) setOrderDetails(item);
      });
    }
  }, [params.id, history]);

  if (orderDetails.length === 0) return null;

  const print = () => {
    window.print();
  };

  return (
    <div className="history-page">
      <button onClick={print}>Print</button>
      <table>
        <thead>
          <tr>
            <th>ຊື່</th>
            <th>ສະຖານທີ່ຈັດສົ່ງ</th>
            <th>ລະຫັດໄປສະນີ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetails.address.recipient_name}</td>
            <td>
              {orderDetails.address.line1 + " - " + orderDetails.address.city}
            </td>
            <td>{orderDetails.address.postal_code}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ margin: "30px 0px" }}>
        <thead>
          <tr>
            <th>ຮູບພາບ</th>
            <th>ສິນຄ້າ</th>
            <th>ຈຳນວນ</th>
            <th>ລາຄາ</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.cart.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  src={item.images.url}
                  style={{ width: "50px", height: "50px" }}
                  alt=""
                />
              </td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>
                {(item.price * item.quantity).toLocaleString("en-US")} ກີບ
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
