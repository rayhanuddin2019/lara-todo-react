import React, { useState } from 'react';
import axios from "./axiosConfig";
import {  useUser } from './UserContext';
const RegisterForm = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
  const { updateUser} = useUser();
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
      setSuccess("");
  
      try {
         await axios.post(`${window.Laravel.appUrl}/api/register`, formData).then((response) => {;
          setSuccess("Registration successful! Please log in.");
          setFormData({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
          });
         // response.data?.user ? updateUser(response.data.user) : null;
      
        })
       
      } catch (error) {
       
        if (error.response && error.response.data) {
          setErrors(error.response.data || {});
        } else {
          setErrors({ general: "Something went wrong. Please try again later." });
        }
        updateUser(null)
      }
    };
  
    return (
      <div className='registerform'>
      <form className="register-from" onSubmit={handleSubmit}>
        <h1>Register</h1>
  
        {/* Name Field */}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name[0]}</p>}
        </div>
  
        {/* Email Field */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email[0]}</p>}
        </div>
  
        {/* Password Field */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password[0]}</p>}
        </div>
  
        {/* Confirm Password Field */}
        <div>
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
          />
        </div>
  
        {/* General Error Message */}
        {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
        
        {/* Success Message */}
        {success && <p style={{ color: "green" }}>{success}</p>}
  
        <button type="submit">Register</button>
       
      </form>      
      </div>
    );
  };
export default RegisterForm;

