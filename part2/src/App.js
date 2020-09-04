import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

function App(props) {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  // 添加状态 用于同步显哪些便签
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('一些错误将在这里展示……')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)


  // addNote to sever
  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      data: new Date().toISOString(),
      important: Math.random() < .5,
      id: notes.length + 1
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        // 添加输入的值
        setNotes(notes.concat(returnedNote))
        // 清空输入框
        setNewNote('')
      })

  }

  // change value handle
  const handleNoteChange = (event) => {
    // 得到输入的值 更新状态
    setNewNote(event.target.value)
  }

// toggle importance
const toggleImportanceOf = (id)=>{
  const note = notes.find( ele => ele.id === id )
  const changeNote = {...note, important: !note.important}

  noteService 
    .update(id, changeNote)
    .then(returnedNote => {
      const newObject = notes.map(note => note.id !== id ? note : returnedNote)
      setNotes(newObject)
    })
    .catch(error => {
      setErrorMessage( `这个便签 ${note.content}已经从服务器中删除`)
      // alert(
      //   `这个便签 ${note.content}已经从服务器中删除 `
      // )
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })

}

// delete note
const deleteNoteOf = (id) =>{
  const r = window.confirm('删除这个便签')
  if(!r) return;
  const note = notes.find(ele=> ele.id  === id)
  noteService
  .del(id)
  .then(response => {
    console.log('del', id)
    setNotes(notes.filter(n => n.id !== id))
  })
  .catch(error => {
    setErrorMessage(`${note.content} 删除失败`)
    // alert(  `这个便签服务器中删除失败` )
    setTimeout(()=>{
      setErrorMessage(null)
    }, 5000)
    setNotes(notes.filter(n => n.id !== id))
  })
  
}
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}></Notification>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow && notesToShow.map((note) =>
          <Note key={note.id} note={note} toggleImportance={() => {
            toggleImportanceOf(note.id)
          }}  deleteNote={deleteNoteOf.bind(this, note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        ></input>
        <button type="submit">save</button>
      </form>

      <Footer></Footer>
    </div>
  );
}

export default App;
