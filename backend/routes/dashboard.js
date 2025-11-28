const express=require("express")
const authMiddleware=require("../middleware/authMiddleware")  
const router=express.Router()

router.get("/dashboard",authMiddleware,(req,res)=>{   //okavela router lo dashboard vasthe  //auth middleware.js ni ekada access chestunnam
res.json({"message":"Welcome to the website",user:req.user})  
})
module.exports=router