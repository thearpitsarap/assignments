const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../../03-mongo/db");
const jwt = require('jsonwebtoken')
const jwtpassword = "validtoken"
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const adminName = req.body.username;
    const adminPass = req.body.password;

    Admin.create({username:adminName,password:adminPass});
    res.send("Admin Created Successfully")
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const adminExists = await Admin.find({username:req.body.username,password:req.body.password});
    if(adminExists){
        const token = jwt.sign({
            username:req.body.username,
            password:req.body.password
        },jwtpassword)
        res.send(token);
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    Course.create({
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        imageLink:req.body.imageLink
    })
    res.send("Course created successfully");
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find();
    res.json(courses);
});

module.exports = router;