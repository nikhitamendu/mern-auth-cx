import React, { useState,useContext } from 'react'  //storing input values //context ni taruvatha authcontext kosam update chesam
import axios from 'axios'  //send api request to backend
import { AuthContext } from './context/AuthContext'

export default function Login() {
  
  const {loginUser}=useContext(AuthContext)//added related to Authcontext //destructuring
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  
    function handleChange(e) {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
      }))
    }
    function handleSubmit(e) {
      e.preventDefault()
      console.log(formData)
      axios.post(`${import.meta.env.VITE_API_URL}/api/login`, formData,
        {withCredentials:true}   )  //sends the email and password to backend
        .then((res) => {
          console.log(res.data.message)
          alert(res.data.message)
          //stores the token in frontend
          // localStorage.setItem("token", res.data.token)    //backen nundi auth.js lo nundi vachina token
          loginUser(res.data) //added related to authcontext
        })
        .catch((err) => {
          console.log("not a user", err)
          alert(err.response.data.message)
        })

    }
    return (
      <div>
        <form action="" onSubmit={handleSubmit}>
          <input type="email" name="email" value={formData.email} placeholder=' enter email' onChange={handleChange} />
          <input type="password" name='password' value={formData.password} placeholder='enter your password' onChange={handleChange} />
          <button>Submit</button>
        </form>
      </div>
    )
  }