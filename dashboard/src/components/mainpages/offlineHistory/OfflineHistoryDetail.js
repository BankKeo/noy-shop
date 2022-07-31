import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

const OfflineHistoryDetail = () => {
  const state = useContext(GlobalState);
  const [offlineHistory] = state.userAPI.history;
  const [orderDetails, setOrderDetails] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      offlineHistory.forEach((item) => {
        if (params.id !== item.id) setOrderDetails(item);
      });
    }
  }, [params.id, offlineHistory]);

  if (orderDetails.length === 0) return null;

  const print = () => {
    window.print();
  };

  return (
    <div className="history-page">
      <button onClick={print}>Print</button>

      <h1 style={{ textAlign: "center" }}>ໃບບິນຮັບສິນຄ້າ</h1>

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

      <h4 style={{ textAlign: "right" }}>ລາຍເຊັນຄົນຮັບສິນຄ້າ</h4>
    </div>
  );
};

export default OfflineHistoryDetail;
