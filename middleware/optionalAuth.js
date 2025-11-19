// middlewares/optionalAuth.js
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    req.user = null;
    return next();
  }

  try {
    // decode ONLY if provided
    const token = authHeader.split(" ")[1];
    // You can decode JWT here if needed
    req.user = { id: "temp-user", role: "athlete" }; // mock user
  } catch {
    req.user = null;
  }

  next();
};
