import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //check if auth header exists and is expected format
  if (!authHeader && !authHeader.startsWith("Bearer ")) {
    //401 = access denied
    return res.status(401).json({ success: false, message: "Access denied" });
  }
  //extracting the token from header
  const token = authHeader.split(" ")[1];

  try {
    //verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin" || decoded.role !== "super_admin") {
      //403 Forbiden if not admin
      return res
        .status(403)
        .json({ success: false, message: "Access forbidden" });
    }
    //atach the token payload
    req.user = decoded;
    //go the the next middleware
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const verifySuperAdmin = (req, res, next) => {
  if (req.user.role !== "super_admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Super admin role required.",
    });
  }
  next();
};
