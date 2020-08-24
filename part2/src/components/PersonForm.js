import React from 'react'

const PersonForm = ({addPhonebook, handleName, handleNum,newName, newNum}) => {
  return (
    <form onSubmit={addPhonebook}>
    <div>
      name: <input 
        value={newName}
        onChange={handleName}
      ></input>

    </div>
    <div>
      number: <input
        value={newNum}
        onChange={handleNum}
      ></input>
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
  )
}

export default PersonForm