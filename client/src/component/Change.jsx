import React, { useState } from 'react'
import Layout from './Layout'
import { toast } from 'react-toastify'
import { baseUrl } from '../AxiosR'
import { useNavigate, useParams } from 'react-router-dom'

export default function Change() {

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const { email } = useParams();

  const changeData = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  };

  const submitData = async (e) => {

    e.preventDefault();

    // validation
    if (!formData.password || !formData.confirmPassword) {

      toast.error("All fields are required");

      return;

    }

    // password match check
    if (formData.password !== formData.confirmPassword) {

      toast.error("Password and Confirm Password do not match");

      return;

    }

    try {

      const { data } = await baseUrl.post(
        `/changePass/${email}`,
        {
          newPass: formData.password,
          confirmPass: formData.confirmPassword
        }
      );

      if (data?.success) {

        toast.success(data?.message);

        navigate("/login");

      } else {

        toast.error(data?.message);

      }

    } catch (err) {

      console.log(err);

      toast.error(
        err.response?.data?.message || "Something went wrong"
      );

    }

  };

  return (

    <Layout>

      <div className='container mt-5'>

        <div className='row justify-content-center'>

          <div className='col-md-4'>

            <form onSubmit={submitData}>

              <div className='card p-4 shadow'>

                <h3 className='mb-4 text-center'>
                  Change Password
                </h3>

                <input
                  type='password'
                  placeholder='Enter New Password'
                  name='password'
                  value={formData.password}
                  onChange={changeData}
                  className='form-control mb-3'
                />

                <input
                  type='password'
                  placeholder='Confirm Password'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={changeData}
                  className='form-control mb-3'
                />

                <button
                  type='submit'
                  className='btn btn-primary w-100'
                >
                  Change Password
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </Layout>

  )
}