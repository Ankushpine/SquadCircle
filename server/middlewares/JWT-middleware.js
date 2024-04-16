import jwt from "jsonwebtoken";
import 'dotenv/config'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const jwtTokenVerification = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(404).send("authentication failed");
    }
    
    req.user = jwt.verify(token, JWT_SECRET_KEY);
    next();
};

export default jwtTokenVerification;
