import React, { useState } from 'react'
import Layout from './Layout'
import { toast } from 'react-toastify';
import { baseUrl } from '../AxiosR';
import { useParams, useNavigate } from 'react-router-dom';

export default function Verify() {

  const [formData, setFormData] = useState({
    otp: ""
  });

  const { email } = useParams();

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
        `/verify/${email}`,
        formData
      );

      if (data?.success) {

        toast.success(data?.message);

        navigate(`/change-password/${email}`);

      } else {

        toast.error(data?.message);

      }

    } catch (err) {

      console.log(err.response?.data);

      toast.error(
        err.response?.data?.message || "Something went wrong"
      );

    }

  };

  return (

    <Layout>

      <div>

        <form onSubmit={submitData}>

          <input
            type='text'
            placeholder='Enter your OTP'
            name='otp'
            value={formData.otp}
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