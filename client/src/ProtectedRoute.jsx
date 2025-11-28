import React, { Children } from 'react'   //login ayyi unnava leda ani ch7ustadi
import { Navigate } from 'react-router-dom'
export default function ProtectedRoute({children}) {//children ante ekada Dashboard

    const token = localStorage.getItem("token")//token ekada undi local storage lo getitem lo undi   //login ayyi unte kanuka 
    if(!token) //token lekapothe
        return <Navigate to="/login" replace/>//login ayithene we have to display the dashboard  //replace ani pettakapothe adress bar lo /login/dashboard ala kanipistadi
    return children
}  