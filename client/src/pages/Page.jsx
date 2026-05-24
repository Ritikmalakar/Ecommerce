import React from 'react'
import Layout from '../component/Layout'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <Layout>

      <div className="container-fluid bg-dark text-light d-flex flex-column justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >

        <h1 className="display-1 fw-bold text-warning">
          404
        </h1>

        <h2 className="fw-bold">
          Page Not Found
        </h2>

        <p className="text-secondary fs-5">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link to="/" className="btn btn-warning px-4 py-2 fw-bold mt-3">
          Go Back Home
        </Link>

      </div>

    </Layout>
  )
}