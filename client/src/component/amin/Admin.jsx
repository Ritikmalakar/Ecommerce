import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Admin() {
  return (
    <div>

      <h3 className='text-center mb-4 text-primary'>
        🛒 Admin Panel
      </h3>

      <div className='d-grid gap-3'>

        <NavLink
          to="/admin/cate"
          className='btn btn-outline-primary btn-lg text-decoration-none'
        >
          ➕ Create Category
        </NavLink>

        <NavLink
          to="/admin/createPro"
          className='btn btn-outline-success btn-lg text-decoration-none'
        >
          📦 Create Product
        </NavLink>

        <NavLink
          to="/adminPro"
          className='btn btn-outline-dark btn-lg text-decoration-none'
        >
          🛍️ Products
        </NavLink>

        <NavLink
          to="/admin/users"
          className='btn btn-outline-dark btn-lg text-decoration-none'
        >
          👥 Users
        </NavLink>

      </div>

    </div>
  )
}