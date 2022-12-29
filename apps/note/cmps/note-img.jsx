const { Fragment } = React

export function NoteImg({ note }) {
    const { title, url } = note.info

    return <Fragment>
        <header className="note-img-header">
            <img src={url} alt={title} />
        </header>
        {title && <h1>{title}</h1>}
    </Fragment>
}