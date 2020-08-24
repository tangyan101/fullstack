import React from 'react'
import Note from './Note'

const Persons = ({persons}) => {
  return(
    <ul>
    {persons.map((item, i)=>{
      return <Note key={i} note={item}></Note>
    })}
  </ul>
  )
}

export default Persons