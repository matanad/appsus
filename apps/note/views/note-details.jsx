const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { NotePreview } from "../cmps/note-preview.jsx"

import { eventBusService, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"

export function NoteDetails({ }) {
    const { noteId } = useParams()
    const [note, setNote] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        noteService.get(noteId)
            .then(setNote)
            .catch(onClose)
    }, [])

    function onClose() {
        setNote({})
        navigate('/note')
    }

    function onSaveNote(note, isSuccMsgOn = true) {
        console.log('saving:')
        noteService.save(note)
            .then(() => {
                isSuccMsgOn && showSuccessMsg('Note saved.')
                eventBusService.emit('loadNotes')
                setNote(note)
            })
            .catch(err => {
                showErrorMsg("Somthing went wrong")
                console.log(`Save note failed. error: ${err} note: ${note}`)
            })
    }

    function onDeleteNote({ currentTarget }, noteId) {
        currentTarget.disabled = true
        noteService.remove(noteId)
            .then(() => {
                showSuccessMsg('Note deleted.')
                eventBusService.emit('loadNotes')
                onClose()
            })
            .catch(err => {
                showErrorMsg("Somthing went wrong")
                console.log(`Save note failed. error: ${err} note: ${note}`)
            })
    }

    return <div onClick={onClose} className="screen">
        <div className="note-details">
            <div className="note-content">
                <NotePreview note={note}
                 onDeleteNote={onDeleteNote}
                  saveNote={onSaveNote}
                   isDetailed={true} 
                   onClose={onClose}
                   />
            </div>
        </div>
    </div>
}