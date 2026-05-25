import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { baseUrl2 } from '../AxiosR'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Details() {

  const params = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState({})
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  )

  // Get Single Product
  const getProduct = async () => {
    try {

      const { data } =
        await baseUrl2.get(
          `/single/${params.id}`
        )

      if (data?.success) {
        setProduct(data.product)
      }

    } catch (error) {
      console.log(error)
      toast.error("Product Error")
    }
  }

  // Load Product
  useEffect(() => {
    if (params?.id) {
      getProduct()
    }
  }, [params?.id])

  // Add To Cart Function
  const addToCart = () => {

    const token =
      localStorage.getItem("login")

    if (!token) {
      toast.error(
        "Please Login First"
      )
      navigate("/login")
      return
    }

    let myCart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || []

    const already =
      myCart.find(
        (item) =>
          item._id === product._id
      )

    if (already) {
      toast.warning(
        "Already In Cart"
      )
      return
    }

    myCart.push(product)

    localStorage.setItem(
      "cart",
      JSON.stringify(myCart)
    )

    setCart(myCart)

    toast.success(
      "Added To Cart"
    )
  }

  return (

    <Layout>

      <div className='container mt-5'>

        <div className='row align-items-center'>

          {/* Product Image */}
          <div className='col-md-5 text-center mb-4'>

            <img
              src={`${baseUrl2.defaults.baseURL}/product-photo/${product?._id}`}
              alt={product?.name}
              className='img-fluid rounded shadow'
              style={{
                width: "100%",
                height: "450px",
                objectFit: "contain",
                background: "#fff",
                padding: "10px",
                border: "1px solid #ddd"
              }}
            />

          </div>

          {/* Product Details */}
          <div className='col-md-7'>

            <h2 className='mb-3'>
              {product?.name}
            </h2>

            <h4 className='text-success mb-3'>
              ₹ {product?.price}
            </h4>

            <h5>
              Category :
              {" "}
              {product?.category?.name}
            </h5>

            <h5 className='mt-2'>
              Quantity :
              {" "}
              {product?.quantity}
            </h5>

            <h5 className='mt-2'>
              Shipping :
              {" "}
              {
                product?.shipping
                  ? "Yes"
                  : "No"
              }
            </h5>

            <h5 className='mt-2'>
              Description :
              {" "}
              {product?.description}
            </h5>

            {/* Add To Cart Button */}
            <button
              className='btn btn-warning mt-4 px-4'
              onClick={addToCart}
            >
              Add To Cart
            </button>

          </div>

        </div>

      </div>

    </Layout>
  )
}