const { Router } = require("express");
const router = Router();
const {User,Course, user_courses} = require("../db")
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const userName = req.body.username;
    const userPass = req.body.password;

    User.create({username:userName,password:userPass});
    res.send("user Created Successfully")
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find();
    res.json(courses);
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    user_courses.create({
        user_id:req.headers.u_id,
        courseId:req.params.courseId
    })
    res.send("Course Purchased sucessfully")
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const userCourses = await user_courses.find({user_id:req.headers.u_id});
    res.send(userCourses)
});

module.exports = router