import React from 'react'
import { Navigate } from 'react-router-dom'

export default function AdminPro({ children }) {

  // localStorage se role lo
  const role = localStorage.getItem("role");

  // agar admin nahi hai to login page
  if (role !== "admin") {
    return <Navigate to="/login" />
  }

  // admin hai to page show
  return children;
}