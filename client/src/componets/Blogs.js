import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import config from "../config";
import { Link } from "react-router-dom";
import "../CSS/Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState();

  const sendRequest = async () => {
    const res = await axios
      .get(`${config.BASE_URL}/api/blogs`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      console.log(data.blogs);
      setBlogs(data.blogs);
    });
  }, []);

  return (
    <div className="blogs-container">
      {blogs &&
        blogs.map((blog, index) => (
          <Link
            key={index}
            to={`/blogs/${blog._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Blog
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              img={blog.img}
              user={blog.user.name}
              date={new Date(blog.date).toLocaleDateString()}
            />
          </Link>
        ))}
    </div>
  );
};

export default Blogs;
