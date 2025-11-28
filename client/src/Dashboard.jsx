import React, {useState,useEffect} from 'react'
import API from './api/apiCheck'
export default function Dashboard() {
  const[customer,setCustomer]=useState(null)
  useEffect(()=>{
    API.get("/dashboard")    
    .then((res)=>{
      console.log(res)
      setCustomer(res.data)   //dashboard ki display cheyadaniki
    })
  },[])
  return (
    <div>
      <h2>Dashboard</h2>
      {
        customer?(
          <>
          <p>User:{customer.message}</p>    
          <p>email:{customer.user.email}</p>
          </>
        ):
        (
          <p>Loading...</p>
        )
      }
    </div>
  )
}

