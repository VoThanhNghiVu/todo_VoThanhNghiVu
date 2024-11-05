import jwt from "jsonwebtoken";
const { verify } = jwt;
const authorrizationRequired = "Authorization required";
const invalidCredentials = "Invalid credentials";

const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        res.statusMessage = authorrizationRequired;
        res.status(401).json({message: authorrizationRequired});
    } else {
        try {
            const token = req.headers.authorization;
            jwt.verify(token, process.env.JWT_SECRET_KEY);
            next();
        } catch (err) {
            res.statusMessage = invalidCredentials;
            res.status(403).json({message: invalidCredentials});
        }
    }
}

export { auth }
