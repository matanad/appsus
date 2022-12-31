const { Fragment, useState, useEffect } = React

export function NoteTodos({ note, saveNote, isDetail = true }) {
    const { label } = note.info
    const [todos, setTodos] = useState(note.info.todos)

    useEffect(() => {
        saveNote({ ...note, info: { label, todos } })
    }, [todos])

    function onTodoClick(ev, idx) {
        toggleIsDone(idx)
    }
    
    function toggleIsDone(idx){
        if (isDetail) return
        todos[idx].doneAt = !todos[idx].doneAt ? Date.now() : null
        saveNote(note, false)
    }

    function handleChange() {

    }

    return <Fragment>
        <header className="note-header">
            <div contentEditable={isDetail}
                suppressContentEditableWarning={true}
            >
                <h1>{label}</h1>
            </div>

        </header>
        {
            todos.map(((todo, idx) =>
                <div className="todo">
                    <div className={`todo ${todo.doneAt && 'done'}`}
                        onClick={() => toggleIsDone(ev, idx)}
                        key={note.id + idx}
                        contentEditable={isDetail}
                        suppressContentEditableWarning={true}
                        onInput={handleChange}
                    >
                        {todo.txt || ' '}

                    </div>
                    {idx === todos.length - 1 && <button className="btn" onClick={() => setTodos([...todos, ''])}>
                        <span contentEditable={false} class="material-symbols-outlined">
                            add
                        </span>
                    </button>}
                </div>
            ))
        }

    </Fragment>
}