const { Fragment } = React

export function NoteTodos({ note }) {
    const { todos, label } = note.info

    return <Fragment>
        <header className="note-header">
            <h1>{label}</h1>
        </header>
        {
            todos.map((todo =>
                <p key={note.id + todo.txt}>
                    {todo.txt}
                </p>
            ))
        }
    </Fragment>
}