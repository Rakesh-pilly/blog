import Header from "./components/Header";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useSelector , useDispatch} from "react-redux";
import { authActions } from "./store";

function App() {
  const isLoggIn = useSelector((state) => state.isLoggedIn);
  const disptach = useDispatch()
  useEffect(()=> {

    if(localStorage.getItem("userId")){
      disptach(authActions.login())
    }

  }, [disptach])
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggIn ? (
            <Route path="/auth" element={<Login />} exact />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} exact />
              <Route path="/myblogs" element={<UserBlogs />} exact />
              <Route path="/myblogs/:id" element={<BlogDetail />} exact />
              <Route path="/blogs/add" element={<AddBlog />} exact />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
