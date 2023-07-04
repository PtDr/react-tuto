import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from "react";
import { AppContext, useAppState } from "./app/repository/app";
import { getProductsCheckedFiltered } from "./app/repository/productRepository";

function App() {
  const [currentRoute, setCurrentRoute] = useState();
  useEffect(() => {
    const path = window.location.pathname;
    setCurrentRoute(path);
  }, []);

  const menus = [
    { name: "Home", uri: "/home" },
    { name: "Products", uri: "/products" },
    { name: "NewProduct", uri: "/newProduct" },
  ];

  return (
    <AppContext.Provider value={useAppState()}>
      <BrowserRouter>
        <nav className="m-1 p-1 border border-info">
          <ul className="nav na-pills">
            {menus.map((menu) => (
              <li key={menu.name}>
                <Link
                  onClick={() => setCurrentRoute(menu.uri)}
                  className={
                    currentRoute == menu.uri
                      ? "btn btn-info ms-1"
                      : "btn btn-outline-info ms-1"
                  }
                  to={menu.uri}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/newProduct" element={<NewProduct />}></Route>
          <Route path="/editProduct/:id" element={<EditProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
