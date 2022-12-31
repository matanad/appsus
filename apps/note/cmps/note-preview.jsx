const { useState } = React
const { useNavigate } = ReactRouterDOM

import { ColorPalet } from "./color-palet.jsx";
import { DynamicCmp } from "./dynamic-note.jsx";

export function NotePreview({ note, onDeleteNote, saveNote }) {
    const [isPalletOpen, setIsPalletOpen] = useState(false)
    const [classColor, setClassColor] = useState(note.color)
    const navigate = useNavigate()

    function onSetColor(color) {

        setClassColor(color)
        note.color = color
        saveNote(note)
    }

    function getColorClass() {
        return classColor
    }

    function onPalletClick(ev){
        ev.stopPropagation()
        setIsPalletOpen(revValue => !revValue)
    }

    function onNoteClick(noteId){

    }

    return <article className={`note ${getColorClass()}`} onClick={((ev) => ev.stopPropagation())}>
        <DynamicCmp note={note}
            type={note.type}
            saveNote={saveNote} />
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
        </div>
        {isPalletOpen && <ColorPalet onSetColor={onSetColor} />}
    </article >
}