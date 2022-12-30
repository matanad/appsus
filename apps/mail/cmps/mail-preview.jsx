const { useState, useEffect, useRef } = React
const { Fragment } = React
const { Link , useParams} = ReactRouterDOM
//js
import { mailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"
//jsx
import { LongTxt } from "./long-txt.jsx"

export function MailPreview({ mail, onMoveToTrash}) {

    const prevFilterType = useRef('')
    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter())
    const {folderName} = useParams()

    const isReadClass = mail.isRead ? 'mail-is-read' : 'mail-un-read'

    return <Fragment>
        {/* From */}
        <td><Link to={`/mail/${folderName + '/' + mail.id}`}><h4>{mail.fullName}</h4></Link></td>

        {/* Subject */}
        <td className="subject-td"><Link to={`/mail/${folderName + '/' + mail.id}`}><h4>{mail.subject}</h4></Link></td>

        {/* Body */}
        <td className="body-td"><Link to={`/mail/${folderName + '/' + mail.id}`}><LongTxt txt={mail.body} length={50} /></Link></td>

        {/* Trash btn */}
        <td className="trash-td"><button className="trash-btn" onClick={() => onMoveToTrash(mail)}><span className="material-symbols-outlined">delete</span></button></td>

        {/* Date */}
        <td className="mail-date"><Link to={`/mail/${folderName + '/' + mail.id}`}><h4>{mailService.getDate(mail.sentAt)}</h4></Link></td>

        {/* {mail.isRead && <td><Link to={`/mail/${mail.id}`}><h4>Mail Read</h4></Link></td>}
        {!mail.isRead && <td><Link to={`/mail/${mail.id}`}><h4>Mail Unread</h4></Link></td>} */}
    </Fragment>
}