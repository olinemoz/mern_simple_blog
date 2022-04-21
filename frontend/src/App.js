import React from 'react';
import Header from "./components/Header";
import {Routes, Route} from "react-router-dom"
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import {useSelector} from "react-redux";

const App = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn)

    return (
        <React.Fragment>
            <header>
                <Header/>
            </header>
            <main>
                <Routes>
                    <Route path="/">
                        <Route path="auth" element={<Auth/>}/>
                        <Route path="blogs" element={<Blogs/>}/>
                        <Route path="myBlogs" element={<UserBlogs/>}/>
                        <Route path="myBlogs/:id" element={<BlogDetail/>}/>
                        <Route path="blogs/add" element={<AddBlog/>}/>
                    </Route>
                    <Route path="*" element={<h2>Error Page 404</h2>}/>
                </Routes>
            </main>
        </React.Fragment>
    );
};

export default App;