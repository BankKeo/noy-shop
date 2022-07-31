import React from "react";
import BtnRender from "./BtnRender";

function ProductItem({ product, deleteProduct, handleCheck }) {
  return (
    <div className="product_card">
      <input
        type="checkbox"
        checked={product.checked}
        onChange={() => handleCheck(product.id)}
      />

      <img src={product.images.url} alt="" />

      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price.toLocaleString("en-US")}</span>
        <p>{product.description}</p>
      </div>

      <BtnRender product={product} deleteProduct={deleteProduct} />
    </div>
  );
}

export default ProductItem;
