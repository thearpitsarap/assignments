const jwt = require('jsonwebtoken')
const jwtpassword = "validtoken"

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const auth = req.headers.authorization;
    const token = auth.split(" ");
    try{
        jwt.verify(token[1],jwtpassword);
        next();
    }
    catch(err){
        res.json({message:"Not Authorized"})
    }
}

module.exports = userMiddleware;