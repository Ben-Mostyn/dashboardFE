import React from "react";
import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { CirclePicker } from "react-color";

// ! COMPONENTS
import Clock from "../components/clock";
// import MemeGenerator from "../components/utilsComponents/memeApi";
import ImageHandle from "../components/utilsComponents/image-loader/image_upload";

// ! CSS
import "./main.css";
import { BiText } from "react-icons/bi";
import { FiPenTool } from "react-icons/fi";
import { HiMusicNote } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiTodoLine } from "react-icons/ri";
import { RiEmotionLaughLine } from "react-icons/ri";
import { BsChatRightQuote } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

import "../components/textbox.css";
import { color } from "@cloudinary/url-gen/qualifiers/background";

const ScrapBook = ({ user, setUser }) => {
  // ! Todo state
  const [toDo, setToDo] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(""); //the one you are typing
  const [todos, setTodos] = useState([]);

  // !image state
  const [image, setImage] = useState();
  const [showImage, setShowImage] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  // ! textbox states
  const [showBtn, setShowBtn] = useState(false);
  const [textArea, setTextArea] = useState([]);
  const [textInput, setTextInput] = useState();
  // const [workXPs, setWorkXPs] = useState(0);
  // const [zIndex, setZIndex] = useState(1);

  // font changer state

  const [fontValue, setFontValue] = useState();

  // ! meme state
  const [meme, setMeme] = useState([""]);
  const [showMeme, setShowMeme] = useState(false);

  /// color picker

  const [color, setColor] = useState("ff0000");
  const [colorFont, setColorFont] = useState("ff0000");
  const [visible, setVisible] = useState(false);

  /// font size state
  const [fontSize, setFontSize] = useState(15);

  //!Quote State
  const [advice, setAdvice] = useState("");
  const [showQuote, setShowQuote] = useState(false);

  //! Advice Function
  let handleFetch = async () => {
    let response = await fetch("https://api.adviceslip.com/advice");
    let data = await response.json();
    setAdvice(data.slip);
  };

  //!   creates textbox onclick
  const createText = () => {
    setShowBtn(true);
    setTextArea([...textArea, textInput]);
    setTextInput();
  };

  //   !deletes targeted textbox
  const removeHandler = (index, i) => {
    let storedArr = [...textArea];
    setTextArea(storedArr);
    storedArr.splice(index, 1);
  };

  // ! creates todo

  const createNewTodo = (currentTodo) => {
    let todosArray = [...todos];
    todosArray.push({ todo: currentTodo, isCompleted: false });
    setTodos(todosArray);
  };
  const completeTodo = (index) => {
    let todosArray = [...todos];
    todosArray[index].isCompleted = !todosArray[index].isCompleted;
    setTodos(todosArray);
  };

  // ! deletes todo
  const deleteTodo = (index) => {
    let todosArray = [...todos];
    todosArray.splice(index, 1);
    setTodos(todosArray);
  };

  // ! meme generator

  const fetchMeme = async () => {
    const res = await fetch("https://api.imgflip.com/get_memes");
    const data = await res.json();
    // console.log(data.data, "i am data");
    setMeme(data.data.memes);
    let randomNum = Math.floor(Math.random() * meme.length);
    setMeme(meme[randomNum].url);
  };

  // !random meme gen

  // font changer

  const fontPicker = () => {
    const selectedValue = document.getElementById("list").value;
    setFontValue(selectedValue);

    console.log(selectedValue, "selectedValue");
  };

  useEffect(() => {
    const getImages = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_REST_API}getImages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user,
          }),
        }
      );
      const json = await response.json();
      const { image: images } = json;
      setUploadedImages(images);
      console.log(uploadedImages, "i am uploaded images");
    };
    getImages();
  });

  return (
    <div>
      <div className="main">
        <div className="playArea">
          {/* !IMAGE MODAL */}
          {/* <div>
            {showImage ? (
              <ImageHandle
                user={user}
                image={image}
                setImage={setImage}
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
              />
            ) : null}
          </div>
          {uploadedImages.map((imageUrl, index) => (
            <img alt="uploaded" key={index} src={imageUrl} />
          ))} */}
          {/* !TEXT BOX MODEL */}
          {!visible ? null : (
            <div className="fontModal">
              <div className="background">
                <h1 className="bgh1">Background</h1>
              </div>
              <div className="fontpickerdiv">
                <CirclePicker
                  className="textBackgroundPicker"
                  color={color}
                  onChangeComplete={(color) => {
                    setColor(color.hex);
                  }}
                  circleSize={12}
                  width={180}
                />
              </div>
              <div className="background1">
                <h1 className="bgh1">Font-Color</h1>
              </div>
              <div className="fontpickerdiv1">
                <CirclePicker
                  className="fontColorPicker"
                  color={colorFont}
                  onChangeComplete={(colorFont) => {
                    setColorFont(colorFont.hex);
                  }}
                  circleSize={12}
                  width={180}
                />
                {/* <button fontFamily={fontFamily} onClick={() => {setFontFamily("Arial")}}> Arial</button> */}
              </div>
              <div className="background3">
                <h1 className="bgh1">Font-style</h1>
              </div>
              <select className="dropdown" id="list" onChange={fontPicker}>
                <option value="Times New Roman" id="timesnew">
                  Times New Roman
                </option>
                <option value="Arial">Arial</option>
                <option value="Gill Sans">Gil Sans</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                {/* <option value="">Times New roman</option> */}
              </select>
              <div className="background2">
                <h1 className="bgh1">Font-Size</h1>
              </div>
              <div className="fontbuttons">
                <button
                  className="btn1"
                  id="fontbig"
                  onClick={() => {
                    setFontSize(fontSize + 2);
                  }}
                >
                  +
                </button>
                <button
                  className="btn1"
                  id="fontsmall"
                  onClick={() => {
                    setFontSize(fontSize - 2);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          )}
          <Clock />
          <div className="nav">
            <div className="half1">
              <button className="btn1" onClick={createText}>
                <BiText size={30} />
              </button>{" "}
              {/* working*/}
              <button className="btn1" onClick={() => setToDo(!toDo)}>
                {" "}
                <RiTodoLine size={30} />{" "}
              </button>
              <button
                className="btn1"
                onClick={() => {
                  !showMeme ? setShowMeme(true) : setShowMeme(false);
                }}
              >
                {" "}
                <RiEmotionLaughLine size={30} />
              </button>
              {/* IMAGE BUTTON */}
              <button
                className="btn1"
                onClick={() => {
                  showImage ? setShowImage(false) : setShowImage(true);
                }}
              >
                {" "}
                <FiPenTool size={30} />{" "}
              </button>
              <button
                className="btn1"
                onClick={() => {
                  !showQuote ? setShowQuote(true) : setShowQuote(false);
                }}
              >
                {" "}
                <BsChatRightQuote size={30} />
              </button>
              <div className="btn1">
                <HiMusicNote size={30} />
              </div>
            </div>

            <button
              className="btn2"
              onClick={() => {
                setUser();
                localStorage.clear();
              }}
            >
              {" "}
              <BiLogOut size={30} />
            </button>

            {/* <MemeGenerator /> */}
          </div>
          <div>
            {/* <button className="textButton" onClick={createText}><BiText size={30} /></button> */}

            <div className="mainPlayArea">
              {/* Text Box return ///////////////////////////////////////////////////////// */}
              {showBtn ? (
                <div className="textParent">
                  {textArea.map((workXP, i) => {
                    return (
                      <Draggable handle=".handle">
                        <div className="textborder">
                          <button onClick={removeHandler} id="x">
                            <AiOutlineCloseCircle />
                          </button>
                          <div className="handle">Drag Me!</div>
                          <button
                            onClick={() => {
                              visible ? setVisible(false) : setVisible(true);
                            }}
                          >
                            {" "}
                            Edit
                          </button>
                          <textarea
                            className="draggable textbox"
                            id="textbox"
                            key={i}
                            placeholder="Enter here"
                            style={{
                              //style react color
                              backgroundColor: color,
                              transition: "ease all 500ms",
                              color: colorFont,
                              fontSize: `${fontSize}px`,
                              fontFamily: `${fontValue}`,
                            }}
                            onChange={(e) => {
                              setTextInput(e.target.value);
                            }}
                            cols={20}
                            rows={8}

                            //  onMouseOver={hover}
                          />
                        </div>
                      </Draggable>
                    );
                    // <button onClick={() => setShowBtn(false)}>Delete</button>;
                  })}
                </div>
              ) : null}
              {/* Quote ///////////////////////////////////////////// */}
              {showQuote ? (
                <Draggable>
                  <div>
                    <h2>{advice.advice}</h2>
                    <button onClick={handleFetch}>Randomize Quote</button>
                  </div>
                </Draggable>
              ) : null}
              {/* Meme ////////////////////////////////////////////////////// */}
              <div>
                {!showMeme ? null : (
                  <Draggable>
                    <div>
                      <button onClick={fetchMeme}>Meme</button>

                      <img
                        src={meme}
                        style={{ height: 200, width: 200 }}
                        alt="meme"
                      />
                    </div>
                  </Draggable>
                )}
              </div>{" "}
              {/* ! ImageLoaderrrrr//////////////////////////////////////////////////// */}
              <div>
                {showImage ? (
                  <ImageHandle
                    user={user}
                    image={image}
                    setImage={setImage}
                    uploadedImages={uploadedImages}
                    setUploadedImages={setUploadedImages}
                  />
                ) : null}
              </div>
              {uploadedImages.map((imageUrl, index) => (
                <img alt="uploaded" key={index} src={imageUrl} />
              ))}
              {!toDo ? null : (
                <Draggable>
                  <div className="todolist">
                    <h1>ToDo List!</h1>
                    <input
                      className="todo-input"
                      value={currentTodo}
                      onChange={(e) => {
                        setCurrentTodo(e.target.value);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          createNewTodo(currentTodo);
                          setCurrentTodo(" ");
                        }
                      }}
                      placeholder="What do you need ToDo?"
                    />

                    {todos.map((todo, index) => (
                      <div key={todo} className="todo">
                        <div
                          className="checkbox"
                          onClick={() => completeTodo(index)}
                        >
                          {todo.isCompleted && <span>&#x2714;</span>}
                        </div>
                        <div className={todo.isCompleted ? "done" : " "}>
                          {" "}
                          {todo.todo}
                        </div>
                        <div
                          className="delete"
                          onClick={() => deleteTodo(index)}
                        >
                          &#128465;
                        </div>
                      </div>
                    ))}
                    {todos.length > 0 && `${todos.length} items`}
                  </div>
                </Draggable>
              )}
            </div>
          </div>
          <div>
            <h1 className="userHead">{`${user}'s Dashbored`}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapBook;
