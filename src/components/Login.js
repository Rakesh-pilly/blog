import { Box, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import {useNavigate} from "react-router-dom"

const Login = () => {
const disptach = useDispatch();
const naviagte = useNavigate()

  const [isSignup, setSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
password: "",
  });

  const hanldeInputs = (e)=> {
    setInputs(prev => {
      return {
        ...prev,[e.target.name] : e.target.value
      }
    })
  }


  const sendRequst = async(type = "login")=> {

   const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
      email: inputs.email,
      password: inputs.password,
      name: inputs.name
    }).catch(err=> console.log(err))


    const data = await res.data;

    return data;
  }


  const handleSubmit = (e)=> {
    e.preventDefault()

    if(isSignup){
      sendRequst("signup")
      .then(data=> localStorage.setItem("userId",data.existingUser._id))
      .then(()=> naviagte("/blogs"))

    }else{
      sendRequst().then(data=> localStorage.setItem("userId",data.existingUser._id)).then(()=> disptach(authActions.login())).then(()=> naviagte("/blogs"))
      
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display={"flex"}
          flexDirection="column"
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center"
          
          >
            {isSignup ? "Singup" : "login"}
          </Typography>
          {isSignup && (
            <TextField placeholder="Name" type="text" margin="normal" 
            value = {inputs.name}
          onChange = {hanldeInputs}
          name = "name"
          />
          )}{" "}
          <TextField placeholder="Email" type="email" margin="normal" 
          value = {inputs.email}
          onChange = {hanldeInputs}
          name = "email"
          />
          <TextField placeholder="Password" type="password" margin="normal"
          value = {inputs.password}
          onChange = {hanldeInputs}
          name = "password"
          />
          <Button color="warning" sx={{ borderRadius: 3, marginTop: 3 }}
          type = "submit"
          >
            Sumbit
          </Button>
          <Button
            color="warning"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            onClick={() => setSignup(!isSignup)}
          >
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
