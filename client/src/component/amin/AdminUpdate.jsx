import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import Admin from './Admin'
import { baseUrl1, baseUrl2 } from '../../AxiosR'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateAdmin() {

  const [categories, setCategories] = useState([])
  const [photo, setPhoto] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    shipping: '',
  })

  useEffect(() => {
    if (params?.id) {
      getSingleProduct()
    }
    getAllCategory()
  }, [params?.id])

  // Single Product
  const getSingleProduct = async () => {
    try {

      const { data } = await baseUrl2.get(
        `/single/${params.id}`
      )

      if (data?.success) {
        setFormData({
          name: data.product.name,
          description: data.product.description,
          price: data.product.price,
          quantity: data.product.quantity,
          shipping: data.product.shipping,
          category: data.product.category?._id
        })
      }

    } catch (error) {
      console.log(error)
      toast.error("Single Product Error")
    }
  }

  // Categories
  const getAllCategory = async () => {
    try {

      const { data } = await baseUrl1.get("/getAll")

      if (data?.success) {
        setCategories(data.category)
      }

    } catch (error) {
      console.log(error)
      toast.error("Category Fetch Error")
    }
  }

  // Handle Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Delete Product
 const deleteData = async () => {
  try {

    const { data } = await baseUrl2.post(
      `/delete/${params.id}`
    )

    if (data?.success) {
      toast.success(data.message)
      navigate("/adminPro")
    }

  } catch (error) {
    console.log(error)
    toast.error("Delete Failed")
  }
}

  // Update Product
  const submitData = async (e) => {

    e.preventDefault()

    try {

      const productData = new FormData()

      productData.append("name", formData.name)
      productData.append("description", formData.description)
      productData.append("price", formData.price)
      productData.append("category", formData.category)
      productData.append("quantity", formData.quantity)
      productData.append("shipping", formData.shipping)

      if (photo) {
        productData.append("photo", photo)
      }

      const { data } = await baseUrl2.post(
        `/update/${params.id}`,
        productData
      )

      if (data?.success) {

        toast.success("Product Updated Successfully")

        navigate("/adminPro")

      } else {
        toast.error(data.message)
      }

    } catch (error) {

      console.log(error)
      toast.error("Update Failed")
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

          {/* Content */}
          <div className='col-md-9'>
            <div className='card shadow border-0 rounded-4'>
              <div className='card-body p-4'>

                <h1 className='fw-bold text-primary mb-4'>
                  Update Product
                </h1>

                <form onSubmit={submitData}>

                  {/* Category */}
                  <select
                    className='form-select mb-3'
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Category
                    </option>

                    {categories?.map((c) => (
                      <option
                        key={c._id}
                        value={c._id}
                      >
                        {c.name}
                      </option>
                    ))}
                  </select>

                  {/* Photo */}
                  <label className='btn btn-outline-primary w-100 mb-3'>

                    {photo ? photo.name : "Upload Photo"}

                    <input
                      type='file'
                      hidden
                      accept='image/*'
                      onChange={(e) =>
                        setPhoto(e.target.files[0])
                      }
                    />
                  </label>

                  {/* Photo Preview */}
                  <div className='mb-3 text-center'>

                    <img
                      src={
                        photo
                          ? URL.createObjectURL(photo)
                          : `${baseUrl2.defaults.baseURL}/product-photo/${params.id}?${Date.now()}`
                      }
                      alt='preview'
                      className='img-fluid rounded shadow'
                      style={{
                        maxHeight: "250px"
                      }}
                    />

                  </div>

                  {/* Name */}
                  <input
                    type='text'
                    name='name'
                    placeholder='Product Name'
                    className='form-control mb-3'
                    value={formData.name}
                    onChange={handleChange}
                  />

                  {/* Description */}
                  <textarea
                    name='description'
                    placeholder='Description'
                    className='form-control mb-3'
                    value={formData.description}
                    onChange={handleChange}
                  />

                  {/* Price */}
                  <input
                    type='number'
                    name='price'
                    placeholder='Price'
                    className='form-control mb-3'
                    value={formData.price}
                    onChange={handleChange}
                  />

                  {/* Quantity */}
                  <input
                    type='number'
                    name='quantity'
                    placeholder='Quantity'
                    className='form-control mb-3'
                    value={formData.quantity}
                    onChange={handleChange}
                  />

                  {/* Shipping */}
                  <select
                    className='form-select mb-3'
                    name='shipping'
                    value={formData.shipping}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Shipping
                    </option>

                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>

                  {/* Buttons */}
                  <button
                    type='submit'
                    className='btn btn-primary w-100 mb-2'
                  >
                    Update Product
                  </button>

                  <button
                    type='button'
                    className='btn btn-danger w-100'
                    onClick={deleteData}
                  >
                    Delete Product
                  </button>

                </form>

              </div>
            </div>
          </div>

        </div>

      </div>

    </Layout>
  )
}