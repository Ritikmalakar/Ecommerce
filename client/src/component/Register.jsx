import React, { useState } from "react";
import Layout from "./Layout";
import { baseUrl } from "../AxiosR";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const navigate = useNavigate();

  const changeData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (!formData.name) return toast.error("Name is required");
    if (!formData.email) return toast.error("Email is required");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (!formData.address) return toast.error("Address is required");
    if (!formData.phone) return toast.error("Phone number is required");

    try {
      const { data } = await baseUrl.post("/register", formData);

      if (data?.success) {
        toast.success(data?.message);
        setFormData({ name: "", email: "", password: "", address: "", phone: "" });
        navigate("/login");
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
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
          <h3 className="text-center mb-4 text-primary">Register</h3>
          <form onSubmit={submitData}>

            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={changeData}
              className="form-control mb-3"
            />

            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={changeData}
              className="form-control mb-3"
            />

            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={changeData}
              className="form-control mb-3"
            />

            <input
              type="text"
              placeholder="Enter your address"
              name="address"
              value={formData.address}
              onChange={changeData}
              className="form-control mb-3"
            />

            <input
              type="text"
              placeholder="Enter your phone"
              name="phone"
              value={formData.phone}
              onChange={changeData}
              className="form-control mb-3"
            />

            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold"
              style={{ letterSpacing: "0.5px" }}
            >
              Submit
            </button>

          </form>
        </div>
      </div>
    </Layout>
  );
}