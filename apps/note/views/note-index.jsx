const { useState, useEffect } = React

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { AddNote } from "../cmps/add-note.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { UserMsg } from "../../../cmps/user-msg.jsx"


import { noteService } from "../services/note.service.js"

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(setNotes)
    }

    function onDeleteNote({ currentTarget }, noteId) {
        currentTarget.disabled = true
        noteService.remove(noteId)
            .then(() => {
                showSuccessMsg('Note deleted.')
                loadNotes()
            })
            .catch(err => {
                showErrorMsg("Somthing went wrong")
                console.log(`Save note failed. error: ${err} note: ${note}`)
            })
    }

    function onSaveNote(note, isSuccMsgOn = true) {
        noteService.save(note)
            .then(() => {
                isSuccMsgOn && showSuccessMsg('Note saved.')
                loadNotes()
            })
            .catch(err => {
                showErrorMsg("Somthing went wrong")
                console.log(`Save note failed. error: ${err} note: ${note}`)
            })
    }

    return <div className="note-app">
        <header>
            <AddNote onAddNewNote={onSaveNote} />
        </header>
        <div className="notes-container">
            <h2>OTHER</h2>
            <div className="note-list-holder">
                <main className="note-list">
                    <NoteList notes={notes} onDeleteNote={onDeleteNote} saveNote={onSaveNote} />
                </main>
            </div>
        </div>
        <UserMsg />
    </div>


}
