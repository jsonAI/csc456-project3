const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    res.locals.user = decoded; // ensures views always have user

    next();
  } catch (err) {
    res.clearCookie("token"); // clean invalid token
    return res.redirect("/login");
  }
};