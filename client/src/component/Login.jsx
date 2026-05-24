import React, { useState } from 'react'
import Layout from './Layout'
import { baseUrl } from '../AxiosR';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export default function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const chageData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.value
    })
  }

  const submitData =
    async (e) => {

      e.preventDefault();

      try {

        const { data } =
          await baseUrl.post(
            "/login",
            formData
          );

        if (data?.success) {

          // IMPORTANT
          localStorage.setItem(
            "token",
            data.token
          );

          localStorage.setItem(
            "login",
            true
          );

          localStorage.setItem(
            "role",
            data.user.role
          );

          localStorage.setItem(
            "user",
            JSON.stringify(
              data.user
            )
          );

          toast.success(
            data?.message
          );

          // Redirect Logic
          const redirect =
            localStorage.getItem(
              "redirectAfterLogin"
            );

          if (
            redirect ===
            "cart-payment"
          ) {

            localStorage.removeItem(
              "redirectAfterLogin"
            );

            navigate(
              "/cart"
            );

          } else {

            navigate(
              "/"
            );
          }

        } else {

          toast.error(
            data?.message
          );
        }

      } catch (err) {

        console.log(err);

        toast.error(
          "Something went wrong"
        );

      }

    }

  return (
    <Layout>

      <div
        className='d-flex justify-content-center align-items-center'
        style={{
          minHeight:
            "80vh"
        }}
      >

        <div
          className='card shadow border-0 p-4 rounded-4'
          style={{
            width: "100%",
            maxWidth: "420px"
          }}
        >

          <h2 className='text-center text-primary fw-bold mb-4'>
            Login
          </h2>

          <form onSubmit={submitData}>

            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              value={formData.email}
              onChange={chageData}
              className='form-control mb-3'
            />

            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              value={formData.password}
              onChange={chageData}
              className='form-control mb-3'
            />

            <button
              type='submit'
              className='btn btn-primary w-100 fw-bold mb-3'
            >
              Login
            </button>

            <div className='text-center'>

              <Link
                to={"/forget"}
                className='text-decoration-none'
              >
                Forget Password?
              </Link>

            </div>

          </form>

        </div>

      </div>

    </Layout>
  )
}