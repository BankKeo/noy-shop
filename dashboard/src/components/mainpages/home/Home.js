import Axios from "axios";
import "./home.css";
import React, { useEffect, useState } from "react";
import File from "../../file/File";
import BtnRender from "./BtnRender";

const Home = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(`http://localhost:5000/product?q=${query}`);
      setData(res.data);
    };
    if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);

  return (
    <div className="container">
      <File />
      <div className="wrapper">
        <div style={{ width: "100%" }}>
          <input
            placeholder="ກະລຸນາປ້ອນລະຫັດສິນຄ້າ..."
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
            value={query}
          />
        </div>

        <div className="products">
          {data.map((product) => (
            <div className="product_card" key={product.id}>
              <img src={product.images.url} alt="" />

              <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>{product.price.toLocaleString("en-US")}ກີບ</span>
                <p>{product.description}</p>
              </div>

              <BtnRender product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
