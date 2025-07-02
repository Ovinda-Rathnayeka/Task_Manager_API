const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const taskRoutes = require("./Routes/taskRoutes");

dotenv.config();
const app = express();
app.use(express.json());

//Routes
app.use("/api/tasks", taskRoutes);

//Mongo DB Connection Code
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

//Server Runiing Port Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
