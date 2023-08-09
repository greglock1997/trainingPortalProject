import React from 'react'
import '../assets/styles/login.css'

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>LOGIN</h2>
        <form className="login-form" action="">
          <input type="text" placeholder="Username"/>
          <input type="text" placeholder="Password"/>
        </form>
      </div>
    </div>
  )
}