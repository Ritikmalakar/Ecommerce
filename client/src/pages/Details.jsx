import React, {
  useEffect,
  useState
} from 'react'

import Layout from '../component/Layout'

import {
  baseUrl2
} from '../AxiosR'

import {
  useParams
} from 'react-router-dom'

import {
  toast
} from 'react-toastify'

export default function Details() {

  const params =
    useParams()

  const [product,
    setProduct] =
    useState({})

  // Get Product
  const getProduct =
    async () => {

      try {

        const { data } =
          await baseUrl2.get(
            `/single/${params.id}`
          )

        console.log(data)

        if (
          data?.success
        ) {

          setProduct(
            data.product
          )
        }

      } catch (error) {

        console.log(error)

        toast.error(
          "Product Error"
        )
      }
    }

  // Load
  useEffect(() => {

    if (
      params?.id
    ) {
      getProduct()
    }

  }, [
    params?.id
  ])

  return (

    <Layout>

      <div className='container mt-5'>

        <div className='row'>

          {/* Left Image */}
          <div className='col-md-5'>

            <img
              src={`${baseUrl2.defaults.baseURL}/product-photo/${product?._id}`}
              alt={product?.name}
              className='img-fluid rounded shadow'
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover"
              }}
            />

          </div>

          {/* Right Details */}
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
              {
                product?.category?.name
              }
            </h5>

            <h5 className='mt-2'>
              Quantity :
              {" "}
              {
                product?.quantity
              }
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
              Desciption :
              {" "}
              {
                product?.description
              }
            </h5>

            <button
              className='btn btn-warning mt-4'
            >
              Add To Cart
            </button>

          </div>

        </div>

      </div>

    </Layout>
  )
}