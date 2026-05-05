const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error("No token");

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "debugkey");

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ code: 401, message: "No tienes permiso :(" });
  }
};
