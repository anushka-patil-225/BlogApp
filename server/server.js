const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
require("./config/db");

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: "https://blog-app-lime-delta.vercel.app", // Allow only your frontend
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true, // Allow cookies & auth headers
  })
);

// Handle preflight requests
app.options("*", cors());

app.set("view engine", "ejs");
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use("/api", (req, res) => {
  res.send("Hello, API is working!");
});

// Global Error Handler
// app.use((err, req, res, next) => {
//   console.error("Error:", err.message);
//   res
//     .status(500)
//     .json({ message: "Internal Server Error", error: err.message });
// });

// Define Port
const PORT = 5001;
app.listen(PORT, () => console.log(`Server started at port ${PORT}...`));
