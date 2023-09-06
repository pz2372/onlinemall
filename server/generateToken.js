const jwt = require("jsonwebtoken");

//Token expires in 15 minutes
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};
module.exports = generateAccessToken;

let refreshTokens = [];

//Token expires in 20 minutes
const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  });
  refreshTokens.push(refreshToken);
  return refreshToken;
};
module.exports = generateRefreshToken;
