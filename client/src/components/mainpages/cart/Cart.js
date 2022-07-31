import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import PaypalButton from "./PaypalButton";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  justify-content: center;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  text-align: center;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

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

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    alert("You have successfully placed an order.");
  };

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginTop: "3rem" }}>
        ບໍ່ມີສິນຄ້າ
      </h2>
    );

  console.log(cart);

  return (
    <Container>
      <Wrapper>
        <Title>ລາຍການສິນຄ້າ</Title>
        <Top>
          <TopButton>
            <Link to="/">ສືບຕໍ່ການຊື້</Link>
          </TopButton>
          <TopTexts>
            <TopText>ລາຍການໃນກະເປົ໋າ({cart.length})</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.map((product) => (
              <>
                <Product>
                  <ProductDetail>
                    <Image src={product.images.url} />
                    <Details>
                      <ProductName>
                        <b>ສິນຄ້າ:</b> {product.title}
                      </ProductName>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      {product.quantity <= 4 ? (
                        <>
                          <Remove onClick={() => decrement(product.id)} />
                          <ProductAmount>{product.quantity}</ProductAmount>
                          <Add onClick={() => increment(product.id)} />
                        </>
                      ) : (
                        <>
                          <Remove onClick={() => decrement(product.id)} />
                          <ProductAmount>{product.quantity}</ProductAmount>
                        </>
                      )}
                    </ProductAmountContainer>
                    <ProductPrice>
                      {(product.price * product.quantity).toLocaleString(
                        "en-US"
                      )}{" "}
                      ກີບ
                    </ProductPrice>
                  </PriceDetail>
                  <CloseIcon onClick={() => removeProduct(product.id)} />
                </Product>
                <Hr />
              </>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ສະຫລຸບລາການສິນຄ້າ</SummaryTitle>
            <SummaryItem type="total">
              <SummaryItemText>ລວມ</SummaryItemText>
              <SummaryItemPrice>
                {total.toLocaleString("en-US")} ກີບ
              </SummaryItemPrice>
            </SummaryItem>
            <PaypalButton total={total} tranSuccess={tranSuccess} />
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
}

export default Cart;
