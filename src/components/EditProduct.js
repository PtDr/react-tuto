import React, { useEffect, useState } from "react";
import {
  getProductById,
  saveProduct,
  updateProduct,
} from "../app/repository/productRepository";
import { useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    handleGetProductById(id);
  }, []);

  const handleGetProductById = (id) => {
    getProductById(id).then((resp) => {
      const product = resp.data;

      setName(product.name);
      setPrice(product.price);
      setChecked(product.checked);
    });
  };

  const handleUpdateProduct = (event) => {
    event.preventDefault();
    const product = { id, name, price, checked };
    updateProduct(product)
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
            <form onSubmit={handleUpdateProduct}>
              <div className="mb-3">
                <label className="form-label">Name :</label>
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
                  checked={checked}
                  onChange={(e) => setChecked(e.target.value)}
                />
                <label className="form-check-label">Checked</label>
              </div>
              <button className="btn btn-success">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
