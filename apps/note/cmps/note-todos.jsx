const { Fragment, useState, useEffect } = React

export function NoteTodos({ note, saveNote, isDetailed = false }) {
    const { label } = note.info
    const [todos, setTodos] = useState(note.info.todos)

    function toggleIsDone(idx) {
        if (isDetailed) return
        todos[idx].doneAt = !todos[idx].doneAt ? Date.now() : null
        saveNote(note, false)
    }

    function onAddLine(){
        setTodos([...todos, ''])
        saveNote({ ...note, info: { label, todos } })
    }

    function handleChange() {

    }

    return <Fragment>
        <header className="note-header">
            <div contentEditable={isDetailed}
                suppressContentEditableWarning={true}
            >
                <h1>{label}</h1>
            </div>

        </header>
        {
            todos.map(((todo, idx) =>
                <div className="todo" key={note.id + idx}>
                    <div className={`todo ${todo.doneAt ? 'done' : ''}`}
                        onClick={() => toggleIsDone(ev, idx)}

                        contentEditable={isDetailed}
                        suppressContentEditableWarning={true}
                        onInput={handleChange}
                    >
                        {todo.txt || ' '}

                    </div>
                    {idx === todos.length - 1 && <button className="btn" onClick={onAddLine}>
                        <span contentEditable={false} className="material-symbols-outlined">
                            add
                        </span>
                    </button>}
                </div>
            ))
        }

    </Fragment>
}