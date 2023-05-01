import React, { useState } from 'react';

export type Todo = {
  id: number;
  title: string;
  complete: boolean;
};

type Update = (todo: Todo) => void;
type Delete = (id: number) => void;

const buttonStyle = {
  marginLeft: '5px',
};

const TodoItem = ({
  todo,
  updateTodo,
  deleteTodo,
}: {
  todo: Todo;
  updateTodo: Update;
  deleteTodo: Delete;
}) => {
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [complete, setComplete] = useState(todo.complete);

  const handleUpdate = () => {
    updateTodo({ ...todo, title, complete });
    setEditable(false);
  };

  const handleUpdateOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleUpdate();
    }
  };

  const handleCheck = () => {
    updateTodo({ ...todo, title, complete: !complete });
    setComplete(complete => !complete);
  };

  const todoItem = !editable ? (
    <span style={complete ? { textDecoration: 'line-through' } : {}}>
      {title}
    </span>
  ) : (
    <input
      type="text"
      name="title"
      onChange={e => setTitle(e.target.value)}
      value={title}
      onKeyDown={handleUpdateOnKeyDown}
    />
  );

  return (
    <div style={{ marginTop: '5px' }}>
      {todoItem}

      {!complete && (
        <button onClick={() => setEditable(!editable)} style={buttonStyle}>
          {editable ? 'cancel' : 'edit'}
        </button>
      )}

      {editable ? (
        <button onClick={handleUpdate} style={buttonStyle}>
          save
        </button>
      ) : (
        <>
          {!complete && (
            <button onClick={() => deleteTodo(todo.id)} style={buttonStyle}>
              delete
            </button>
          )}

          <label>
            <input
              type="checkbox"
              name="complete"
              checked={complete}
              onChange={handleCheck}
            />
            {!complete ? 'incomplete' : 'complete'}
          </label>
        </>
      )}
    </div>
  );
};

export default TodoItem;
