import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
const UserBlogs = () => {

  const [blogs , setBlogs] = useState();
  const id = localStorage.getItem("userId");
  const [user, setUser] = useState("")

  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/user/${id}`)
      .catch((err) => console.log(err));

      const data = await res.data;
      setUser(data.blogs.name)
      return data
  };
  useEffect(() => {

    sendRequest().then(data => setBlogs(data.blogs.blogs))

  }, []);


  return <div>
        {blogs && blogs.map((blog, index)=> {
        return <Blog
        isUser={true}
        id = {blog._id}
        key = {index} userName = {user} imageUrl = {blog.image} descripation = {blog.description} title = {blog.title}/>
       })
      }
  </div>;
};

export default UserBlogs;
