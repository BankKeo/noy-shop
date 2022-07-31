import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

function BtnRender({ product, deleteProduct }) {
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;

  return (
    <div className="row_btn">
      <>
        <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
          ເກັບໃສ່ກະຕ່າ
        </Link>
        <Link id="btn_view" to={`/detail/${product.id}`}>
          ລາຍລະອຽດສິນຄ້າ
        </Link>
      </>
    </div>
  );
}

export default BtnRender;
