import { UserModel } from "../model/user-model.js";
import generateJwtToken from "../utils/generate-jwt-util.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const CreateUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({ error: "User already exist." });
    }

    const image = `https://avatar.iran.liara.run/username?username=${firstname}+${lastname}`
   
    const name = firstname + " " + lastname;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = await UserModel.create({
      name,
      email,
      image,
      password: hashPassword,
    });

    return res.status(200).json({ message: "User Created succefully." });
  } catch (error) {
    console.log("Error in Create User Controller :: ", error.message);
    return res.status(500).json({
      error: "Internal server Error.",
    });
  }
};

export const LogInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(500).json({ error: "User not present." });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(500).json({ error: "Incorrect password." });
    }

    const token = generateJwtToken(user._id,res);

    return res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        token,
      });


  } catch (error) {
    console.log("Error in Log in User Controller :: ", error.message);
    return res.status(500).json({
      error: "Internal server Error.",
    });
  }
};

