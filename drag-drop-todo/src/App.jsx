import { useState } from "react";
import InputBox from "./components/inputBox/index";
import TodoList from "./components/todoList";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [input, setInput] = useState();
  const [list, setList] = useState([
    { id: 123, todo: "test", isDone: false },
    { id: 456, todo: "test2", isDone: false },
  ]);
  const [completedTodos, setCompletedTodos] = useState([
    { id: 789, todo: "completed", isDone: false },
  ]);

  const handleAdd = (val) => {
    if (val) {
      setList((pre) => [...pre, { id: Date.now(), todo: val, isDone: false }]);
      setInput("");
    }
  };

  const onDragEnd = (result) => {
    console.log({ result });
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination?.droppableId === source?.droppableId &&
      destination?.index === source?.index
    )
      return;

    let add,
      active = list,
      complete = completedTodos;

    if (source?.droppableId === "ActiveList") {
      add = active[source?.index];
      active.splice(source?.index, 1);
    } else {
      add = complete[source?.index];
      complete.splice(source?.index, 1);
    }

    if (destination?.droppableId === "ActiveList") {
      active.splice(destination?.index, 0, add);
    } else {
      complete.splice(destination?.index, 0, add);
    }
  };
  console.log({ input, list });
  return (
    <div className="app">
      <span className="heading">Todo List</span>
      <InputBox handleAdd={handleAdd} />
      <DragDropContext onDragEnd={onDragEnd}>
        <TodoList
          list={list}
          setList={setList}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </DragDropContext>
    </div>
  );
}

export default App;
