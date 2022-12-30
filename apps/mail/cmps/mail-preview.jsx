const { useState, useEffect, useRef } = React
const { Fragment } = React
const { Link, useParams } = ReactRouterDOM
//js
import { mailService } from "../services/mail.service.js"
//jsx
import { LongTxt } from "./long-txt.jsx"

export function MailPreview({ mail, onTrashClick, onStarClick, onEnvelopeClick }) {
    const { folderName } = useParams()
    const [isStarred, setIsStarred] = useState(false)
    const [isEnvelope, setEnvelope] = useState(false)

    const star = mail.isStarred ? 'is-starred' : 'un-starred'
    const envelope = isEnvelope ? 'drafts' : 'mail'

    return <Fragment>
        {/* From */}
        <td><Link to={`/mail/${folderName + '/' + mail.id}`}><h4>{mail.fullName}</h4></Link></td>

        {/* Subject */}
        <td className="subject-td"><Link to={`/mail/${folderName + '/' + mail.id}`}><h4>{mail.subject}</h4></Link></td>

        {/* Body */}
        <td className="body-td"><Link to={`/mail/${folderName + '/' + mail.id}`}><LongTxt txt={mail.body} length={100} /></Link></td>

        {/* Trash btn */}
        <td className="trash-td">
            <button className="td-btns trash-btn" onClick={() => onTrashClick(mail)}><span className="material-symbols-outlined">delete</span></button>
            <button className="td-btns star-btn" onClick={() => { onStarClick(mail); setIsStarred(!isStarred) }}><span className={`material-symbols-outlined ${star}`}>star</span></button>
            <button className="td-btns " onClick={() => { onEnvelopeClick(mail); setEnvelope(!isEnvelope) }}><span className="material-symbols-outlined">{envelope}</span></button>
        </td>

        {/* Date */}
        <td className="mail-date"><Link to={`/mail/${folderName + '/' + mail.id}`}><h4>{mailService.getDate(mail.sentAt)}</h4></Link></td>

        {/* {mail.isRead && <td><Link to={`/mail/${mail.id}`}><h4>Mail Read</h4></Link></td>}
        {!mail.isRead && <td><Link to={`/mail/${mail.id}`}><h4>Mail Unread</h4></Link></td>} */}
    </Fragment>
}