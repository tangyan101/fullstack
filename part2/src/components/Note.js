import React from 'react'

const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important
    ? 'make not important' : 'make important';

  const classStyleBtn = {
    padding: '3px 5px',
    lineHeight: 1,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    border: '1px solid #999'
  }
  const classStyleLi = {
    padding: '6px'
  }
  return (
  <li style={classStyleLi} className='note'>
    {note.content} 
    <button style={classStyleBtn} onClick={toggleImportance}>{label}</button>
    <button onClick={deleteNote}>delete</button>
  </li>
  )
}

export default Note
