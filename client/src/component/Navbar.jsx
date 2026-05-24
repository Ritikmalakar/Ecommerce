import React, {
  useEffect,
  useState
} from 'react'

import {
  Link
} from 'react-router-dom'

import {
  baseUrl2
} from '../AxiosR'

import '../style/nav.css'

export default function Navbar() {

  const [login,
    setLogin] =
    useState(false)

  const [admin,
    setAdmin] =
    useState(false)

  const [user,
    setUser] =
    useState(false)

  const [keyword,
    setKeyword] =
    useState("")

  const [cartCount,
    setCartCount] =
    useState(0)

  // Navbar Load
  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      )

    const role =
      localStorage.getItem(
        "role"
      )

    // Cart Always Load
    const cart =
      JSON.parse(
        localStorage.getItem(
          "cart"
        )
      ) || []

    setCartCount(
      cart.length
    )

    if (token) {

      setLogin(true)

      setAdmin(
        role === "admin"
      )

      setUser(
        role === "user"
      )

    } else {

      setLogin(false)
      setAdmin(false)
      setUser(false)
    }

  }, [])

  // Logout
  const logoutButton =
    () => {

      // Cart save
      const cart =
        localStorage.getItem(
          "cart"
        )

      // Clear login data
      localStorage.clear()
      sessionStorage.clear()

      // Cart restore
      if (cart) {

        localStorage.setItem(
          "cart",
          cart
        )
      }

      window.location.href =
        "/login"
    }

  // Search
  const handleSearch =
    async (e) => {

      e.preventDefault()

      try {

        const { data } =
          await baseUrl2.get(
            `/search/${keyword}`
          )

        if (
          data?.success
        ) {

          localStorage.setItem(
            "search",
            JSON.stringify(
              data.product
            )
          )

          window.location.href =
            "/"
        }

      } catch (error) {

        console.log(
          error
        )
      }
    }

  return (

    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        🛒 QuickMart
      </div>

      {/* Search */}
      <form
        className='d-flex align-items-center'
        onSubmit={
          handleSearch
        }
      >

        <input
          type='text'
          className='form-control rounded-pill'
          placeholder='Search Product'
          value={keyword}
          onChange={(e)=>
            setKeyword(
              e.target.value
            )
          }
        />

        <button
          className='btn btn-warning ms-2 rounded-pill px-3'
        >
          Search
        </button>

      </form>

      {/* Nav */}
      <ul className="nav-links">

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        {/* Cart Always Show */}
        <li>
          <Link to="/cart">
            🛒 Cart

            {
              cartCount > 0 && (

                <span
                  className='badge bg-danger ms-1'
                >
                  {cartCount}
                </span>

              )
            }
          </Link>
        </li>

        {
          login ? (
            <>

              {
                user && (
                  <li>
                    <Link to="/userDashboard">
                      User Dashboard
                    </Link>
                  </li>
                )
              }

              {
                admin && (
                  <li>
                    <Link to="/dashboard">
                      Admin Dashboard
                    </Link>
                  </li>
                )
              }

              <li>
                <button
                  className='btn btn-danger rounded-pill px-3'
                  onClick={
                    logoutButton
                  }
                >
                  Logout
                </button>
              </li>

            </>
          ) : (
            <>

              <li>
                <Link
                  className='btn btn-outline-light rounded-pill px-3'
                  to="/register"
                >
                  Register
                </Link>
              </li>

              <li>
                <Link
                  className='btn btn-success rounded-pill px-3'
                  to="/login"
                >
                  Login
                </Link>
              </li>

            </>
          )
        }

      </ul>

    </nav>
  )
}