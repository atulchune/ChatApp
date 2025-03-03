import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    // const token2 = req.cookies.jwt;
    const cookies = req.headers.cookie; // Get the cookie string
    const token =await  cookies
    ? cookies
        .split("; ")
        .find((cookie) => cookie.startsWith("jwt="))
        ?.split("=")[1]  // Use optional chaining to handle undefined result
    : null;
    // console.log("Cookies:", req.cookies);  // Add this line to log cookies
    // const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Unauthorised - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorised - Invalid Token" });
    }

    const user = await User.findById(decoded.userID).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in middleware controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
