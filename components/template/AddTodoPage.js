import { useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";


import RadioButton from "../element/RadioButton";

function AddTodoPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const addHandler = async ()=>{

  }
  return (
    <div className="add-form">
      <h2>
        <GrAddCircle />
        Add New Todo
      </h2>
      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
        </div>
    <div className="add-form__input--second">
      <RadioButton setStatus={setStatus} status={status} title="Todo" value="todo"><BsAlignStart/></RadioButton>
      <RadioButton setStatus={setStatus} status={status} title="In Progress" value="inProgress"><FiSettings/></RadioButton>
      <RadioButton setStatus={setStatus} status={status} title="Review" value="review"><AiOutlineFileSearch/></RadioButton>
      <RadioButton setStatus={setStatus} status={status} title="Done" value="done"><MdDoneAll/></RadioButton>
    </div>
    <button onClick={addHandler}>Add</button>
      </div>
    </div>
  );
}

export default AddTodoPage;
