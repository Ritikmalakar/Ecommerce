import React from 'react'

const prices = [
  {
    _id: 0,
    name: "₹0 - ₹999",
    value: [0, 999]
  },
  {
    _id: 1,
    name: "₹1000 - ₹4999",
    value: [1000, 4999]
  },
  {
    _id: 2,
    name: "₹5000 - ₹9999",
    value: [5000, 9999]
  },
  {
    _id: 3,
    name: "₹10000 - ₹19999",
    value: [10000, 19999]
  },
  {
    _id: 4,
    name: "₹20000+",
    value: [20000, 999999]
  }
]

export default function Price({
  radio,
  setRadio
}) {
  return (
    <div>
      <h4>Filter By Price</h4>

      {
        prices.map((p) => (
          <div
            className='form-check mb-2'
            key={p._id}
          >
            <input
              className='form-check-input'
              type='radio'
              name='price'
              onChange={() =>
                setRadio(p.value)
              }
            />

            <label className='form-check-label ms-2'>
              {p.name}
            </label>
          </div>
        ))
      }
    </div>
  )
}