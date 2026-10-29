import React, { useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../Axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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

    try {
      const { data } = await baseUrl.post("/register", formData);

      if (data?.success) {
        toast.success(data.message);

        setFormData({
          name: "",
          email: "",
          password: "",
        });

        navigate("/login");
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <form onSubmit={submitData}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={changeData}
        />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={changeData}
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={changeData}
        />
        <br />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
