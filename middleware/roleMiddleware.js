exports.isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  if (req.user.role !== "admin") {
    return res.status(403).send("Access denied");
  }

  next();
};

exports.isEmployee = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  if (req.user.role !== "employee") {
    return res.status(403).send("Access denied");
  }

  next();
};