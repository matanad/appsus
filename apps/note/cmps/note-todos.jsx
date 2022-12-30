const { Fragment } = React

export function NoteTodos({ note, saveNote }) {
    const { todos, label } = note.info

    function toggleIsDone(idx) {
        todos[idx].doneAt = !todos[idx].doneAt ? Date.now() : null
        saveNote(note, false)
    }

    return <Fragment>
        <header className="note-header">
            <h1>{label}</h1>
        </header>
        {
            todos.map(((todo, idx) =>
                <p className={`todo ${todo.doneAt && 'done'}`}
                    onClick={() => toggleIsDone(idx)}
                    key={note.id + todo.txt}>
                    {todo.txt}
                </p>
            ))
        }
    </Fragment>
}