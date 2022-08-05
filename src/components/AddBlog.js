import { Box, Typography, InputLabel, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
const AddBlog = () => {

  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const hanldeInputs = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const sendRequest = async () => {
    const res = await axios.post("http://localhost:5000/api/blog/add", {
      ...inputs,
      user: localStorage.getItem("userId"),
    }).catch(err => console.log(err))

    const data = await res.data;
    return data
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=> navigate('/blogs')).then(data=> console.log(data))
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);"
          borderRadius={10}
          boxShadow="10x 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="felx"
          flexDirection={"column"}
          width="80%"
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            Post Your Blog
          </Typography>

          <InputLabel
            sx={{
              marginBottom: 1,
              mt: 2,
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Title
          </InputLabel>
          <TextField
            value={inputs.title}
            name="title"
            onChange={hanldeInputs}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <InputLabel
            sx={{
              marginBottom: 1,
              mt: 2,
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {" "}
            Descripation{" "}
          </InputLabel>
          <TextField
            value={inputs.description}
            name="description"
            onChange={hanldeInputs}
            margin="normal"
            variant="outlined"
            fullWidth
          />

          <InputLabel
            sx={{
              marginBottom: 1,
              mt: 2,
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {" "}
            ImageURl
          </InputLabel>
          <TextField
            value={inputs.image}
            name="image"
            onChange={hanldeInputs}
            margin="normal"
            variant="outlined"
            fullWidth
          />

          <Button
            sx={{
              mt: 2,
              borderRadius: 4,
            }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
