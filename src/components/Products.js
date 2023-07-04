import {
  faCheckCircle,
  faCircle,
  faEdit,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import {
  checkProduct,
  deleteProduct,
  getProductsCheckedFiltered,
  getProductsFilterdAndPagined,
} from "../app/repository/productRepository";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../app/repository/app";

function Products() {
  const [keyFilter, setKeyFilter] = useState("");
  const navigate = useNavigate();
  const [numberState, setNumberState] = useContext(AppContext);
  const [productState, setProductState] = useState({
    products: [],
    currentPage: 1,
    pageSize: 4,
    keyword: "",
    totalPage: 0,
  });

  useEffect(() => {
    handleGetProducts(
      productState.keyword,
      productState.currentPage,
      productState.pageSize
    );
  }, []);

  const handleGetProducts = (keyword, page, size) => {
    getProductsFilterdAndPagined(keyword, page, size)
      .then((resp) => {
        const totalElements = resp.headers["x-total-count"];
        let totalPages = Math.floor(totalElements / size);
        if (totalElements % size != 0) ++totalPages;
        setProductState({
          ...productState,
          products: resp.data,
          keyword: keyword,
          currentPage: page,
          pageSize: size,
          totalPage: totalPages,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteProduct = (product) => {
    deleteProduct(product)
      .then(() => {
        const newProducts = productState.products.filter(
          (p) => p.id != product.id
        );
        setProductState({ ...productState, products: newProducts });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckedProduct = (product) => {
    checkProduct(product)
      .then(() => {
        const newProducts = productState.products.map((p) => {
          if (p.id == product.id) {
            p.checked = !p.checked;
          }
          return p;
        });
        setProductState({ ...productState, products: newProducts });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePage = (page) => {
    handleGetProducts(productState.keyword, page, productState.pageSize);
    setProductState({ ...productState, currentPage: page });
    setNumberState(numberState + 1);
  };

  const handleFilter = (event) => {
    event.preventDefault();
    handleGetProducts(keyFilter, 1, productState.pageSize);
  };

  return (
    <div className="p-1 m-1">
      {numberState}
      <div className="row">
        <div className="col-md-6">
          <div className="card m-1">
            <div className="card-body">
              <form onSubmit={handleFilter}>
                <div className="row g-2">
                  <div className="col-auto">
                    <input
                      value={keyFilter}
                      className="form form-control"
                      onChange={(e) => setKeyFilter(e.target.value)}
                    ></input>
                  </div>
                  <div className="col-auto">
                    <button className="btn btn-success">
                      <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="card m-1">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Checked</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {productState.products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>
                        <button
                          onClick={() => handleCheckedProduct(product)}
                          className="btn btn-outline-success"
                        >
                          <FontAwesomeIcon
                            icon={product.checked ? faCheckCircle : faCircle}
                          ></FontAwesomeIcon>
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteProduct(product)}
                          className="btn btn-outline-danger"
                        >
                          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-success"
                          onClick={() => navigate(`/editProduct/${product.id}`)}
                        >
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="nav nav-pills">
                {new Array(productState.totalPage).fill(0).map((v, index) => (
                  <li key={index}>
                    <button
                      className={
                        productState.currentPage == index + 1
                          ? "btn btn-info ms-1"
                          : "btn btn-outline-info ms-1"
                      }
                      onClick={() => handleChangePage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
