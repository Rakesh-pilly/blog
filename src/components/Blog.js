import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Blog = ({ title, descripation, imageUrl, userName, isUser, id }) => {
  
 const navigate =  useNavigate()

  const handleEdit = (e)=> {
      navigate(`/myblogs/${id}`)
  }

  const deleteRequest = async()=> {

      const res = axios.delete(`http://localhost:5000/api/blog/${id}`)
      .catch(err => console.log(err));

      const data = await res.data;
      navigate("/blogs")
      return data;


  }
  const handleDelete = ()=> {
    deleteRequest().then(()=> navigate("/blogs"))

  }
  
  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton sx={{ marginLeft: "auto" }} onClick={handleEdit}>
            <EditIcon color = "warning" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteOutlineIcon color = "error"/>
          </IconButton>
        </Box>
      )}

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {userName.substring(0, 1).toUpperCase()}
          </Avatar>
        }
        action={<IconButton aria-label="settings"></IconButton>}
        title={title}
        // subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt="Paella dish"
      />



      <CardContent>
      <hr/>
<br/>
        <Typography variant="body2" color="text.secondary">
          <b> {userName} </b> {" : "} {descripation}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Blog;
