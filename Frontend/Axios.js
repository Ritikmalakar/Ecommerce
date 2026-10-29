import axios from 'axios'

export const baseUrl=axios.create({
  baseURL:"http://localhost:1111/user",
  withCredentials:true
})

export const baseUrl2=axios.create({
  baseURL:"http://localhost:1111/product",
  withCredentials:true
})

export const baseUrl3=axios.create({
  baseURL:"http://localhost:1111/order",
  withCredentials:true
})

export const baseUrl4=axios.create({
  baseURL:"http://localhost:1111/payment",
  withCredentials:true
}) 

export const baseUrl5=axios.create({
  baseURL:"http://localhost:1111/analytic"
})