const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const signUp = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ message: "Email or Username already exists" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password.toString(), 10);

    // Create new user
    const newUser = new User({ username, email, password: hashPassword, role });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    const url = `${process.env.CLIENT_URL}/auth/verify-email/${token}`;

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: newUser.email,
      subject: "Verify your Email",
      html: `<h2>Eamil Verification</h2>
                 <p>Click the link below to verify your email:</p>
                 <a href="${url}">${url}</a>`,
    });

    res.status(201)
      .json({
        message:
          "Signup successful. Check email to verify.",
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password.toString(), user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentails" });
    }

    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN });

    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN })

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    })

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
      access_token: accessToken
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

const verifyTokens = async (req, res) => {
  try {
    if (req.user) {
      return res.status(200).json({
        success: true,
        message: "Token is valid",
        user: req.user
      })
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logOut = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    const user = await User.find({ refreshToken: token });

    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "lax",  
      secure: false 
    })
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found with this email" })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token and save to DB
    user.resetPasswordToken = crypto.createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const html =
      `<div style="font-family: Arial, sans-serif; background:#f3f4f6; padding:30px;">
    <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:8px;">
      
      <h2 style="color:#333;">Reset Your Account Password</h2>

      <p>Dear ${user.username},</p>

      <p>
      We received a request to reset your password. Click the button below to reset your password.
      </p>

      <div style="margin:25px 0;">
        <a href="${resetUrl}"
           style="background:#ef4444;color:white;padding:12px 25px;text-decoration:none;border-radius:30px;font-weight:bold;">
           RESET PASSWORD
        </a>
      </div>

      <p>If the button doesn't work, copy and paste this URL into your browser:</p>

      <p style="color:#2563eb;word-break:break-all;">
        ${resetUrl}
      </p>

      <p>This password reset link will expire in 15 minutes.</p>

    </div>
  </div>
`

    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      html,
    });

    res.status(200).json({ message: "Password reset link sent to email" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

}

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {

    console.log("Decoded user:", req.user.role);

    const userId = req.user.id;
    const user = await User.findById(userId);

    console.log("user details", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword.toString(), user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword.toString(), 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "Refresh token required" })
    }

    const decode = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decode.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.refreshToken !== token) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m" });

    const newRefreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" });

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({ message: "Token refreshed", access_token: newAccessToken });

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        message: "Refresh token expired",
      });
    }

    return res.status(403).json({
      message: "Invalid refresh token",
    });
  }
}

const verifyEmail = async (req, res) => {

  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(400).josn({ message: "Invalid token" });
    }

    if (user.isVerified)
      return res.status(400).json({ message: "Email already verified" });

    user.isVerified = true;
    await user.save();

    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { signUp, signIn, verifyTokens, logOut, forgotPassword, resetPassword, changePassword, refreshToken, verifyEmail };