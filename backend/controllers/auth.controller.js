import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
// import nodemailer from "nodemailer";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ error: "Email already associated with another account" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPW = await bcrypt.hash(password, salt);

    const boyPic = `https://avatar.iran.liara.run/public/boy?username=${email}`;
    const girlPic = `https://avatar.iran.liara.run/public/girl?username=${email}`;

    const newUser = new User({
      fullName,
      email,
      password: hashedPW,
      gender,
      avatar: gender == "male" ? boyPic : girlPic,
      verified: true,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        avatar: newUser.avatar,
        verified: newUser.verified,
      });
      //     const token = crypto.randomBytes(20).toString("hex");

      //     newUser.verificationToken = token;
      //     try {
      //       await newUser.save();
      //       console.log(process.env.EMAIL);
      //       console.log(process.env.PASSWORD);
      //     } catch (error) {
      //       res.status(500).json({ error: "Cannot save user" });
      //       console.log("Error saving user", error.message);
      //     }

      //     const transporter = nodemailer.createTransport({
      //       service: "gmail",
      //       auth: {
      //         user: process.env.EMAIL,
      //         pass: process.env.PASSWORD,
      //       },
      //     });

      //     const mailOptions = {
      //       to: newUser.email,
      //       subject: "Account Verification",
      //       text: `Please verify your account by clicking the following link:
      // http://${req.headers.host}/verify?token=${token}`,
      //     };

      //     transporter.sendMail(mailOptions, function (err) {
      //       if (err) {
      //         console.log("Error sending verification email", err.message);
      //         res.status(500).json({ error: "Internal Server Error" });
      //       } else {
      //         res.status(200).json({ message: "Verification email sent" });
      //       }
      //     });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    if (!user.verified) {
      return res.status(400).json({ error: "Please verify your email" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      createdOn: user.createdAt,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
