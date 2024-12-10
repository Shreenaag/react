const jwt = require("jsonwebtoken");

// Secret key for signing JWT
const JWT_SECRET = "your_secret_key"; // Replace with a strong, unique secret key
const JWT_EXPIRATION = "1h"; // Set token expiration time (e.g., 1 hour)

module.exports = {
  // Function to generate a new token
  generateToken: (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  },

  // Middleware to verify token
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Attach decoded token payload to `req.user`
      next(); // Proceed to the next middleware
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token." });
    }
  },
};
