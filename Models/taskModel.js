const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

//Task ID Auto Generate Logic
taskSchema.pre("save", async function (next) {
  if (!this.taskId) {
    const count = await mongoose.model("Task").countDocuments();
    this.taskId = `TD${(count + 1).toString().padStart(5, "0")}`;
  }
  next();
});

module.exports = mongoose.model("Task", taskSchema);
