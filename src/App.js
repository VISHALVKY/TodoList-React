import './App.css'; 
import { useEffect, useState } from 'react';

function App() {
  const [todolist, setTodolist] = useState(JSON.parse(localStorage.getItem('todolist')) || []);
  const [list, setList] = useState('');

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(todolist));
  }, [todolist]);

  const addtodo = (event) => {
    event.preventDefault();
    if (!list.trim()) {
      alert("Please add your list");
      return;
    }
    setTodolist(val => [...val, { task: list, completed: false }]);
    setList('');
  };

  const deletetodo = (name) => {
    setTodolist(val => val.filter(el => el.task !== name));
  };

  const completetodo = (name) => {
    setTodolist(todolist.map(el => {
      if (el.task === name) {
        return {
          ...el,
          completed: !el.completed
        };
      }
      return el;
    }));
  };

  return (
    <div className="App">
      <h1>TODO-LIST</h1>
      <form onSubmit={addtodo}>
        <input
          type='text'
          value={list}
          onChange={(event) => setList(event.target.value)}
        />
        <button type='submit'>add todo</button>
      </form>
      <ul>
        {todolist?.map((el, ind) => (
          <div key={ind} className={el.completed ? 'completed' : ''}>
            <span>{el.task}</span>
            <button onClick={(event) => {
              event.preventDefault();
              deletetodo(el.task);
            }} className="delete">
              delete
            </button>
            <button className="complete" onClick={(event) => {
              event.preventDefault();
              completetodo(el.task);
            }}>
              {el.completed ? 'undo' : 'complete'}
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
