import React, { useState } from "react";
import './styles.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditIndex, setIsEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const startEdit = (index) => {
    setIsEditIndex(index);
    setEditText(todos[index].text);
  };

  const saveEdit = (index) => {
    if (editText.trim() !== "") {
      const newTodos = [...todos];
      newTodos[index].text = editText;
      setTodos(newTodos);
      setIsEditIndex(-1);
      setEditText("");
    } else {
      alert("Please enter a valid task.");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="todo-list" style={{ margin: 24, padding: 24, border: "3px solid #ccc", width: 500 }}>
      <h2>Todo List</h2>
      <div className="input-group">
        <input
          type="text"
          className="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nội dung công việc..."
          autoComplete="off"
        />
        <button className="button--submit" onClick={addTodo}>Thêm</button>
      </div>
      <ul>
        {todos.map((todo, index) => {
          const isEdit = isEditIndex === index;
          return (
            <li key={index} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <input
                    onClick={() => toggleTodo(index)}
                    type="checkbox"
                    checked={todo.completed}
                  />
                </div>
                {!isEdit ? (
                  <div>{todo.text}</div>
                ) : (
                  <input
                    className="input"
                    onChange={(e) => setEditText(e.target.value)}
                    value={editText}
                  />
                )}
                <div>
                  <button onClick={() => {
                    if (isEdit) {
                      saveEdit(index);
                    } else {
                      startEdit(index);
                    }
                  }}>
                    {isEdit ? "Lưu lại" : "Chỉnh sửa"}
                  </button>
                  <button onClick={() => deleteTodo(index)}>Xóa</button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
