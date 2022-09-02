import { useState } from 'react';

const Todo = ({ todo, updateTodo, deleteTodo }) => {
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [isChecked, setIsChecked] = useState(todo.complete);

  const handleUpdate = () => {
    updateTodo({ ...todo, title });
    setEditable(false);
  };

  const handleUpdateOnKeyDown = e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleUpdate();
    }
  };

  const handleCheck = () => {
    updateTodo({ ...todo, complete: !isChecked });
    setIsChecked(!isChecked);
  };

  const todoItem = !editable ? (
    <span style={todo.complete ? { textDecoration: 'line-through' } : {}}>
      {todo.title}
    </span>
  ) : (
    <label htmlFor="title">
      <input
        type="text"
        name="title"
        onChange={e => setTitle(e.target.value)}
        value={title}
        onKeyDown={e => handleUpdateOnKeyDown(e)}
      />
    </label>
  );

  return (
    <div style={{ marginTop: '5px' }}>
      {todoItem}

      {!todo.complete && (
        <button onClick={() => setEditable(!editable)}>
          {editable ? 'cancel' : 'edit'}
        </button>
      )}

      {editable ? (
        <button onClick={handleUpdate}>save</button>
      ) : (
        <>
          {!todo.complete && (
            <button onClick={() => deleteTodo(todo.id)}>delete</button>
          )}

          <label htmlFor="complete">
            <input
              type="checkbox"
              name="complete"
              checked={isChecked}
              onChange={handleCheck}
            />
            {!todo.complete ? 'incomplete' : 'complete'}
          </label>
        </>
      )}
    </div>
  );
};

export default Todo;
