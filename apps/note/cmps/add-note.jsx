const { useRef, useEffect, useState } = React

import { noteService } from "../services/note.service.js"
import { CreateTodo } from "./create-todo.jsx"

export function AddNote({ onAddNewNote }) {
    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    const [noteType, setNoteType] = useState('note-txt')
    const elInput = useRef(null)


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

    function onNoteType(type) {
        if (type === noteType) setNoteType('note-txt')
        else setNoteType(type)
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
            <button className="btn btn-submit">Submit</button>
            <button className="btn btn-todos" type="button" onClick={() => onNoteType('note-todos')}>
                <span className="material-symbols-outlined" onClick={() => onNoteType('note-todos')}>
                    check_box
                </span>
            </button>
            <button className="btn btn-img" type="button" onClick={() => onNoteType('note-img')}>
                <span className="material-symbols-outlined">
                    image
                </span>
            </button>
        </form>
    </section>
}