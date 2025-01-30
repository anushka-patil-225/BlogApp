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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";
import config from "../config";

const Blog = ({ title, desc, img, user, id }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const deleteRequest = async () => {
    const res = await axios
      .delete(`${config.BASE_URL}/api/blogs/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
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
            sx={{ marginTop: "10px", fontStyle:"italic"}}
          >
            By: {user} {/* Fallback for missing name */}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
