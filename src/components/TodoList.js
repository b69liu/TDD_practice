import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, removeHandler, updateTodo }) => (
<div>
    {todos.map((t,i)=> (
        <TodoItem key={i} todo={t} removeHandler={removeHandler} updateTodo={updateTodo} />
    ))}
</div>
);

export default TodoList;