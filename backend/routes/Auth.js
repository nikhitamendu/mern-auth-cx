const express = require("express")  //mana dagara unna user information ni data base lo store cheyataniki authentication ni ready cheskuntunnam
const router = express.Router()
const User = require("../models/User.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


//for usecontext
const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    )
    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    )
    return { accessToken, refreshToken }
}

router.post("/register", async (req, res) => {
    try {
        const { name, gender, email, password, mobileNumber, address } = req.body //...1req body lo unna data ni techukunnam


        const existingUser = await User.findOne({ email })    //....2okavela user kanuka unte
        console.log(existingUser)
        if (!existingUser) {
            return res.status(409).json({ "message": "exists user" })
        }

        //password ni encrpt cheyadaniki
        const hashedPassword = await bcrypt.hash(password, 10)  //hash default method
        const newUser = User({    //....3user rules ni check chesi ra ani
            name, gender, email,    //okavela user kanuka lekapothe new user ni create chey
            password: hashedPassword,
            mobileNumber, address
        })
        await newUser.save()    //create ayina user mongodb atlas lo save avtadi
        res.status(200).json({ "message": "user added successfully" })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ "message": "internal server error" })
    }
})
router.post("/login", async (req, res) => {
    const { email, password } = req.body  //frontend nundi email and password 
    const user = await User.findOne({ email })  //email unda leda ani
    if (!user)
        return res.status(400).json({ "message": "user not found" })
    //compare password
    const isMatch = await bcrypt.compare(password, user.password)  //user lo unna password ni ante mongodb data and nenu entire chesina password ni evvu
    if (!isMatch)
        return res.status(400).json({ "message": "password is invalid" })//password match avvakapothe
    //evarithe user login avvataniki try chesaro only vaadiki related information matrame chupeyalim
    // const token = jwt.sign(  //5th line edigo jwt sign ane method use chesi oka token ni create chey....it has 3 parameters
    //     { id: user._id, email: user.email },  //_id adedi unique 
    //     process.env.JWT_SECRET,    //login ayetappudu for security purpose 
    //     { expiresIn: "1h" }   //valid user ayithe ani chepadaniki we use token3

    // )

    //updated
    const { accessToken, refreshToken } = generateTokens(user)

    res.cookie("refreshToken", refreshToken, {  //cookie-parser   //like edi manam login ayyaka automatic ga sitelogout chesi malli login avvu ani adagadaniki rasina code
        httpOnly: true,  //dont tell to anyone even for js also
        path:'/',   //default ga we have to give / onlys
        secure: false,  //devlopment lo false,production lo true
        sameSite: "lax"     //default structure //cookis only understandable by backend only  //lax all operations,restrict:get,none:nothing restrictons andsecurity
    })
   //sending response after log in
    res.status(200).json({
        "message": "user identified",
        token: accessToken,
        user: { id: user._id, name: user.name, email: user.email }
    })

})

router.get("/refresh-token", async (req, res) => {
    const token = req.cookies.refreshToken
    console.log(req.cookies)
    if (!token)
        return res.status(401).json({ "message": "No token appeared" })
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)//refresh token is verified using this
        const user = await User.findById(decoded.id)
        const newAccessToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )
        res.json({
            accessToken: newAccessToken,
            user: { id: user._id, email: user.email, name: user.name }
        })
    }
    catch (err) {
        console.log("error from refresh token route", err)
        return res.status(401).json({ "message": "invalid refresh token" })
    }

})

router.post("/logout", (req, res) => {
    res.clearCookie("refreshToken")
    res.status(200).json({ "message": "Logged out successfully" })
})

module.exports = router  //router ni export cheyali