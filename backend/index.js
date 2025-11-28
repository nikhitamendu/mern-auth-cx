const mongoose=require("mongoose")//connect backend to mongodb
const cors=require("cors")//frontend to talk your backend
const express=require("express")//
const app=express()
const cookieParser=require("cookie-parser")
const authRoutes=require("./routes/Auth.js")
const dashboardRoutes=require("./routes/dashboard.js")
require("dotenv").config()

app.use(cors({
    origin:"https://mern-auth-frontend-3n6h.onrender.com",
    credentials:true , //we write this related to cors
}))//different origins ni access cheyadaniki
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("DB connected successfully"))
.catch(err=>console.log(err))
app.get("/",(req,res)=>res.json({"message":'dummy route'}))   //related to postman
app.use("/api",authRoutes)  //5th line ni import cheskunnam
app.use("/api",dashboardRoutes)
app.listen(process.env.PORT,()=>{console.log("server started successfully")})//server ni start cheyadaniki