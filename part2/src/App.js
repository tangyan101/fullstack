import React, { useState } from 'react'
import Note from './components/Note'

function App(props) {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  // 添加状态 用于同步显哪些便签
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll 
  ? notes 
  : notes.filter(note => note.important)


  // addNote handle
  const addNote =  (event) => {
    event.preventDefault()
    console.log('button clicked', event.target) 
    const noteObject = {
      content: newNote,
      data: new Date().toISOString(),
      important: Math.random() < .5,
      id: notes.length + 1
    }

    // 添加输入的值
    setNotes(notes.concat(noteObject))
    // 清空输入框
    setNewNote('')
  }

  // change value handle
  const handleNoteChange = (event)=>{
    console.log(event.target.value)
    // 得到输入的值 更新状态
    setNewNote(event.target.value)
  }



  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        ></input>
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default App;
