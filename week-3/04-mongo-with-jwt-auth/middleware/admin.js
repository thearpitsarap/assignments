const jwt = require('jsonwebtoken')
const jwtpassword = "validtoken"

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const auth = req.headers.authorization;
    console.log(auth);
    const token = auth.split(" ");
    
    try{
        jwt.verify(token[1],jwtpassword);
        next();
    }
    catch(err){
        res.json({message:"Not Authorized"})
    }
}

module.exports = adminMiddleware;