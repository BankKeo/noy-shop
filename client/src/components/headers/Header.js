import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 0 5px;
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const loggedRouter = () => {
    return (
      <>
        <MenuItem>
          <NavLink to="/history">ປະຫວັດການສັ່ງຊື້</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/" onClick={logoutUser}>
            ອອກຈາກລະບົບ
          </NavLink>
        </MenuItem>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>LA</Language>
          <SearchContainer>
            <Input placeholder="ຄົ້ນຫາ" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>NOY'S</Logo>
        </Center>
        <Right>
          {isLogged ? (
            loggedRouter()
          ) : (
            <>
              <MenuItem>
                <NavLink to="/register">ສະໝັກສະມາຊິກ</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/login">ເຂົ້າສູ່ລະບົບ</NavLink>
              </MenuItem>
            </>
          )}
          <MenuItem>
            <Badge badgeContent={cart.length} color="primary">
              <Link to="/cart">
                <ShoppingCartOutlined />
              </Link>
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Header;
