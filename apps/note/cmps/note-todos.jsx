export function NoteTodos({ note }) {

    return <div>
        {
            note.info.todos.map((todo =>
                <p key={note.id + todo.txt}>
                    {todo.txt}
                </p>
            ))
        }
    </div>
}