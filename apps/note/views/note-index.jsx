const { useState, useEffect } = React

import { AddNote } from "../cmps/add-note.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NotePreview } from "../cmps/note-preview.jsx"

import { noteService } from "../services/note.service.js"

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        console.log('loadload');
        noteService.query()
            .then(setNotes)
    }

    function onDeleteNote(noteId) {
        noteService.remove(noteId)
            .then(loadNotes)
    }

    function onSaveNote(note) {
        noteService.save(note)
            .then(loadNotes)
    }

    return <div className="note-app">
        <header>
            <AddNote onAddNewNote={onSaveNote} />
        </header>
        <main className="note-list">
            <NoteList notes={notes} onDeleteNote={onDeleteNote} saveNote={onSaveNote} />
        </main>
    </div>


}
