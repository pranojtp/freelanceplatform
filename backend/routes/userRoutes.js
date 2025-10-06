
const express = require("express");
const router = express.Router();
const userModel = require("../models/userData");
const jwt = require("jsonwebtoken");
const axios = require("axios");
require('dotenv').config()

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// ✅ reCAPTCHA verification helper
async function verifyRecaptcha(token) {
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
  );
  return response.data.success;
}

// 📋 Get users
router.get("/", async (req, res) => {
  try {
    const data = await userModel.find();
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Data not found");
  }
});

// 🔐 User Login with reCAPTCHA
router.post("/userlogin", async (req, res) => {
  const { email, password, token } = req.body;

  // Step 1: Verify reCAPTCHA
  const human = await verifyRecaptcha(token);
  if (!human) {
    return res.status(400).send({ message: "Failed reCAPTCHA verification" });
  }

  // Step 2: Validate user
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  try {
    if (user.password === password) {
      const payload = { uemail: email, pwd: password, role: user.role, id: user._id };
      const token = jwt.sign(payload, "freelancekey");
      res.status(200).send({ message: "Login successful", usertoken: token, role: user.role });
    } else {
      res.status(401).send({ message: "Unauthorized access" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error in server!" });
  }
});

// 🧾 User Register with reCAPTCHA
router.post("/userregister", async (req, res) => {
  const { email, password, name, role, token } = req.body;

  // Step 1: Verify reCAPTCHA
  const human = await verifyRecaptcha(token);
  if (!human) {
    return res.status(400).send({ message: "Failed reCAPTCHA verification" });
  }

  try {
    // Step 2: Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Step 3: Create new user
    const newUser = await userModel.create({ email, password, name, role });
    res.status(201).send({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error registering user" });
  }
});

module.exports = router;
