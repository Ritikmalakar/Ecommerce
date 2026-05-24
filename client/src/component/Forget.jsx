import React, { useState } from 'react'
import Layout from './Layout'
import { baseUrl } from '../AxiosR';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Forget() {

  const [formData, setFormData] = useState({
    email: ""
  });

  const navigate = useNavigate();

  const chageData = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  };

  const submitData = async (e) => {

    e.preventDefault();

    try {

      const { data } = await baseUrl.post(
        "/forget",
        formData
      );

      if (data?.success) {

        toast.success(data?.message);

        navigate(`/verify/${formData.email}`);

      } else {

        toast.error(data?.message);

      }

    } catch (err) {

      console.log(err);

      toast.error("Something went wrong");

    }

  };

  return (

    <Layout>

      <div>

        <form onSubmit={submitData}>

          <input
            type='email'
            placeholder='Enter your email'
            name='email'
            value={formData.email}
            onChange={chageData}
          />

          <br />
          <br />

          <button type='submit'>
            Submit
          </button>

        </form>

      </div>

    </Layout>

  )
}