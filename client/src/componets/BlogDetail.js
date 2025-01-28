import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";

const BlogDetail = () => {
  const [blog, setBlog] = useState();
  const { id } = useParams();

  const fetchDetails = async () => {
    const res = await axios
      .get(`${config.BASE_URL}/api/blogs/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
    });
  }, [id]);

  console.log(blog);

  return (
    <div>
      {blog && (
        <Box
          sx={{
            borderRadius: "12px",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            padding: "40px",
            margin: "auto",
            marginTop: "40px",
            maxWidth: "800px",
            backgroundColor: "#fff",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {/* Title */}
          <Typography
            variant="h2"
            fontWeight="bold"
            textAlign="center"
            marginBottom={3}
            fontSize="36px"
          >
            {blog.title}
          </Typography>

          {/* Author and Date */}
          <Typography
            variant="subtitle2"
            textAlign="center"
            color="textSecondary"
            marginBottom={4}
            fontSize="16px"
          >
            By <strong>{blog.user.name}</strong> on{" "}
            {new Date(blog.date).toLocaleDateString()}
          </Typography>

          {/* Blog Image */}
          {blog.img && (
            <img
              src={blog.img}
              alt={blog.title}
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "30px",
              }}
            />
          )}

          {/* Blog Description */}
          <Typography
            variant="body1"
            textAlign="justify"
            lineHeight={1.8}
            fontSize="18px"
            color="#333"
          >
            {blog.desc}
            </Typography>
        </Box>
      )}
    </div>
  );
};

export default BlogDetail;
