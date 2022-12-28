const { useRef, useEffect, useState } = React

import { noteService } from "../services/note.service.js"

export function AddNote({ onAddNewNote }) {
    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    const noteType = useRef('note-txt')
    const elInput = useRef(null)


    function handleChange({ target }) {
        elInput.current = target
        let { value, name: field } = target
        newNote.type = noteType.current
        newNote.info[field] = value
        setNewNote(() => ({ ...newNote }))
    }

    function onSubmitNote(ev) {
        ev.preventDefault()
        console.log(elInput.current);
        elInput.current.value = ''
        setNewNote(() => noteService.getEmptyNote())
        // update father cmp that filters change on submit
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
            {noteType.current === 'note-txt' && <input
                onChange={handleChange}
                name="txt"
                type="text"
                placeholder="Take a note..."
            />}
            <button>Submit</button>
            <button className="btn-todos" type="button" onClick={() => setNoteTpye('note-todos')}>
                <span className="material-symbols-outlined">
                    check_box
                </span>
            </button>
        </form>
    </section>
}