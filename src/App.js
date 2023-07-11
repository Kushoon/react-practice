import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [todo, setToDo] = useState("");
  const [toDoList, setToDoItems] = useState([]);

  const setToDoList = (e) => {
    e.preventDefault();
    setToDoItems([...toDoList, { id: uuidv4(), text: todo, checked: false }]);
    setToDo("");
  };

  const checkToDoItem = (id, checked) => {
    setToDoItems((toDoList) => {
      return toDoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked };
        }
        return todo;
      });
    });
  };

  const deleteTodo = (id) => {
    setToDoItems((toDoList) => {
      return toDoList.filter((todo) => todo.id !== id);
    });
  };

  return (
    <div className="App">
      <form onSubmit={setToDoList}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setToDo(e.target.value)}
        />
        <button type="submit">Add ToDo</button>
      </form>
      <ul>
        {toDoList.map((todo) => {
          const checkboxId = `checkbox_${todo.id}`;
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                id={checkboxId}
                checked={todo.checked}
                onChange={(e) => checkToDoItem(todo.id, e.target.checked)}
              />
              <label className="m-l-10" htmlFor={checkboxId}>
                {todo.text}
              </label>
              <button className="m-l-10" onClick={() => deleteTodo(todo.id)}>
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
