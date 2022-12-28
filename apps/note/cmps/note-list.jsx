const { Fragment } = React

import { NotePreview } from "./note-preview.jsx";

export function NoteList({ notes, onDeleteNote, saveNote }) {

    return <Fragment>
        {
            notes.map(note => <NotePreview
                key={note.id}
                note={note}
                onDeleteNote={onDeleteNote}
                saveNote={saveNote}
            />)
        }
    </Fragment>
}
