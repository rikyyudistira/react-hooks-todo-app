import React, {useState} from "react";
import "./App.css";

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button disabled={todo.isCompleted} onClick={() => completeTodo(index)} style={{marginRight: 4}}>{todo.isCompleted ? 'Completed' : 'Complete'}</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        style={{width: '80%', marginRight: 8, height: 30, padding: '2px 10px', fontSize: 16}}
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit" style={{height: 37, width: 65, marginTop: 20}}>Add</button>
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <h2 className="title">Todos</h2>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={`todo-list-${index}`}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;