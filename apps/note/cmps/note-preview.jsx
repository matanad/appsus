const { useState } = React

import { ColorPalet } from "./color-palet.jsx";
import { DynamicCmp } from "./dynamic-note.jsx";

export function NotePreview({ note, onDeleteNote, saveNote }) {
    const [isPalletOpen, setIsPalletOpen] = useState(false)
    const [classColor, setClassColor] = useState(note.color)

    function onSetColor(color) {
        setClassColor(color)
        note.color = color
        saveNote(note)
    }

    function getColorClass() {
        return classColor
    }

    return <article className={`note ${getColorClass()}`}>
        <DynamicCmp note={note}
            type={note.type}
            saveNote={saveNote} />
        <div className="btn-controls">
            <button className="btn-delete" onClick={(ev) => onDeleteNote(ev, note.id)}>
                <span className="material-symbols-outlined">
                    delete
                </span>
            </button>
            <button onClick={() => setIsPalletOpen(revValue => !revValue)}>
                <span className="material-symbols-outlined">
                    palette
                </span>
            </button>
        </div>
        {isPalletOpen && <ColorPalet onSetColor={onSetColor} />}
    </article >
}