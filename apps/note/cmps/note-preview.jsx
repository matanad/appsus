const { useState } = React
const { useNavigate } = ReactRouterDOM

const { useEffect } = React

import { ColorPalet } from "./color-palet.jsx";
import { DynamicCmp } from "./dynamic-note.jsx";

export function NotePreview({ note, onDeleteNote, saveNote, isDetailed, onClose }) {
    const [isPalletOpen, setIsPalletOpen] = useState(false)
    const navigate = useNavigate()

    function onSetColor(color) {
        note.color = color
        saveNote(note)
    }


    function onPalletClick(ev) {
        ev.stopPropagation()
        setIsPalletOpen(revValue => !revValue)
    }

    function onNoteClick(ev, noteId) {
        ev.stopPropagation()
        if(isDetailed) return
        navigate(`/note/${noteId}`)
    }

    return <article className={`note ${note.color}`} onClick={(ev) => onNoteClick(ev, note.id)}>
        <DynamicCmp note={note}
            type={note.type}
            saveNote={saveNote}
            isDetailed={isDetailed} />
        <div className="btn-controls">
            <button className="btn btn-delete" onClick={(ev) => onDeleteNote(ev, note.id)}>
                <span className="material-symbols-outlined">
                    delete
                </span>
            </button>
            <button className="btn" onClick={onPalletClick}>
                <span className="material-symbols-outlined">
                    palette
                </span>
            </button>
            <button className="btn btn-close" onClick={onClose}>Close</button>
        </div>
        {isPalletOpen && <ColorPalet onSetColor={onSetColor} />}
    </article >
}