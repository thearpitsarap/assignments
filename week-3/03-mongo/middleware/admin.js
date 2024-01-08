const { Admin } = require("../db");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const adminName = req.headers.username;
    const adminPass = req.headers.password;

    const adminExists = Admin.find({username:adminName,password:adminPass});
    if(adminExists){
        next();
    }
    else{
        res.status(404).json({message:"Not Authorized"});
    }
}

module.exports = adminMiddleware;