const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb+srv://Shreyansh:sunny@cluster0.ygjtchm.mongodb.net/BlogApp")
  .then(() => {
    console.log("connected!");
  })
  .catch((err) => {
    console.log(err);
  });
