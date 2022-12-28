import { DynamicCmp } from "./dynamic-note.jsx";

export function NotePreview({ note, onDeleteNote }) {

    return <article className="note">
        <DynamicCmp note={note}
            type={note.type} />
        <div className="btn-controls">
            <button className="btn-delete" onClick={() => onDeleteNote(note.id)}>
                <span className="material-symbols-outlined">
                    delete
                </span>
            </button>
            <button></button>
        </div>
    </article>
}