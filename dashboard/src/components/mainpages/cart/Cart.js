import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item.id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item.id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("ທ່ານຕ້ອງການລົບສິນຄ້ານີ້ອອກຈາກກະຕ່າຫຼືບໍ່?")) {
      cart.forEach((item, index) => {
        if (item.id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const paymentSuccess = async () => {
    await axios.post(
      "/api/paymentOffline",
      { cart },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    alert("ການສັ່ງຊື້ສຳເລັດແລ້ວ.");
  };

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "2rem" }}>ບໍ່ມີສິນຄ້າ</h2>
    );

  return (
    <div className="cart-container">
      <table>
        <thead>
          <tr>
            <th>ຮູບພາບສິນຄ້າ</th>
            <th>ຊື່ສິນຄ້າ</th>
            <th>ຈຳນວນ</th>
            <th>ລາຄາ</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <>
              <tr key={product.id}>
                <td>
                  <img
                    src={product.images.url}
                    alt=""
                    style={{ height: "100px", width: "100px" }}
                  />
                </td>
                <td>
                  <h2>{product.title}</h2>
                </td>
                <td>
                  <div className="amount">
                    <button onClick={() => decrement(product.id)}> - </button>
                    <span>{product.quantity}</span>
                    <button onClick={() => increment(product.id)}> + </button>
                  </div>
                </td>

                <td>
                  <h3>
                    {(product.price * product.quantity).toLocaleString("en")}{" "}
                    ກີບ
                  </h3>
                </td>
                <td>
                  <div onClick={() => removeProduct(product.id)}>
                    <DeleteIcon />
                  </div>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <div className="total">
        <h3>ລາຄາລວມ: {total.toLocaleString("en")} ກີບ</h3>
        <Button variant="contained" onClick={paymentSuccess}>
          ສຳເລັດການສັ່ງຊື້
        </Button>
      </div>
      {/* {cart.map((product) => ( */}
      {/* <img
            src={product.images.url}
            alt=""
            style={{ height: "150px", width: "150px" }}
          /> */}

      {/* <div className="box-detail">
            <h2>{product.title}</h2>

            <h3>
              {(product.price * product.quantity).toLocaleString("en")} ກີບ
            </h3>
            <p>{product.description}</p>
            <p>{product.content}</p>

            <div className="amount">
              <button onClick={() => decrement(product.id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product.id)}> + </button>
            </div>

            <div className="delete" onClick={() => removeProduct(product.id)}>
              X
            </div>
          </div> */}
    </div>
  );
}

export default Cart;
