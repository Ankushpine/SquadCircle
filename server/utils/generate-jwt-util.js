import jwt from "jsonwebtoken";
import "dotenv/config";

const generateJwtToken = (userId,res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });


  return token;
};

export default generateJwtToken;
