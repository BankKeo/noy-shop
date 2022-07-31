import React from "react";
import { Link } from "react-router-dom";

function BtnRender({ product, deleteProduct }) {
  return (
    <div className="row_btn">
      <>
        <Link
          id="btn_buy"
          to="#!"
          onClick={() => deleteProduct(product._id, product.images.public_id)}
        >
          ລົບ
        </Link>
        <Link id="btn_view" to={`/edit_product/${product.id}`}>
          ແກ້ໄຂ
        </Link>
      </>
    </div>
  );
}

export default BtnRender;
