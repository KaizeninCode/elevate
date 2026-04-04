import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/User.js";
import { Resend } from "resend";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const resend = new Resend(process.env.RESEND_API_KEY);

const loginUser = async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    let user = null;
    if (email) {
      user = await User.findOne({ email });
    } else if (phone) {
      user = await User.findOne({ phone });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jsonwebtoken.sign(payload, jwtSecret, { expiresIn: "1h" });
    const { password: _password, ...userWithoutPassword } = user.toObject();
    res
      .status(200)
      .json({ message: "Login successful.", user: userWithoutPassword, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
};

const registerUser = async (req, res) => {
  const { email, phone, name, password } = req.body;

  try {
    // Check if user exists by email or phone or username
    let user = await User.findOne({
      $or: [{ email }, { phone }, { name }],
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      email,
      phone,
      name,
      password,
    });

    // generate a 6 digit code that will be used for email verification
    const verificationCode = getConfirmResetCode();

    // save to user instance
    user.emailVerificationCode = verificationCode;
    user.emailVerificationCodeExpires = Date.now() + 15 * 60 * 1000; // -> expires in 15 minutes

    await user.save();

    // send verification email
    await resend.emails.send({
      from: "Phil from Elevate <onboarding@resend.dev>",
      to: email,
      subject: "Your Elevate verification code",
      text: `Your verification code is ${user.emailVerificationCode}.\nIt will expire in 15 minutes.`,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { email: user.email, name: user.name, phone: user.phone },
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error registering user.");
  }
};

const confirmUserEmail = async (req, res) => {
  const { code } = req.body;
  try {
    /*
    find user by code --> POTENTIAL ISSUE: Users could have the same code if they register around the same time
    check if code matches and is not expired
    if valid, set isEmailVerified to true and clear code and expiration
    */

    const user = await User.findOne({
      emailVerifivationCode: code,
      emailVerificationCodeExpires: { $gt: Date.now() },
    });
    if (!user)
      return res.status(404).json({ message: "Invalid or expired code." });

    if (user.isEmailVerified)
      return res.status(400).json({ message: "Email already verified." });

    user.isEmailVerified = true;
    user.emailVerificationCode = null;
    user.emailVerificationCodeExpires = null;

    await user.save();

    return res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error confirming email", error });
  }
};

//  generate 6 digit code that will be used for email verification or password reset
const getConfirmResetCode = () => Math.floor(100000 + Math.random() * 900000);

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    user.passwordResetCode = getConfirmResetCode();
    user.passwordResetCodeExpires = Date.now() + 15 * 60 * 1000; // -> expires in 15 minutes

    await user.save();

    // send password reset email
    await resend.emails.send({
      from: "Phil from Elevate <onboarding@resend.dev>",
      to: email,
      subject: "Reset your Elevate password",
      text: `Your verification code is ${user.passwordResetCode}.\nIt will expire in 15 minutes.`,
    });

    res
      .status(200)
      .json({
        message:
          "Password reset code generated, saved to user, and sent via email.",
      });
  } catch (error) {
    res.status(500).json({ message: "Error sending email with code", error });
  }
};

const requestConfirmationCode = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    user.emailVerificationCode = getConfirmResetCode();
    user.emailVerificationCodeExpires = Date.now() + 15 * 60 * 1000; // -> expires in 15 minutes

    await user.save();

    // send password reset email
    await resend.emails.send({
      from: "Phil from Elevate <onboarding@resend.dev>",
      to: email,
      subject: "Your Elevate verification code",
      text: `Your verification code is ${user.emailVerificationCode}.\nIt will expire in 15 minutes.`,
    });

    res
      .status(200)
      .json({
        message:
          "Email verification code generated, saved to user, and sent via email.",
      });
  } catch (error) {
    res.status(500).json({ message: "Error sending email with code", error });
  }
};

const resetUserPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  try {
    /*
    find user by email
    check if code matches and is not expired
    if valid, reset password and clear code and expiration
    */

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    if (!user.passwordResetCode)
      return res.status(400).json({ message: "Invalid password reset code." });

    if (code !== user.passwordResetCode)
      return res
        .status(400)
        .json({ message: "Incorrect password reset code." });

    if (Date.now() > user.passwordResetCodeExpires)
      return res.status(400).json({ message: "Expired password reset code." });

    // reset password -> create new user instance with same details but new password to trigger pre-save hook for hashing
    const userWithNewPassword = [{ ...user.toObject(), password: newPassword }];

    // clear code and expiration
    userWithNewPassword.passwordResetCode = null;
    userWithNewPassword.passwordResetCodeExpires = null;

    await userWithNewPassword.save();

    return res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error resetting password", error });
  }
};

const logout = async (req, res) => {
  // Since JWTs are stateless, logout can be handled on the client side by deleting the token.
  res.json({ message: "User logged out successfully" });
};

export {
  loginUser,
  registerUser,
  confirmUserEmail,
  resetUserPassword,
  requestPasswordReset,
  requestConfirmationCode,
};
