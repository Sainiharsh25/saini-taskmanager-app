const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


// ================= SIGNUP =================
router.post("/signup", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role
    } = req.body;

    // Check existing user
    const existingUser =
      await User.findOne({
        email: email.toLowerCase()
      });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Allowed Roles
    const allowedRoles = [
      "Admin",
      "Team Member",
      "Tasker"
    ];

    // Validate Role
    if (
      !allowedRoles.includes(role)
    ) {
      return res.status(400).json({
        message: "Invalid role selected"
      });
    }

    // Hash Password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: "Signup successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ================= LOGIN =================
router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password,
      role
    } = req.body;

    // Find User
    const user =
      await User.findOne({
        email: email.toLowerCase()
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Compare Password
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // Role Validation
    if (
      user.role.toLowerCase() !==
      role.toLowerCase()
    ) {
      return res.status(401).json({
        message:
          `This account is registered as ${user.role}`
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    // Success Response
    res.status(200).json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;