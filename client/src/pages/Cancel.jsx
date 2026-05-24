import React from 'react'
import Layout from '../component/Layout'

export default function Cancel() {

  return (
<Layout>
    <div
      className='container text-center mt-5'
    >

      <h1
        className='text-danger'
      >
        ❌ Payment Failed / Cancelled
      </h1>

      <p>
        Try again
      </p>

    </div>
    </Layout>
  )
}