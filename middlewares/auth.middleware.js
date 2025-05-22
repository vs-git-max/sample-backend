import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return res.status(400).json({ message: "No token provided." });

    // eslint-disable-next-line no-undef
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken)
      return res.status(400).json({ message: "Wrong token provided." });

    const user = await User.findById(decodedToken.userId);

    if (!user) return res.status(401).json({ message: "Unauthorized user" });

    req.user = user;

    next();
  } catch (error) {
    res.status(400).json({ message: "Unauthorized", error: error.message });
  }
};

export default authorize;
