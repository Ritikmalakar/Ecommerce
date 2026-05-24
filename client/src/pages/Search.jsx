import React from 'react'
import {
  useLocation
} from 'react-router-dom'

export default function Search() {

  const location =
    useLocation()

  const product =
    location.state || []

  return (
    <div className='container'>

      <h3>
        Search Result
      </h3>

      <div className='row'>

        {
          product.map((p)=>(

            <div
              className='col-md-4'
              key={p._id}
            >
              <h5>
                {p.name}
              </h5>

              <p>
                {p.description}
              </p>
            </div>

          ))
        }

      </div>

    </div>
  )
}