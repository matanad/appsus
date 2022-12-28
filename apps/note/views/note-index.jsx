import { NotePreview } from "../cmps/note-preview.jsx"
import { noteService } from "../services/note.service.js"

export function NoteIndex() {

    return <main>
        <div>note app</div>
        <NotePreview />
    </main>
}
