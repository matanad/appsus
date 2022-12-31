const { useRef, Fragment } = React

import { utilService } from "../../../services/util.service.js"

export function NoteTxt({ note, isDetailed = false, saveNote }) {
    const currNote = useRef(note)
    const { txt, title } = note
    const changeDebounce = useRef(utilService.debounce(saveNote))

    function handleChange({ currentTarget, target }) {
        let { textContent } = currentTarget
        const { id: field } = target
        currNote.current.info[field] = textContent
        changeDebounce.current(currNote.current)
    }

    // if (!isDetail) return <div>{note.info.txt}</div>
    return <Fragment>
        <div
            className={`note-txt-title ${isDetailed ? 'editable' : ''}`}
            role="textbox"
            multiline="true"
            contentEditable={isDetailed}
            spellCheck="true"
            id="title"
            onInput={handleChange}
            suppressContentEditableWarning={true}
        >
            {note.info.title}
        </div>
        <div
            className={isDetailed ? 'editable' : ''}
            // type='text'
            role="textbox"
            multiline="true"
            contentEditable={isDetailed}
            spellCheck="true"
            id="txt"
            onInput={handleChange}
            suppressContentEditableWarning={true}
        >
            {note.info.txt}
        </div>
    </Fragment>
}