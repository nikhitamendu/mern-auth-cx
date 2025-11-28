const jwt=require("jsonwebtoken")  //verify method   authmiddleware is going to check whether the token is valid or not
const authMiddleware=(req,res,next)=>{  //oka variable teeskunnam
    try{
        const token=req.headers["authorization"]   //e token frontend nundi vachindi //e key lo token unda leda ani check chestadi
        if(!token){
            return res.status(401).json({"message":"No token provided"})
        }    //relate to auth.js
        const finalToken=token.split(" ")[1]   //split ane method string ni array ki convert chestadi ...convert chesi finalToken ane variable lo save chey
        const decoded=jwt.verify(finalToken,process.env.JWT_SECRET)  //final token ni jwt token ni verify chesi
        req.user=decoded //decode ayina value ni teekuni req.user ane variable lo store cheskuntunnam
        next()  //dashboard ki veltadi frontend
    }
    catch(err){
        return res.status(401).json({"message":"Invalid Token oe token get expired"})

    }
}
module.exports= authMiddleware  //authmiddle ware anedi edithe vastundo token frontend nundi mana routes ki access cheskodaniki help ayyiddi