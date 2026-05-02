exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.send("Access denied");
    }
    next();
  };
  
  exports.isEmployee = (req, res, next) => {
    if (req.user.role !== "employee") {
      return res.send("Access denied");
    }
    next();
  };