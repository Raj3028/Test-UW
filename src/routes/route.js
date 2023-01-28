//=====================Importing Module and Packages=====================//
const express = require('express');
const router = express.Router();
const { Authentication, Authorization } = require('../Middleware/auth')
const { createUser, userLogin } = require('../Controller/userController')
const { createTask, getTask, updateTask, deleteTask } = require("../controller/taskController")
//<<<============================================================================>>>//



//<<<========================== User APIs ==========================>>>//

//===================== User Registration(Post API) =====================//
router.post("/register", createUser)

//===================== User Login(Post API) =====================//
router.post("/login", userLogin)

//<<<=====================================================================>>>//




//<<<========================== TASK APIs ==========================>>>//
//===================== Create Task (Post API) =====================//
router.post("/createtask", Authentication, createTask)

//===================== Fetch data of Task (Get API) =====================//
router.get("/getTask", Authentication, getTask)

//===================== Update Task (Put API) =====================//
router.put("/updateTask/:taskId", Authentication, Authorization, updateTask)

//===================== Delete Task (Delete API) =====================//
router.delete("/deleteTask/:taskId", Authentication, Authorization, deleteTask)

//<<<=====================================================================>>>//




//<<<===================== It will Handle error When You input Wrong Route =====================>>>//
router.all("/**", (req, res) => {
    return res.status(404).send({ status: false, msg: "This API request is not available!" })
});
//<<<============================================================================>>>//



//=====================Module Export=====================//
module.exports = router;   
//<<<============================================================================>>>//