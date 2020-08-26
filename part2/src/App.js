import React, { useState } from 'react';
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import FiterName from './components/FiterName'

const App = ()=>{
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNum, setnewNum] = useState('')

  const [showFilter, setShowFilter] = useState([])
  const [showName, setShowName] = useState('')

// 检验是否重名
const checkName = () => {
  // 使用try catch 可以终止forEach继续遍历
  try{
    persons.forEach( ele =>{
      if(ele.name === newName) {
        alert(`${newName} 重名了，请修改名称`)
        throw Error();
      }else if(newName.trim() === ''){
        alert(`请输入`)
        throw Error();
      }
    })
  } catch(e){
    return true;
  }
}

// 表单提交的处理函数
const addPhonebook = (event) => {
  // 阻止提交表单时表单默认刷新页面
  event.preventDefault()
  if(checkName()) {
    return;
  }else{
    persons.push({name: newName, number: newNum})
    setPersons(persons)
    console.log('persons', persons)
    setNewName('')
    setnewNum('')
  }
}

  // 处理输入框输入名字的函数
const handleNameChange = (event)=> {
  // console.log(event.target.value)
  setNewName(event.target.value)
}
// 处理输入框输入号码的函数
const handleNumChange = (event) => {
  console.log(event.target.value)
  setnewNum(event.target.value)
}

// 过滤函数
const fiterName = (event)=>{
  console.log(event.target.value)
  setShowName(event.target.value)
  let temp
  setTimeout(()=>{
      temp = persons.filter(item => {
        return item.name.toLowerCase().indexOf(showName.toLowerCase()+'') !== -1
       })
      setShowFilter(temp)
      console.log(temp)
  },800)

}

  return(
    <div>
      <h2>Phonebook</h2>
      <FiterName handleFiter={fiterName}></FiterName>
      <h3>Add a new</h3>
      <PersonForm
        addPhonebook={addPhonebook}
        handleName={handleNameChange}
        handleNum={handleNumChange}
        newName = {newName}
        newNum = {newNum}
      ></PersonForm>
      <h3>Numbers</h3>
      <ul>
        <Persons persons={(showName === '') ?persons : showFilter}></Persons>
      </ul>
    </div>
  )
}



export default App;
