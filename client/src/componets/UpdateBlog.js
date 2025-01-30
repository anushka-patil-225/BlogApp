import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import "../CSS/UpdateBlog.css";

const UpdateBlog = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", desc: "" });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/blogs/${id}`);
        setBlog(res.data.blog); 
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to fetch the blog data. Please try again.");
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(null); 
    console.log(`${config.BASE_URL}/api/update/${id}`);
    try {
      const res = await axios.put(
        `${config.BASE_URL}/api/blogs/update/${id}`,
        blog
      );

      if (res.status === 200) {
        alert("Blog updated successfully!");
        navigate("/myBlogs"); 
      } else {
        alert("Failed to update the blog. Please try again.");
      }
    } catch (err) {
      console.error("Error updating blog:", err);
      setError("An error occurred while updating the blog.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="update-blog-container">
      <form onSubmit={handleSubmit} className="update-blog-form">
        <h2 className="form-title">Update Your Blog</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label className="form-label">Title:</label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            name="desc"
            value={blog.desc}
            onChange={handleChange}
            required
            rows="5"
            className="form-textarea"
          ></textarea>
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
