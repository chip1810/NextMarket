import axios from "axios";
import { Product } from "../components/types";

const API_URL = "http://localhost:3000/products";

export const getProducts = async () => {
  const res = await axios.get<Product[]>(API_URL);
  return res.data;
};
