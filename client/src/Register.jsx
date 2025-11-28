import React, { useState} from 'react'
import axios from 'axios'

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    gender:"",
    email: "",
    password: "",
    conformPassword: "",
    mobileNumber: "",
    address: ""
  })
  function handleChange(e) {
    setFormData((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value
      }))
  }
  function handleSubmit(e) {
    e.preventDefault()
    console.log(formData)
   if (formData.password===formData.conformPassword){  //
     axios.post(`${import.meta.env.VITE_API_URL}/api/register`, formData)//e api ki formdata ni parameter ga pass chesam
       .then((res) => {
        if (res.status === 200) {
          alert("successfully enter")
        }
        console.log(res.data)
      })
      
       .catch((err) => {
            console.log("while inserting the data", err)
          if(err.status===409){
          alert("already exists user")
        }
          })
   }
  }
  return (
    <div className='mt-3 d-flex justify-content-center align-items-center'>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} placeholder='enter your name' onChange={handleChange} />
        <br />
        <input 
         type="radio" 
         name='gender' 
         value='male'
         onChange={handleChange}
         checked={formData.gender=='male'} />male
        <input 
         type="radio" 
         name='gender' 
         value='female'
         onChange={handleChange}
         checked={formData.gender=='female'} 
         />female
        <br />
        <input type="email" name="email" value={formData.email} placeholder='email@gmail.com' onChange={handleChange} />
        <br />
        <input type="password" name='password' value={formData.password} placeholder='enter your password' onChange={handleChange} />
        <br />
        <input type="password" name='conformPassword' value={formData.conformPassword} placeholder='conform password' onChange={handleChange} />
        <br />
        <input type="number" name='mobileNumber' placeholder='enter your mobile number' onChange={handleChange} />
        <br />
        <input type="text" name='address' placeholder='enter your address' onChange={handleChange} />
        <br />
        <button>Submit</button>
      </form>
    </div>
  )
}