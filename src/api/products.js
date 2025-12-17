import axios from "axios";

const BASE = "https://dummyjson.com";

export const fetchProducts = async () => {
  const res = await axios.get(`${BASE}/products`);
  return res.data; // contains products array and total etc.
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${BASE}/products/${id}`);
  return res.data;
};
