import { useState, useEffect } from 'react';
import Form from './components/Form';
import TodoItem, { Todo } from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingTodo, setLoadingTodo] = useState(false);

  const url = 'http://localhost:1337/api/v1/todos/';

  useEffect(() => {
    setLoadingList(true);
    const controller = new AbortController();
    const fetchData = () => {
      fetch(url, { signal: controller.signal })
        .then(res => res.json())
        .then(
          data => {
            setTodos(data.todos);
            setLoadingList(false);
          },
          error => {
            console.log(error.message);
            setLoadingList(false);
          }
        );
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [url]);

  const addTodo = (todo: Partial<Todo>) => {
    setLoadingTodo(true);
    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(todo),
    })
      .then(res => res.json())
      .then(
        data => {
          setTodos(prevState => [...prevState, data]);
          setLoadingTodo(false);
        },
        error => {
          console.log(error.message);
          setLoadingTodo(false);
        }
      );
  };

  const updateTodo = (todo: Todo) => {
    fetch(url + todo._id, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(todo),
    })
      .then(res => res.json())
      .then(
        data =>
          setTodos(prevState =>
            prevState.map(t => (t._id === todo._id ? data : t))
          ),
        error => console.log(error.message)
      );
  };

  const deleteTodo = (id: number) => {
    fetch(url + id, { method: 'DELETE' }).then(
      () => {
        setTodos(prevState => prevState.filter(t => t._id !== id));
      },
      error => console.log(error.message)
    );
  };

  if (loadingList) {
    return <p>Loading todos...</p>;
  }

  return (
    <div style={{ padding: '16px' }}>
      <h1>Todo List</h1>
      <Form addTodo={addTodo} />
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
      {loadingTodo && <p>Saving todo...</p>}
    </div>
  );
}

export default App;
