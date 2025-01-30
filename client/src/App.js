import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from './componets/Header';
import React from 'react';
import Login from './componets/Login';
import Blogs from './componets/Blogs';
import UserBlogs from './componets/UserBlogs'
import AddBlogs from './componets/AddBlogs'
import BlogDetail from './componets/BlogDetail'
import UpdateBlog from "./componets/UpdateBlog";
import Footer from './componets/Footer';


function App() {
  return <React.Fragment>
    <header>
      <Header/>
    </header>
    <main className="app-container" style={{ paddingTop: '70px' }}>
    <Routes>
      <Route path="/" element={<Blogs/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/blogs" element={<Blogs/>}></Route>
      <Route path="/blogs/:id" element={<BlogDetail/>}></Route>
      <Route path="/myBlogs" element={<UserBlogs/>}></Route>
      <Route path="/myBlogs/:id" element={<BlogDetail/>}></Route>
      <Route path="/blogs/add" element={<AddBlogs />} />
      <Route path="/updateBlog/:id" element={<UpdateBlog />} />
    </Routes>
    </main>
    <Footer/>


  </React.Fragment>;
}

export default App;