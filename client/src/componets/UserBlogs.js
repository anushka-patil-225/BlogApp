import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom"; 
import config from "../config";

const useStyles = makeStyles(() => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    margin: "20px auto",
    width: "80%",
  },
  blogContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    height: "400px",
    overflow: "hidden",
  },
  blogImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  updateButton: {
    backgroundColor: "blue",
    "&:hover": {
      backgroundColor: "darkblue",
    },
  },
  deleteButton: {
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "darkred",
    },
  },
}));

const UserBlogs = () => {
  const classes = useStyles();
  const [userBlogs, setUserBlogs] = useState([]);
  const navigate = useNavigate(); 
  const userId = localStorage.getItem("userId");

  const fetchUserBlogs = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${userId}`);
      setUserBlogs(res.data.user.blogs || []);
    } catch (err) {
      console.error("Error fetching user blogs:", err);
    }
  };

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`);
      fetchUserBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const handleUpdate = (blogId) => {
    navigate(`/updateBlog/${blogId}`);
  };

  return (
    <div className={classes.container}>
      {userBlogs.length === 0 ? (
        <p>No blogs found for the current user.</p>
      ) : (
        userBlogs.map((blog) => (
          <div key={blog._id} className={classes.blogContainer}>
            <h2 className={classes.title}>{blog.title}</h2>
            <img
              className={classes.blogImage}
              src={blog.img}
              alt={blog.title}
            />
            <div className={classes.buttonContainer}>
              <button
                className={`${classes.button} ${classes.updateButton}`}
                onClick={() => handleUpdate(blog._id)}
              >
                Update
              </button>
              <button
                className={`${classes.button} ${classes.deleteButton}`}
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserBlogs;
