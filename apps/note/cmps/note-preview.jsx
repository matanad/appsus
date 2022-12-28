const { useState } = React

import { DynamicCmp } from "./dynamic-note.jsx";

export function NotePreview({ note, onDeleteNote , saveNote}) {
    const [isPalletOpen, setIsPalletOpen] = useState(false)
    const [classColor, setClassColor] = useState(note.color)

    function onSetColor(color){
        setClassColor(color)
        note.color = color
        saveNote(note)
    }

    function getColorClass(){
        return classColor
    }

    return <article className={`note ${getColorClass()}`}>
        <DynamicCmp note={note}
            type={note.type} />
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
            {isPalletOpen && <div className="btns-color-container">
                <button className="btn-red" onClick={()=> {onSetColor('red')}}>
                    <span className="material-symbols-outlined">
                        circle
                    </span>
                </button>
                <button className="btn-blue" onClick={()=> {onSetColor('blue')}}>
                    <span className="material-symbols-outlined">
                        circle
                    </span>
                </button>
                <button className="btn-yellow" onClick={()=> {onSetColor('yellow')}}>
                    <span className="material-symbols-outlined">
                        circle
                    </span>
                </button>
                <button className="btn-purple" onClick={()=> {onSetColor('purple')}}>
                    <span className="material-symbols-outlined">
                        circle
                    </span>
                </button>
            </div>}
        </div>
    </article>
}