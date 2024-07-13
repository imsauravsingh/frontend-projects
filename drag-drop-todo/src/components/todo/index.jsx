import { Draggable } from "react-beautiful-dnd";
import "./index.css";

const Todo = ({ item = {}, index = 0, addClass }) => {
  console.log({ item, index });
  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`todo ${snapshot?.isDragging ? "drag" : ""} ${addClass}`}
        >
          {item?.todo}
        </div>
      )}
    </Draggable>
  );
};

export default Todo;
