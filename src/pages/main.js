import React from "react";
import ToDoTemplate from "../components/utilsComponents/todo";
import { useState } from "react";
import Textbox from "../components/utilsComponents/textbox";
import "./main.css";
// import App from "../utils/index";

import MemeGenerator from "../components/utilsComponents/memeApi";

import ImageHandle from "../components/utilsComponents/image-loader/image_upload";
import NavBar from "../components/Navbar";

import { BiText } from "react-icons/bi";
import { color } from "@cloudinary/url-gen/qualifiers/background";

const ScrapBook = ({ user, setUser }) => {
  const [toDo, setToDo] = useState(false);
  const [image, setImage] = useState();

  //Testing
  // const [showBtn, setShowBtn] = useState(false);
  // const [textArea, setTextArea] = useState([]);
  // const [textInput, setTextInput] = useState();
  // const [workXPs, setWorkXPs] = useState(0);
  // const [zIndex, setZIndex] = useState(1);

  return (
    <div>
      <div className="main">
        <NavBar />
        <div className="playArea">
          <button
            onClick={() => {
              setUser();
              localStorage.clear();
            }}
          >
            Logout
          </button>
          <h1>hello!</h1>
          {toDo && <ToDoTemplate />}
          <button onClick={() => setToDo(!toDo)}> ToDo </button>
          <Textbox />
          <MemeGenerator />

          <ImageHandle />
        </div>
      </div>
    </div>
  );
};

export default ScrapBook;
