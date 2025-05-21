import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //checking if the user exist
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User do not exist. Try another email.");
      error.statusCode = 404;
      throw error;
    }

    //working on the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    //creating the token
    // eslint-disable-next-line no-undef
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "User logged in",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default login;
