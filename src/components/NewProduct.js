import React, { useContext, useState } from "react";
import { saveProduct } from "../app/repository/productRepository";
import { AppContext } from "../app/repository/app";

function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);
  const [numberState, setNumberState] = useContext(AppContext);

  const handleSaveProduct = (event) => {
    event.preventDefault();
    const product = { name, price, checked };
    saveProduct(product)
      .then((resp) => {
        alert(JSON.stringify(resp.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="row p-1">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSaveProduct}>
              <div className="mb-3">
                <label className="form-label">Name : {numberState}</label>
                <input
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Price :</label>
                <input
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                ></input>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={(e) => setChecked(e.target.value)}
                  value={checked}
                />
                <label className="form-check-label">Checked</label>
              </div>
              <button className="btn btn-success">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
