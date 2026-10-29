import React, { useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../Axios";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submitData = async (e) => {
    e.preventDefault();

    try {
      const { data } = await baseUrl.post("/login", formData);

      if (data?.success) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <form onSubmit={submitData}>
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

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
