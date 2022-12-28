const { useRef } = React

import { utilService } from "../../../services/util.service.js"

export function NoteTxt({ note, isDetail = true , saveNote}) {
    const currNote = useRef(note)
    const changeDebounce = useRef(utilService.debounce(saveNote))

    function handleChange({currentTarget}) {
        let { textContent } = currentTarget
        currNote.current.info.txt = textContent
        changeDebounce.current(currNote.current)
    }

    // if (!isDetail) return <div>{note.info.txt}</div>
    return <div
        className={isDetail && 'editable'}
        // type='text'
        role="textbox"
        multiline="true"
        contentEditable={isDetail}
        spellCheck="true"
        onInput={handleChange}
        suppressContentEditableWarning={true}
    >
        {note.info.txt}
    </div>
}