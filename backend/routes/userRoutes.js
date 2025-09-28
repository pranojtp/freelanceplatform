const express=require('express')
const router=express.Router()
const userModel=require('../models/userData')
const jwt=require('jsonwebtoken')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get("/",async (req,res)=>{
    try {
        const data = await userModel.find()
        res.status(200).send(data)
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Data not found")
    }
})

router.post("/userlogin", async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email })
    console.log(user)
    if (!user) {
        return res.status(404).send({ message: "user not found" })
    }
    try {
        if (user.password === req.body.password) {
            const payload = { uemail:req.body.email, pwd:req.body.password, role: user.role }
            const token = jwt.sign(payload, "freelancekey")

            console.log("user id is",user._id.toString())

            res.status(200).send({ message: "Login successful", usertoken: token , role: user.role,user_id:user._id })
        }
        else{
            res.status(401).send({message:"UNAUTHOIZED ACESSS"})
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send({ message: "Error in server!"})
    }
})
router.post("/userregister", async (req, res) => {
  try {
    // check if user already exists
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // create new user
    const newUser = await userModel.create(req.body);

    res.status(201).send({
      message: "User registered successfully",
      user: newUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error registering user" });
  }
});
module.exports=router