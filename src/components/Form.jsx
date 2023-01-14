import { useEffect } from 'react';
import {v4 as uuidv4} from 'uuid'

function Form({input , setInput , todos , setTodos , editTodo , setEditTodo}) {

  function onInputChange(e) {
    setInput(e.target.value);
  };

  function onFormSubmit(e){
    e.preventDefault();
      if(!editTodo){
      
      setTodos([...todos,
      {title:input , 
      id:uuidv4() , 
      completed:false}]);
    
      setInput("");
    } 
    else {
      updateTodo(input, editTodo.id , editTodo.completed)
    }
  }
  const updateTodo = (title , id , completed) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? {title , id , completed} : todo
  )
  setTodos(newTodo)
  setEditTodo("")
}

 useEffect(() => {
  if(editTodo){
    setInput(editTodo.title)
  } 
  else {
    setInput("")
  }
},[setInput , setEditTodo])

  return (
    <form onSubmit={onFormSubmit}>
        <input 
        type='text' 
        placeholder='Enter a todo...' 
        className='task-input'
        value = {input} required
        onChange = {onInputChange} />

        <button type='submit' className='btn-add'>
        {editTodo ? "OK" : "Add"}
        </button>
    </form>
  )
}
Form.displayName = 'Form';
export default Form