import React, { useEffect, useState } from 'react'
import axios from "axios"
import Blog from './Blog';
const Blogs = () => {

  const [blogs, setBlogs] = useState();

  const sendResut = async()=> {
    const res = await axios.get("http://localhost:5000/api/blog")
    .catch(err => console.log(err))

    const data = await res.data;
    console.log(data)
    return data;
  }
  useEffect(()=> {
    sendResut().then(data => (setBlogs(data.blogs)))
  },[])



  return (
    <div>
       {blogs && blogs.map((blog, index)=> {
        return <Blog
        isUser = {localStorage.getItem("userId") == blog.user._id}
        id = {blog._id}
        key = {index} userName = {blog.user.name} imageUrl = {blog.image} descripation = {blog.description} title = {blog.title}/>
       })
      }

    </div>
  )
}

export default Blogs