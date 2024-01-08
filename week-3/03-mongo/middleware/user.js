const { User } = require("../db");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const userName = req.headers.username;
    const userPass = req.headers.password;

    const userExists = User.find({username:userName,password:userPass});
    if(userExists){
        next();
    }
    else{
        res.status(404).json({message:"Not Authorized"});
    }
}

module.exports = userMiddleware;