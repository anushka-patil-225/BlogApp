import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";
import config from "../config";

const Blog = ({ title, desc, img, user, isUser, id, name }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`${config.BASE_URL}/api/blogs/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };

  return (
    <div>
      <Card
        sx={{
          width: "300px", // Fixed card width
          height: "400px", // Fixed card height
          boxShadow: "5px 5px 10px #ccc",
          margin: "20px", // Space between cards
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          title={title}
          titleTypographyProps={{
            sx: {
              paddingBottom: "5px", // Remove extra space under the title
              fontFamily: "Times New Roman, serif", // Set to Times New Roman font
              fontWeight: "bold", // Optional: Change the font weight
              fontSize: "1.2rem", // Adjust font size (smaller)
            },
          }}
        />

        <CardMedia
          component="img"
          image={img}
          alt={title}
          sx={{
            height: "180px",
            objectFit: "cover",
            padding: "10px", // Unified padding
          }}
        />
        <CardContent
          sx={{
            paddingBottom: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            {desc}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.primary"
            sx={{ marginTop: "10px", fontWeight: "bold" }}
          >
            By: {user} {/* Fallback for missing name */}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
