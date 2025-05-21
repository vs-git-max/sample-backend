import mongoose from "mongoose";
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //Create a new user
    const { email, name, password } = req.body;

    //check if the user exist
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      const error = new Error("User already exist");
      error.statusCode = 409;
      throw error;
    }

    //verify password digits
    const complicatePassword = (myPassword) => {
      const hasUppercase = /[A-Z]/.test(myPassword);
      const hasLowercase = /[a-z]/.test(myPassword);
      const hasNumbers = /[1-9]/.test(myPassword);
      return hasLowercase && hasNumbers && hasUppercase;
    };

    const checkIfComplicatedPassword = complicatePassword(password);
    if (!checkIfComplicatedPassword) {
      const error = new Error(
        "Password must contain uppercase, lowercase and a number"
      );
      error.statusCode = 404;
      throw error;
    }

    //hash password

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      [{ name, email, password: hashPassword }],
      { session }
    );

    // eslint-disable-next-line no-undef
    const token = jwt.sign({ userId: newUser[0]._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { token, user: newUser[0] },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export default signup;
