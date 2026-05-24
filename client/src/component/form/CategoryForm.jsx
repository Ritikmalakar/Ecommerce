import React from 'react';

export default function CategoryForm({ submitData, value, setValue }) {

  return (

    <div className='mb-4'>

      <form onSubmit={submitData}>

        <div className='input-group'>

          <input
            type='text'
            className='form-control'
            placeholder='Enter New Category'
            name='category'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button className='btn btn-primary' type='submit'>
            Submit
          </button>

        </div>

      </form>

    </div>
  );
}