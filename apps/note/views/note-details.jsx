const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { NotePreview } from "../cmps/note-preview.jsx"

import { noteService } from "../services/note.service.js"

export function NoteDetails({ }) {
    const { noteId } = useParams()
    const [note, setNote] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        noteService.get(noteId)
            .then(setNote)
    }, [])

    function onClose(){
        setNote({})
        navigate('/note')
    }

    return <div onClick={onClose} className="screen">
        <div className={`note-details`}>
            <div className="note-content">
                <NotePreview note={note} />

            <button className="btn" onClick={onClose}>Close</button>
            </div>
        </div>
    </div>
}