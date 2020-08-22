import React, { useState } from 'react'

const App = ()=>{
  const [persons, setPersons] = useState([
    {name: 'xiao A'}
  ])
  const [newName, setNewName] = useState('')

// 表单提交的处理函数
const addPhonebook = (event) => {
  // 阻止提交表单时表单默认刷新页面
  event.preventDefault()
  persons.push({name: newName})
  setPersons(persons)
  console.log('persons', persons)
  setNewName('')
}

  // 处理输入框输入值的函数
const handleNameChange = (event)=> {
  // console.log(event.target.value)
  setNewName(event.target.value)
}

  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPhonebook}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          ></input>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((item, i)=>{
          return <li key={i}>{item.name}</li>
        })}
      </ul>
    </div>
  )
}



export default App;
