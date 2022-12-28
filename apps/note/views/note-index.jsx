const { useState, useEffect } = React

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

    return <main>
        <div>note app</div>
        {notes.map(note => <NotePreview 
        key={note.id}
        note={note} 
        onDeleteNote={onDeleteNote}
        />)}
    </main>
}
