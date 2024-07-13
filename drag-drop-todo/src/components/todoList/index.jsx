import React from "react";
import "./index.css";
import { useState } from "react";
import Todo from "../todo";
import { Droppable } from "react-beautiful-dnd";

const TodoList = ({ list = [], completedTodos = [] }) => {
  return (
    <div className="container">
      <Droppable droppableId="ActiveList">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
          >
            <span className="todos__heading">Active Tasks</span>
            {/* Show list here */}

            {list.length
              ? list.map((val, index) => {
                  return (
                    <Todo key={val?.id.toString()} index={index} item={val} />
                  );
                })
              : null}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="CompletedList">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
          >
            <span className="todos__heading">Completed Tasks</span>

            {completedTodos.length
              ? completedTodos.map((val, index) => {
                  return <Todo key={val?.id} index={index} item={val} />;
                })
              : null}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
