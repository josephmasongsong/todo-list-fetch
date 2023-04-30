import React, { useState } from 'react';
import { Todo } from './TodoItem';

type Add = (todo: Partial<Todo>) => void;

const Form = ({ addTodo }: { addTodo: Add }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo = {
      title,
      complete: false,
    };
    addTodo(todo);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
      <input type="submit" value="add todo" style={{ marginLeft: '5px' }} />
    </form>
  );
};

export default Form;
