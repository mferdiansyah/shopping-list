import { useState } from 'react';

import './App.css';
import shoppingIcon from './assets/shopping-icon.svg';
import plusIcon from './assets/plus-icon.svg'
import minusIcon from './assets/minus-icon.svg'

function App() {
  const [value, setValue] = useState('')
  const [todos, setTodos] = useState([
    {title: 'susu ultra', count: 1},
    {title: 'tahu sumedang', count: 1},
    {title: 'semangka', count: 1}
  ])

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!value) {
      alert('input tidak boleh kosong!')
      return
    }

    const addedTodos = [...todos, {
      title: value,
      count: 1
    }]

    setTodos(addedTodos)
    setValue('')

    console.log(value)
  }

  const handleAdditionCount = (index) => {
    const newTodos = [...todos]

    newTodos[index].count = newTodos[index].count + 1

    setTodos(newTodos)
  }

  const handleMinCount = (index) => {
    const newTodos = [...todos]

    if (newTodos[index].count > 1) {
      newTodos[index].count = newTodos[index].count - 1
    } else {
      newTodos.splice(index, 1)
    }

    setTodos(newTodos)
  }

  const getTotalCounts = () => {
    const totalCounts = todos.reduce((total, num) => {
      return total + num.count
    }, 0)

    return totalCounts
  }

  return (
   <>
    <nav className='nav'>
      <img className='nav-icon' src={shoppingIcon} alt='shopping icon'/>
      <h1 className='nav-title'>Shopping List</h1>
    </nav>

    <section className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <input 
        onChange={(e) => {setValue(e.target.value)}}
        className='input'
        type='text'
        placeholder='ketik disini...'
        />
        <button className='add-button' type='submit'>cari</button>
      </form>

      <div className='info'>
        <div className='info-total'>
          <p>{`total list: ${todos.length}`}</p>
        </div>
        <div className='info-count'>
          <p>{`total count: ${getTotalCounts()}`}</p>
        </div>
        <button onClick={() => setTodos([])} className='delete-all-button'>
          delete all list
        </button>
      </div>

      {todos.length > 0 ? (
          <div className='todos'>
            {todos.map((todo, index, arr) => {
              return (
                <div key={index} className={`todo ${!(arr.length === index + 1) && 'todo-divider'}`}>
                  {todo.title}

                  <div className='todo-icon-wrapper'>
                    <div className='todo-count'>{todo.count}</div>

                    <button onClick={() => handleAdditionCount (index)} className='todo-action-button'>
                      <img src={plusIcon} alt='plus icon'/>
                    </button>

                    <button onClick={() => handleMinCount (index)} className='todo-action-button'>
                      <img src={minusIcon} alt='minus icon'/>
                    </button>
                  </div>

                </div>
              )
            })}
          </div>
        ) : (
          <div>kosong</div>
        )}
    </section>
   </>
  );
}

export default App;
