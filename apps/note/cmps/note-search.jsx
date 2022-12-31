import { eventBusService } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React

export function NoteSearch() {
    const [filterByToEdit, setFilterByToEdit] = useState(noteService.getDefaultFilter())
    const elInputRef = useRef(null)
    
    useEffect(() => {
        eventBusService.emit('loadNotes',filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field} = target
        setFilterByToEdit(prevFilter=>({...prevFilter,[field]:value}))
    }

    return <section className="note-top-filter">
        <form className="main-search">
            <input type="text"
                name="txt"
                id="subject-filter"
                placeholder="Search Note..."
                ref={elInputRef}
                value={filterByToEdit.txt}
                onChange={handleChange} />

            <select name="isRead" id="is-read-filter" type='text' onChange={handleChange}>
                <option value='txt'>All</option>
                <option value='txt'>Text</option>
                <option value='title'>Title</option>
                <option value='url'>url</option>
            </select>
        </form>
    </section>
}