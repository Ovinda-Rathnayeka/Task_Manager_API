const Task = require("../Models/taskModel");

const validStatuses = ["pending", "completed"];

//Find Mongoose TaskId and we create separate taskid
const findTaskByIdOrTaskId = async (id) => {
  let task = null;

  if (/^[0-9a-fA-F]{24}$/.test(id)) {
    task = await Task.findById(id);
  }

  if (!task) {
    task = await Task.findOne({ taskId: id });
  }

  return task;
};

//Data insert and validation (Create)
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    if (status && !validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status. Must be 'pending' or 'completed'." });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : "",
      status: status || "pending",
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//Get all tasks (Get)
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//Task get by mongoose object id and we create separate taskid both id use and can get (Get By Id)
exports.getTaskById = async (req, res) => {
  try {
    const task = await findTaskByIdOrTaskId(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: "Invalid task ID" });
  }
};

//Task can Update use Mongoose object id and we create separate taskid both id use and can update (Update)
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await findTaskByIdOrTaskId(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title !== undefined) {
      if (title.trim() === "") {
        return res.status(400).json({ message: "Title cannot be empty" });
      }
      task.title = title.trim();
    }

    if (description !== undefined) {
      task.description = description.trim();
    }

    if (status !== undefined) {
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid status. Must be 'pending' or 'completed'.",
        });
      }
      task.status = status;
    }

    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: "Invalid task ID" });
  }
};

//Task can delete use Mongoose object id and we create separate taskid both id use and can delete (Delete)
exports.deleteTask = async (req, res) => {
  try {
    const task = await findTaskByIdOrTaskId(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await Task.deleteOne({ _id: task._id });
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ message: "Invalid task ID" });
  }
};
