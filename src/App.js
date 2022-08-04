import Header from "./components/Header";
import React from "react";
import {Routes,Route} from "react-router-dom"
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useSelector } from "react-redux";

function App() {
  const isLoggIn = useSelector(state => state.isLoggedIn);
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
            <Route path = "/auth" element = {<Login/>} exact/>
            <Route path = "/blogs" element = {<Blogs/>} exact/>
            <Route path = "/myblogs" element = {<UserBlogs/>} exact/>
            <Route path = "/myblogs/:id" element = {<BlogDetail/>} exact/>
            <Route path = "/blogs/add" element = {<AddBlog/>} exact/>
            
        </Routes>
      </main>
    </div>
  );
}

export default App;
