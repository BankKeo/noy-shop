import React, { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import File from "../../file/File";
import "./supplier.css";
import axios from "axios";

function Supplier() {
  const state = useContext(GlobalState);
  const [suppliers] = state.SupplierAPI.suppliers;
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.SupplierAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const createSupplier = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/supplier/${id}`,
          { name: name, tel: tel, address: address },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/supplier",
          { name: name, tel: tel, address: address },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      }
      setOnEdit(false);
      setName("");
      setTel("");
      setAddress("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editSupplier = async (id, name) => {
    setID(id);
    setName(name);
    setTel(tel);
    setAddress(address);
    setOnEdit(true);
  };

  const deleteSupplier = async (id) => {
    try {
      const res = await axios.delete(`/api/supplier/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="container">
      <File />
      <div className="wrapper">
        <div className="categories">
          <form className="supplier-form" onSubmit={createSupplier}>
            <div>
              <label htmlFor="name">ຊື່</label>
              <input
                type="text"
                name="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="tel">ຕິດຕໍ່</label>
              <input
                type="text"
                name="tel"
                value={tel}
                required
                onChange={(e) => setTel(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="address">ທີ່ຢູ່</label>
              <input
                type="text"
                name="address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button type="submit">{onEdit ? "ແກ້ໄຂ" : "ສ້າງ"}</button>
          </form>

          <div className="col">
            {suppliers.map((category) => (
              <div key={category.id}>
                <table>
                  <thead>
                    <tr>
                      <th>ຊື່</th>
                      <th>ຕິດຕໍ່</th>
                      <th>ທີ່ຢູ່</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map((items) => (
                      <tr key={items.id}>
                        <td>{items.name}</td>
                        <td>{items.tel}</td>
                        <td>{items.address}</td>
                        <td>
                          <button
                            onClick={() =>
                              editSupplier(category._id, category.name)
                            }
                          >
                            ແກ້ໄຂ
                          </button>
                        </td>
                        <td>
                          <button onClick={() => deleteSupplier(category._id)}>
                            ລົບ
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* <p>{category.name}</p>
                <p>{category.tel}</p>
                <p>{category.address}</p> */}
                {/* <div>
                  <button
                    onClick={() => editSupplier(category._id, category.name)}
                  >
                    ແກ້ໄຂ
                  </button>
                  <button onClick={() => deleteSupplier(category._id)}>
                    ລົບ
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Supplier;
