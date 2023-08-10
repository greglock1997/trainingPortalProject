import React from 'react';
import { useState } from 'react';
import '../assets/styles/login.css'

export default function Register() {
  const [formData, setFormData] = useState({
    username: 'Jim ',
    password: 'Password'
  });

  const handleSubmit = async (error) => {
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify("Hello")
      })
    } catch (error) {
      console.log('Error submitting form', error)
    }
  }

  return (
    <div className="register-container">
      <div className="register-form-container">
      <h2>REGISTER</h2>
      <form className="register-form" onSubmit={handleSubmit}>
          <input type="text" value={formData.name} placeholder="Username"/>
          <input type="text" placeholder="Confirm Username"/>
          <input type="text" placeholder="Password"/>
          <input type="text" placeholder="Confirm Password"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}