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
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(401).send({
      message: "Unauthorized!",
      success: false,
    });
  }
};
