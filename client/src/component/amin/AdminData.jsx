import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import Admin from './Admin'
import { toast } from 'react-toastify'
import { baseUrl2 } from '../../AxiosR'
import { Link } from 'react-router-dom'

export default function AdminData() {

  const [product, setProduct] = useState([])

  useEffect(() => {
    getAllData();
  }, [])

  const getAllData = async () => {
    try {
      const { data } = await baseUrl2.get("/getAll")

      if (data?.success) {
        setProduct(data?.product)
      } else {
        toast.error(data?.message)
      }

    } catch (error) {
      console.log(error)
      toast.error("Invalid data")
    }
  }

  return (
    <Layout>
      <div className='container-fluid py-4'>
        <div className='row'>

          {/* Sidebar */}
          <div className='col-md-3 mb-4'>
            <div className='card shadow border-0 rounded-4'>
              <div className='card-body'>
                <Admin />
              </div>
            </div>
          </div>

          {/* Product Content */}
          <div className='col-md-9'>
            <div className='card shadow border-0 rounded-4'>
              <div className='card-body'>

                <h2 className='mb-4 text-primary fw-bold'>
                  All Product List
                </h2>

                <div className='row'>

                  {product?.map((p) => (

                    <div
                      className='col-md-4 mb-4'
                      key={p._id}
                    >

                      <Link
                        to={`/updateAdmin/${p._id}`}
                        className='text-decoration-none text-dark'
                      >

                        <div
                          className='card h-100 shadow-sm border-0 rounded-4'
                          style={{
                            cursor: "pointer",
                            transition: "0.3s"
                          }}
                        >

                          <img
                            src={`${baseUrl2.defaults.baseURL}/product-photo/${p._id}`}
                            className='card-img-top rounded-top-4'
                            alt={p.name}
                            style={{
                              height: "220px",
                              objectFit: "cover"
                            }}
                          />

                          <div className='card-body'>

                            <h5 className='card-title fw-bold'>
                              {p.name}
                            </h5>

                            <p className='card-text text-muted'>
                              {p.description?.substring(0, 60)}...
                            </p>

                            <h6 className='text-success fw-bold'>
                              ₹ {p.price}
                            </h6>

                          </div>

                        </div>

                      </Link>

                    </div>

                  ))}

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}