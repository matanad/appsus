const { useState, useEffect } = React

import { AddNote } from "../cmps/add-note.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NotePreview } from "../cmps/note-preview.jsx"

import { noteService } from "../services/note.service.js"

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [notes])

    function loadNotes() {
        noteService.query()
            .then(setNotes)
    }

    function onDeleteNote(noteId) {
        noteService.remove(noteId)
            .then(loadNotes)
    }

    function onAddNewNote(note) {
        noteService.save(note)
            .then(loadNotes)
    }

    return <div className="note-app">
        <header>
            <AddNote onAddNewNote={onAddNewNote} />
        </header>
        <main className="note-list">
            <NoteList notes={notes} onDeleteNote={onDeleteNote} saveNote={onAddNewNote}/>
        </main>
    </div>


}
