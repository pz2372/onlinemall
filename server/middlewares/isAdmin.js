const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).send({
        message: "Unauthorized!",
        success: false,
      });
    } else {
      const token = authHeader?.split(" ")[1];
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (user.role === "SUPERADMIN" || user.role === "BRANDOWNER") {
        req.user = user;
        next();
      } else {
        res.status(401).send({
          message: "Access denied! Only Super Admin has access to this route.",
          success: false,
        });
      }
    }
  } catch (error) {
    res.status(401).send({
      message: "Unauthorized!",
      success: false,
    });
  }
};
