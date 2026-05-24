import React, {
  useEffect,
  useState
} from 'react'

import Layout from '../component/Layout'
import Price from '../component/amin/Price'

import {
  baseUrl1,
  baseUrl2
} from '../AxiosR'

import {
  toast
} from 'react-toastify'

import {
  useNavigate
} from 'react-router-dom'

export default function Home() {

  const navigate = useNavigate()

  const [cart, setCart] = useState([])
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [showFilter, setShowFilter] = useState(false)

  // Cart Load
  useEffect(() => {
    const data =
      JSON.parse(
        localStorage.getItem("cart")
      ) || []

    setCart(data)
  }, [])

  // Categories
  const getAllCategories = async () => {
    try {

      const { data } =
        await baseUrl1.get("/getAll")

      if (data?.success) {
        setCategory(data.category)
      }

    } catch (error) {
      console.log(error)
    }
  }

  // Products
  const getAllProduct = async () => {

    try {

      const { data } =
        await baseUrl2.get("/getAll")

      if (data?.success) {
        setProduct(data.product)
      }

    } catch (error) {

      console.log(error)
      toast.error("Product Error")
    }
  }

  // Search
  const getSearchProduct = () => {

    const result =
      localStorage.getItem("search")

    if (result) {

      setProduct(
        JSON.parse(result)
      )

      localStorage.removeItem("search")
      return true
    }

    return false
  }

  // Category Filter
  const handleFilter =
    (value, id) => {

      let all = [...checked]

      if (value) {
        all.push(id)
      } else {
        all =
          all.filter(
            (c) => c !== id
          )
      }

      setChecked(all)
    }

  // Filter API
  const filterProduct = async () => {

    try {

      const { data } =
        await baseUrl2.post(
          "/filter",
          {
            checked,
            radio
          }
        )

      if (data?.success) {
        setProduct(data.product)
      }

    } catch (error) {
      console.log(error)
    }
  }

  // First Load
  useEffect(() => {

    getAllCategories()

    const searched =
      getSearchProduct()

    if (!searched) {
      getAllProduct()
    }

  }, [])

  // Filter Effect
  useEffect(() => {

    if (
      checked.length ||
      radio.length
    ) {
      filterProduct()
    }

  }, [checked, radio])

  return (

    <Layout>

      <div className='container-fluid'>

        {/* Filter Button */}
        <div className='mb-3'>

          <button
            className='btn btn-dark'
            onClick={() =>
              setShowFilter(true)
            }
          >
            ☰ Filter
          </button>

        </div>

        <div className='row'>

          {/* Sidebar */}
          {showFilter && (

            <>
              {/* Overlay */}
              <div
                onClick={() =>
                  setShowFilter(false)
                }
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "rgba(0,0,0,0.4)",
                  zIndex: 999
                }}
              />

              {/* Drawer */}
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "320px",
                  height: "100vh",
                  background: "#fff",
                  zIndex: 1000,
                  padding: "20px",
                  overflowY: "auto",
                  boxShadow:
                    "0 0 20px rgba(0,0,0,0.3)"
                }}
              >

                <div className='d-flex justify-content-between'>

                  <h4>Filters</h4>

                  <button
                    className='btn btn-danger btn-sm'
                    onClick={() =>
                      setShowFilter(false)
                    }
                  >
                    ✕
                  </button>

                </div>

                <hr />

                {/* Category */}
                <h5>Category</h5>

                {category?.map((c) => (

                  <div
                    key={c._id}
                    className='form-check mb-2'
                  >

                    <input
                      type='checkbox'
                      className='form-check-input'
                      onChange={(e) =>
                        handleFilter(
                          e.target.checked,
                          c._id
                        )
                      }
                    />

                    <label className='ms-2'>
                      {c.name}
                    </label>

                  </div>

                ))}

                <hr />

                {/* Price */}
                <Price
                  radio={radio}
                  setRadio={setRadio}
                />

                {/* Reset */}
                <button
                  className='btn btn-danger w-100 mt-3'
                  onClick={() => {

                    localStorage.removeItem(
                      "search"
                    )

                    setChecked([])
                    setRadio([])

                    getAllProduct()

                  }}
                >
                  Reset
                </button>

              </div>
            </>
          )}

          {/* Products */}
          <div className='col-md-12'>

            <h2 className='text-center mb-4'>
              Products
            </h2>

            <div className='row'>

              {product?.map((p) => (

                <div
                  className='col-md-4 mb-4'
                  key={p._id}
                >

                  <div
                    className='card shadow h-100 border-0'
                    style={{
                      borderRadius: "15px",
                      overflow: "hidden"
                    }}
                  >

                    {/* IMAGE FIXED */}
                    <div
                      style={{
                        height: "260px",
                        background: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "15px"
                      }}
                    >

                      <img
                        src={`${baseUrl2.defaults.baseURL}/product-photo/${p._id}`}
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain"
                        }}
                      />

                    </div>

                    <div className='card-body'>

                      <h5 className='fw-bold'>
                        {p.name}
                      </h5>

                      <p className='text-muted'>
                        {p.description.substring(0, 50)}...
                      </p>

                      <h6 className='text-success fw-bold'>
                        ₹ {p.price}
                      </h6>

                      <div className='d-flex justify-content-between mt-3'>

                        {/* Details */}
                        <button
                          className='btn btn-primary'
                          onClick={() =>
                            navigate(
                              `/details/${p._id}`
                            )
                          }
                        >
                          Details
                        </button>

                        {/* Cart */}
                        <button
                          className='btn btn-warning'
                          onClick={() => {

                            const token =
                              localStorage.getItem(
                                "login"
                              )

                            if (!token) {

                              toast.error(
                                "Please Login First"
                              )

                              navigate("/login")
                              return
                            }

                            let myCart =
                              JSON.parse(
                                localStorage.getItem(
                                  "cart"
                                )
                              ) || []

                            const already =
                              myCart.find(
                                (item) =>
                                  item._id === p._id
                              )

                            if (already) {

                              toast.warning(
                                "Already In Cart"
                              )

                              return
                            }

                            myCart.push(p)

                            localStorage.setItem(
                              "cart",
                              JSON.stringify(myCart)
                            )

                            setCart(myCart)

                            toast.success(
                              "Added To Cart"
                            )
                          }}
                        >
                          Add To Cart
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </Layout>
  )
}