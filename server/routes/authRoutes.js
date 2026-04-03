import express from "express";
import {
  confirmUserEmail,
  loginUser,
  registerUser,
  requestPasswordReset,
  resetUserPassword,
} from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login
 *     description: Authenticates a user using email or phone and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               phone:
 *                 type: number
 *                 example: 1234567890
 *               password:
 *                 type: string
 *                 example: "yourpassword"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", loginUser);
/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Creates a new user account with email, phone, username, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               phone:
 *                 type: number
 *                 example: 1234567890
 *               username:
 *                 type: string
 *                 example: "newuser"
 *               password:
 *                 type: string
 *                 example: "yourpassword"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
router.post("/register", registerUser);
/**
 * @swagger
 * /auth/confirm:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Confirm a user's email
 *     description: Confirms a user's email after registration through a verification code sent to their email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: number
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid, incorrect, or expired verification code.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error confirming email
 */
router.post("/confirm", confirmUserEmail);
/**
 * @swagger
 * /auth/reset:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Reset a user's password
 *     description: Resets a user's password through a verification code sent to their email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: number
 *                 example: 123456
 *               newPassword:
 *                 type: string
 *                 example: "yourpassword"
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       400:
 *         description: Invalid, incorrect, or expired verification code.
 *       404:
 *         description: User not found
 *       500:
 *         description: Error resetting password
 */
router.post("/reset", resetUserPassword);

/**
 * @swagger
 * /auth/reset:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get a password reset code
 *     description: Sends a password reset code sent to a user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: email@example.com
 *
 *     responses:
 *       200:
 *         description: Password reset code generated, saved to user, and sent via email.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error sending email with code.
 */
router.post("/reset", requestPasswordReset);

export default router;
