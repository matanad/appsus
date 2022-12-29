const { useRef, useEffect, useState } = React

import { noteService } from "../services/note.service.js"
import { CreateTodo } from "./create-todo.jsx"

export function AddNote({ onAddNewNote }) {
    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    const [noteType, setNoteType] = useState('note-txt')
    const elInput = useRef(null)
    console.log('render render');


    function handleChange({ target }) {
        elInput.current = target
        let { value, name: field } = target
        console.log('field:', field)
        setNewNote((prevNewNote) => ({
            ...prevNewNote,
            type: noteType,
            info: { [field]: value }
        }))
    }

    function onSubmitNote(ev) {
        ev.preventDefault()
        elInput.current.value = ''
        setNewNote(() => noteService.getEmptyNote())
        // update father cmp that filters change on submit
        setNoteType('note-txt')
        onAddNewNote(newNote)
    }

    return <section className="add-note" >
        <form onSubmit={onSubmitNote}>
            {noteType === 'note-txt' && <input
                onChange={handleChange}
                name="txt"
                type="text"
                placeholder="Take a note..."
            />}
            {noteType === 'note-todos' && <CreateTodo
                handleChange={handleChange}
                getEmptyTodo={noteService.getEmptyTodo}
                setNewNote={setNewNote}
            />}
             {noteType === 'note-img' && <input
                onChange={handleChange}
                name="url"
                type="text"
                placeholder="Enter a url..."
            />}
            <button>Submit</button>
            <button className="btn-todos" type="button" onClick={() => setNoteType('note-todos')}>
                <span className="material-symbols-outlined" onClick={() => setNoteType('note-todos')}>
                    check_box
                </span>
            </button>
            <button className="btn-img" type="button" onClick={() => setNoteType('note-img')}>
                <span class="material-symbols-outlined">
                    image
                </span>
            </button>
        </form>
    </section>
}