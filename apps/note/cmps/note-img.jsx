const { Fragment } = React

export function NoteImg({ note }) {
    const { title, url } = note.info

    return <Fragment>
        <header className="note-header">
            <h1>{title}</h1>
        </header>
        <img src={url} alt={title} />
    </Fragment>
}