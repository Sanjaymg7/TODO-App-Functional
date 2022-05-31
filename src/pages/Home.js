import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Components/Form";
import "./Home.css";
import Task from "../Components/Task";

const Home = () => {
  const navigate = useNavigate();
  const initState = {
    tasks: [],
    inputTask: "",
    idVal: 0,
    updation: false,
    updateId: 0,
  };
  const [todoAppData, setTodoAppData] = useState(
    JSON.parse(window.localStorage.getItem("todoList")) || initState
  );

  const setData = (data) => {
    setTodoAppData(data);
    window.localStorage.setItem("todoList", JSON.stringify(data));
  };

  const inputHandler = (val) => {
    setTodoAppData((prevState) => {
      return { ...prevState, inputTask: val };
    });
  };

  const addHandler = () => {
    if (todoAppData.inputTask !== "") {
      const addTaskData = {
        tasks: [
          ...todoAppData.tasks,
          {
            id: todoAppData.idVal,
            title: todoAppData.inputTask.trim(),
            isUpdated: false,
            created: new Date(),
          },
        ],
        inputTask: "",
        idVal: todoAppData.idVal + 1,
        updation: false,
        updateId: 0,
      };
      setData(addTaskData);
    } else {
      alert("Please enter the task name and then add!");
    }
  };

  const deleteTaskHandler = (id) => {
    const deletedTodoData = {
      tasks: todoAppData.tasks.filter((task) => task.id != id),
      inputTask: todoAppData.inputTask,
      idVal: todoAppData.idVal,
      updation: todoAppData.updation,
      updateId: todoAppData.updateId,
    };
    setData(deletedTodoData);
  };

  const editHandler = (id) => {
    const editTodoData = {
      tasks: todoAppData.tasks,
      inputTask: todoAppData.tasks.filter((task) => task.id == id)[0]["title"],
      idVal: todoAppData.idVal,
      updation: true,
      updateId: id,
    };
    setData(editTodoData);
    navigate("/update");
  };

  const validateDate = (date) => {
    return new Date(date).getDate() < new Date().getDate() ? true : false;
  };

  const todoInput = {
    onFieldChange: inputHandler,
    className: "inputField",
    onAddClick: addHandler,
    btnValue: "Add",
    btnClass: "taskAddBtn",
    formClsName: "inputAlign",
  };

  return (
    <div>
      <div className="inputContainer">
        <h1 className="header">TODO LIST</h1>
        <div className="inputWrapper">
          <Form formData={todoInput} fieldVal={todoAppData.inputTask} />
        </div>
      </div>
      <div className="tasksContainer">
        {todoAppData.tasks
          .filter((task) => task.title.includes(todoAppData.inputTask))
          .map((val) =>
            validateDate(val.created) ? (
              ""
            ) : (
              <Task
                key={val.id}
                taskName={val.title}
                idValue={val.id}
                didUpdated={val.isUpdated}
                onUpdate={editHandler}
                onDelete={deleteTaskHandler}
              />
            )
          )}
      </div>
    </div>
  );
};

export default Home;
