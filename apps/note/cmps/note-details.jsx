const { useState } = React

import { ColorPalet } from "./color-palet.jsx"
import { DynamicCmp } from "./dynamic-note.jsx"

export function NoteDetails({ note, getColorClass, onDeleteNote, }) {
    const [isPalletOpen, setIsPalletOpen] = useState(false)
    const [classColor, setClassColor] = useState(note.color)

    function onSetColor(color) {
        setClassColor(color)
        note.color = color
        saveNote(note)
    }

    return <article className={`note ${getColorClass()}`}>
        <DynamicCmp note={note}
            type={note.type} 
            isDetail={true}/>
        <div className="btn-controls">
            <button className="btn-delete" onClick={() => onDeleteNote(note.id)}>
                <span className="material-symbols-outlined">
                    delete
                </span>
            </button>
            <button onClick={() => setIsPalletOpen(revValue => !revValue)}>
                <span className="material-symbols-outlined">
                    palette
                </span>
            </button>
            {isPalletOpen && <ColorPalet onSetColor={onSetColor} />}
        </div>
    </article>
}