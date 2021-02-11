import React, { useState, useEffect } from 'react'

import Note from './Note'
import Footer from './Footer'
import Notification from './Notification'
import noteService from '../services/notes'

const App = () => {
  // local state
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('') 
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  
  // data fetching
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
    })
  }, []) // empty array as dependencies parameter means only run effect after the first render of the componentl; makes sense since if the effect has no dependencies, then nothing will trigger its running again
  console.log('render', notes.length, 'notes')

  // event handlers 
  const handleNoteChange = (event) => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
  
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  } 

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null) // notification no longer displayed after 5 seconds
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  // conditional rendering
  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => 
          <Note   
            key={i} 
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote} // setting value attribute to state lets changes made to state also effect this input element; ie clearing state will clear the text input
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form> 
      <Footer /> 
    </div>
  )
}

export default App 