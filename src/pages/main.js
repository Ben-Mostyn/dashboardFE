import React from "react";
import ToDoTemplate from "../components/utilsComponents/todo";
import { useState } from "react";


const John = () => {
    const [toDo, setToDo] = useState(false);
    return ( 
        

        <div>
            <h1>hello</h1>
            {toDo && <ToDoTemplate/>}
            <button onClick = {()=>setToDo(!toDo)}> ToDo </button>
        </div>
     );
}
 
export default John;

