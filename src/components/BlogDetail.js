import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import { Box, Typography, InputLabel, TextField, Button } from "@mui/material";

const BlogDetail = () => {
  const navigate = useNavigate()
  const id = useParams().id;
  const [blog, setblog] = useState();
  const [inputs, setInputs] = useState({});

  const fecthDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));

    const data = await res.data;

    return data;
  };

  const hanldeInputs = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/update/${id}`, {
        ...inputs,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then((data) => console.log(data))
    .then(()=> navigate('/myblogs'))
    ;
  };

  useEffect(() => {
    fecthDetails().then((data) => {
      setblog(data);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        image: data.blog.image,
      });
    });
  }, [id]);

  return (
    <div>
      {inputs && (
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
              Edit Your Blog
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
      )}
    </div>
  );
};

export default BlogDetail;
