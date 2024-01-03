const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course,user_courses} = require("../db")
const jwt = require('jsonwebtoken')
const jwtpassword = "validtoken"

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const userName = req.body.username;
    const userPass = req.body.password;

    User.create({username:userName,password:userPass});
    res.send("user Created Successfully")
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const userExists = await User.find({username:req.body.username,password:req.body.password});
    if(userExists){
        const token = jwt.sign({
            username:req.body.username,
            password:req.body.password
        },jwtpassword)
        res.send(token);
    }
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find();
    res.json(courses);
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.param.courseId;
    const user = req.headers.u_id;
    await User.updateOne({
        username:user
    },
    {
        "$push":{
            purchesedCourses:courseId
        }
    })
    res.json({"message":courseId})
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username:req.headers.u_id
    })

    const courses = await Course.find({
        _id:{
            "$in": user.purchasedCourses
        }
    })
    res.json({"courses":courses})
});

module.exports = router