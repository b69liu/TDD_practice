import React, { useState, useEffect, useCallback } from 'react';
import TodoList from './components/TodoList'
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');
  const [saving, setSaving] = useState(false);

  const onChange = useCallback((e)=>{
    const value = e.target.value;
    setNewTodo(value);
  }, [])

  const addTodo= useCallback((e)=>{
    e.preventDefault();
    const value = {
      userId: 3,
      id: Math.floor(Math.random() * 10000) + 1,
      title: newTodo,
      completed: false,
    };

    setSaving(true);
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((result)=>{
      setTodos(todos.concat({...result, id:value.id}));
      setSaving(false);
    });
  }, [todos, newTodo]);

  const removeTodo = useCallback((id)=>{
    setTodos(todos.filter((t) => t.id != id ));
  }, [todos]);


  const updateTodo = useCallback((id)=>{
    const newList = todos.map((todoItem) => {
      if ( todoItem.id === id){
        const updateItem = {...todoItem, completed: !todoItem.completed };
        return updateItem;
      }
      return todoItem;
    })
    setTodos(newList);
  }, [todos])


  useEffect(() => {
    async function fetchData(){
      let result = await fetch('https://jsonplaceholder.typicode.com/todos')
      result = await result.json();
      setTodos(result.slice(0,5));
      setLoading(false);
    };
    fetchData();
  },[]);
  
  return (
    <div className="App">
      <h1 className="header">My todo list</h1>
      {loading ? 'Loading' : <TodoList todos={todos} removeHandler={removeTodo} updateTodo={updateTodo} />}

      <div className='add-todo-form'>
        {saving ? 'Saving' : (
          <form onSubmit={addTodo}>
            <input type="text" onChange={onChange} />
            <button type="submit">Add new todo</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
