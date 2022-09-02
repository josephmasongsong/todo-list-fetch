import { useState } from 'react';

const Form = ({ addTodo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = e => {
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
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input type="submit" value="add todo" />
    </form>
  );
};

export default Form;
