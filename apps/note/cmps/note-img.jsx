const {Fragment} = React

export function NoteImg({note}){
    const {title, url} = note.info

    return <Fragment>
        <h1>{title}</h1>
        <img src={url} alt={title} />
    </Fragment>
}