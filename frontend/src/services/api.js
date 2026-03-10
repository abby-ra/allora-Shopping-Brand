import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async (category = null) => {
  try {
    const url = category && category !== 'all' 
      ? `/products?category=${category}` 
      : '/products';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const getSimilarProducts = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}/similar`);
    return response.data;
  } catch (error) {
    console.error('Error fetching similar products:', error);
    return [];
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await api.get(`/products/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

export default api;
