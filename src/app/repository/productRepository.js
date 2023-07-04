import axios from "axios";

export const productsApi = axios.create({
  baseURL: "http://localhost:9000",
});

export const getProducts = () => {
  return productsApi.get("/products");
};

export const getProductsFilterdAndPagined = (
  keyword = "",
  page = 1,
  size = 4
) => {
  return productsApi.get(
    `/products?name_like=${keyword}&_page=${page}&_limit=${size}`
  );
};

export const getProductsCheckedFiltered = (checked = true) => {
  return productsApi.get(`/products?checked=${checked}`);
};

export const deleteProduct = (product) => {
  return productsApi.delete(`/products/${product.id}`);
};

export const getProductById = (id) => {
  return productsApi.get(`/products/${id}`);
};

export const saveProduct = (product) => {
  return productsApi.post(`/products`, product);
};

export const checkProduct = (product) => {
  return productsApi.patch(`/products/${product.id}`, {
    checked: !product.checked,
  });
};

export const updateProduct = (product) => {
  return productsApi.put(`/products/${product.id}`, product);
};
