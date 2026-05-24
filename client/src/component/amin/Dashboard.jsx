import React from 'react'
import Layout from '../Layout'
import Admin from './Admin'

export default function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <Layout>

      <div className='container-fluid py-4 bg-light min-vh-100'>

        <div className='row g-4'>

          {/* Sidebar */}
          <div className='col-lg-3 col-md-4'>

            <div className='card shadow-lg border-0 rounded-4'>

              <div className='card-body p-4'>

                <Admin />

              </div>

            </div>

          </div>

          {/* Main Dashboard */}
          <div className='col-lg-9 col-md-8'>

            <div className='card shadow-lg border-0 rounded-4'>

              <div className='card-body p-5'>

                <h1 className='fw-bold text-primary mb-2'>
                  Welcome Admin 👋
                </h1>

                <h4 className='text-dark mb-3'>
                  {user?.name}
                </h4>

                <p className='text-muted fs-5'>
                  Manage products, categories and users
                  easily from your admin dashboard.
                </p>

                <hr className='my-4' />

                <div className='row g-4'>

                  {/* Product Card */}
                  <div className='col-md-4'>

                    <div className='card bg-primary text-white shadow border-0 rounded-4 h-100'>

                      <div className='card-body text-center p-4'>

                        <h1>📦</h1>

                        <h4 className='mt-3'>
                          Products
                        </h4>

                        <p>
                          Manage all products
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Category Card */}
                  <div className='col-md-4'>

                    <div className='card bg-success text-white shadow border-0 rounded-4 h-100'>

                      <div className='card-body text-center p-4'>

                        <h1>🗂️</h1>

                        <h4 className='mt-3'>
                          Categories
                        </h4>

                        <p>
                          Manage categories
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Users Card */}
                  <div className='col-md-4'>

                    <div className='card bg-dark text-white shadow border-0 rounded-4 h-100'>

                      <div className='card-body text-center p-4'>

                        <h1>👥</h1>

                        <h4 className='mt-3'>
                          Users
                        </h4>

                        <p>
                          Manage all users
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </Layout>

  )
}