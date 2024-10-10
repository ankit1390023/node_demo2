const jwt = require('jsonwebtoken');
const jwtAuthMiddleware = (req, res, next) => {
    //extract the jwt-token from the request header
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Access denied.No token provided');

    const token =authHeader.split(' ')[1];
    if (!token) return res.status(401).send('Access denied. No token provided.');
    try {
        //verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //attach user information to the request object
        req.user = decoded;
        next();
    } catch (ex) {
        console.log(ex);
        res.status(400).send('Invalid token.');
    }
        
}

//fucntion to generate jwt-token
const generateToken = (userData) => {
    //generate a new JWT token using user data
    const token = jwt.sign(userData,process.env.JWT_SECRET);
    return token;
}
module.exports = { jwtAuthMiddleware ,generateToken};