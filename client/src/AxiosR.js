import axios from 'axios';

export const baseUrl = axios.create({
  baseURL: `${import.meta.env.VITE_API_KEY}/user`,
  withCredentials: true
});

export const baseUrl1 = axios.create({
  baseURL: `${import.meta.env.VITE_API_KEY}/category`,
  withCredentials: true
});

export const baseUrl2 = axios.create({
  baseURL: `${import.meta.env.VITE_API_KEY}/product`,
  withCredentials: true
});

export const baseUrl3=axios.create({
  baseURL:`${import.meta.env.VITE_API_KEY}/stripe`,
  withCredentials:true
})