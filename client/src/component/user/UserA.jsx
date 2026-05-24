import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Layout from '../Layout'
import { baseUrl } from '../../AxiosR'

export default function UserA() {

  const user =
    JSON.parse(localStorage.getItem("user"));

  const [address, setAddress] =
    useState(user?.address || "");

  const updateAddress = async () => {
    try {

      const { data } =
        await baseUrl.post(
          "/update-address",
          {
            id: user._id,
            address
          },
          {
            headers: {
              Authorization:
                localStorage.getItem("token")
            }
          }
        );

      console.log(data);

      if (data.success) {

        let lsUser =
          JSON.parse(
            localStorage.getItem("user")
          );

        lsUser.address = address;

        localStorage.setItem(
          "user",
          JSON.stringify(lsUser)
        );

        alert("Address Updated");
      }

    } catch (error) {
      console.log(error.response);
      alert("Update Failed");
    }
  };

  return (
    <Layout>

      <div className='card shadow-sm border-0'>
        <div className='card-body'>

          <h4 className='text-center text-primary'>
            User Panel
          </h4>

          <h5 className='text-center'>
            Welcome, {user?.name}
          </h5>

          <div className='mb-3'>
            <label>Address</label>

            <textarea
              className='form-control'
              rows="3"
              value={address}
              onChange={(e)=>
                setAddress(e.target.value)
              }
            />

            <button
              className='btn btn-primary mt-3'
              onClick={updateAddress}
            >
              Update Address
            </button>
          </div>

          <NavLink
            to="/user/order"
            className='list-group-item'
          >
            Orders
          </NavLink>

        </div>
      </div>

    </Layout>
  )
}