import { useState, useEffect } from 'react';
import Form from './components/Form';
import Todo from './components/Todo';

function App() {
  const [todos, setTodos] = useState([]);
  const url = 'http://localhost:4000/todos/';

  useEffect(() => {
    (() => {
      fetch(url)
        .then(res => res.json())
        .then(
          data => setTodos(data),
          error => console.log(error.message)
        );
    })();
  }, []);

  const addTodo = todo => {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(todo),
    })
      .then(res => res.json())
      .then(
        data => setTodos(prevState => [...prevState, data]),
        error => console.log(error.message)
      );
  };

  const updateTodo = todo => {
    fetch(url + todo.id, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(todo),
    })
      .then(res => res.json())
      .then(
        data => setTodos(todos.map(t => (t.id === todo.id ? data : t))),
        error => console.log(error.message)
      );
  };

  const deleteTodo = id => {
    fetch(url + id, { method: 'DELETE' }).then(
      setTodos(todos.filter(t => t.id !== id)),
      error => console.log(error.message)
    );
  };

  return (
    <div>
      <h1>Todo List Fetch</h1>
      <Form addTodo={addTodo} />
      {todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

export default App;
