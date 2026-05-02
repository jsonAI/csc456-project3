const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Show Register Page
exports.registerPage = (req, res) => {
  if (req.cookies.token) {
    return res.redirect("/dashboard");
  }
  res.render("auth/register");
};

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.redirect("/login");

  } catch (err) {
    res.send(err.message);
  }
};

// Show Login Page
exports.loginPage = (req, res) => {
  if (req.cookies.token) {
    return res.redirect("/dashboard");
  }
  res.render("auth/login");
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Wrong password");

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true only on HTTPS (Render)
      sameSite: "lax"
    });

    res.redirect("/dashboard");

  } catch (err) {
    res.send(err.message);
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};