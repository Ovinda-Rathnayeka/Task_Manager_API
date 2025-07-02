const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/taskController");

//Create Task
router.post("/", taskController.createTask);

//Get All Tasks
router.get("/", taskController.getAllTasks);

//Get Mongoose ObjectId and TaskId both id use and can get
router.get("/:id", taskController.getTaskById);

//Update Mongoose ObjectId and TaskId both id use and can update
router.put("/:id", taskController.updateTask);

//Delete Mongoose ObjectId and TaskId both id use and can delete
router.delete("/:id", taskController.deleteTask);

module.exports = router;
