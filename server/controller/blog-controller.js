const mongoose = require("mongoose");
const { findByIdAndRemove } = require("../model/Blog");
const Blog = require("../model/Blog");
const User = require("../model/User");

const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    // Populate the 'user' field to include user details
    blogs = await Blog.find().populate("user", "-password"); // Exclude sensitive fields like 'password'
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Fetching blogs failed" });
  }

  if (!blogs || blogs.length === 0) {
    return res.status(404).json({ message: "No blogs found" });
  }

  return res.status(200).json({ blogs });
};

const addBlog = async (req, res, next) => {
  const { title, desc, img, user } = req.body;

  const currentDate = new Date();

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (e) {
    return console.log(e);
  }
  if (!existingUser) {
    return res.status(400).json({ message: " Unautorized" });
  }

  const blog = new Blog({
    title,
    desc,
    img,
    user,
    date: currentDate,
  });

  try {
    await blog.save();
  } catch (e) {
    return console.log(e);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save(session);
    existingUser.blogs.push(blog);
    await existingUser.save(session);
    session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ blog });
};

const updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const { title, desc } = req.body;
  console.log(req.params.id);

  let blog;

  try {
    blog = await Blog.findByIdAndUpdate(blogId, { title, desc }, { new: true });
    console.log(blogId);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Error while updating the blog", error: e.message });
  }

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  return res.status(200).json({ message: "Blog updated successfully", blog });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;

  try {
    blog = await Blog.findById(id).populate("user", "-password");
  } catch (e) {
    return console.log(e);
  }

  if (!blog) {
    return res.status(500).json({ message: "not found" });
  }

  return res.status(200).json({ blog });
};

const deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  try {
    const blog = await Blog.findByIdAndDelete(id).populate("user");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const user = blog.user;
    user.blogs.pull(blog);
    await user.save();

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Unable to delete" });
  }
};

const getByUserId = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const userBlogs = await User.findById(userId).populate("blogs");

    if (!userBlogs || userBlogs.blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found for this user." });
    }

    return res.status(200).json({ user: userBlogs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Fetching blogs failed." });
  }
};

module.exports = {
  getAllBlogs,
  addBlog,
  updateBlog,
  getById,
  deleteBlog,
  getByUserId,
};
