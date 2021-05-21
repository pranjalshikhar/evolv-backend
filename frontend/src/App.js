import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [blogBodyList, setBlogList] = useState("");
  const [blogId, setBlogId] = useState("");
  const [commBody, setCommBody] = useState("");
  const [commBodyList, setCommList] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:8000/api/get").then((response) => {
      setBlogList(response.data);
    });
  }, []);

  const submitBlog = () => {
    Axios.post("http://localhost:8000/api/insert", {
      blogTitle: blogTitle,
      blogBody: blogBody    });
      setBlogList([
        ...blogBodyList,
        {blogTitle: blogTitle, blogBody: blogBody},
      ]);
    };

  // const submitComment = () => {
  //   Axios.post("http://localhost:8000/api/insert/comment/id", {
  //     blogId: blogId,
  //     commBody: commBody    });
  //     setCommList([
  //       ...commBodyList,
  //       {blogId: blogId, commBody: commBody},
  //     ]);
  //   };

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>

      <div className="form">
        <label>Blog Title</label>
        <input type="text" name="blogTitle" onChange={(e) => {
          setBlogTitle(e.target.value);
        }} />
        <label>Blog Body</label>
        <input type="text" name="blogBody" onChange={(e) => {
          setBlogBody(e.target.value);
        }} />

        <button onClick={submitBlog}> Submit </button>
        <br />
        <br />

        <label>Add Blog ID</label>
        <input type="number" name="id" onChange={(e) => {
          setBlogId(e.target.valueAsNumber);
        }} />
        <label>Add Comment</label>
        <input type="text" name="commBody" onChange={(e) => {
          setCommBody(e.target.value);
        }} />
        {/* <button onClick={submitComment}> Post Comment </button> */}

        
        {/* ----Live Rendering----   */}
        
        {/* {blogBodyList.map((val) => {
          return <h1>BlogTitle: {val.blogTitle} | BlogBody: {val.blogBody}</h1> 
        })}; */}


      </div>
    </div>
  );
}



export default App;
