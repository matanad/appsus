const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { AddNote } from "../cmps/add-note.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { UserMsg } from "../../../cmps/user-msg.jsx"


import { noteService } from "../services/note.service.js"
import { NoteDetails } from "./note-details.jsx"

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const {noteId} = useParams()

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then((notes)=>{
                console.log('notes:', notes)
                setNotes(notes)}
                )
            .catch(err => console.log('err:', err))
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
        {noteId && <NoteDetails/>}
        <header>
            <AddNote onAddNewNote={onSaveNote} />
        </header>
        <div className="notes-container">
            <div className="note-list-holder">
            <h2>Other Notes</h2>
                <main className="note-list">
                    <NoteList notes={notes} onDeleteNote={onDeleteNote} saveNote={onSaveNote} />
                </main>
            </div>
        </div>
        <UserMsg />
    </div>


}
