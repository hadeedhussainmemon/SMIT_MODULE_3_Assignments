const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { User } = require("../model/user");

const router = express.Router();

app.use("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
      throw new Error("Name is not valid !");
    } else if (!validator.isEmail(email)) {
      throw new Error("Email is not Valid !");
    } else if (!validator.isStrongPassword(password)) {
      throw new Error("Please use a strong password");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.cookie("token", "1234567890asdfghjkl");

    res.send({
      message: "User signup successfully!",
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      message: "Signup error !",
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      throw new Error("Invalid Credentials !");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      const token = await jwt.sign({ id: user._id }, "Hadeed@4321", {
        expiresIn: "1d",
      });

      console.log("TOKEN--->", token);

      res.cookie("token", token);

      res.send("Login Successful !");
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (error) {
    res.status(400).send({
      message: "Login error !",
      error: error.message,
    });
  }
});

app.use("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now() * 10),
  });

  res.send("Logout Successfully !");
});

module.exports = router;
