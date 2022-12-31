const { useState, Fragment } = React
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

        <div>
            <button className="star-btn star-btn" onClick={() => { onStarClick(mail); setIsStarred(!isStarred) }}><span className={`star-span material-symbols-outlined ${star}`}>star</span></button><br />
        </div>

        {/* FullName */}
        <div>
            <Link to={`/mail/${folderName + '/' + mail.id}`}>
                <h4>{mail.fullName}</h4>
            </Link>
        </div>

        {/* Subject */}
        <div className="subject-td">
            <Link to={`/mail/${folderName + '/' + mail.id}`}>
                <p>
                    <span >
                        {mail.subject}
                    </span>
                    <span className="bodyssssss">
                        <LongTxt txt={mail.body} length={200} />
                        {/* {mail.body} */}
                    </span>
                </p>
            </Link>
        </div>

        {/* Body
        <td className="body-td">
            <Link to={`/mail/${folderName + '/' + mail.id}`}>
            </Link>
        </td> */}

        {/* Trash btn */}
        <div className="trash-td">
            <button className="td-btns trash-btn" onClick={() => onTrashClick(mail)}><span className="material-symbols-outlined">delete</span></button>
            <button className="envelope-btn td-btns " onClick={() => { onEnvelopeClick(mail); setEnvelope(!isEnvelope) }}><span className="material-symbols-outlined">{envelope}</span></button>
        </div>

        {/* Date */}
        <div className="mail-date"><Link to={`/mail/${folderName + '/' + mail.id}`}><h4>{mailService.getDate(mail.sentAt)}</h4></Link></div>

        {/* {mail.isRead && <td><Link to={`/mail/${mail.id}`}><h4>Mail Read</h4></Link></td>}
        {!mail.isRead && <td><Link to={`/mail/${mail.id}`}><h4>Mail Unread</h4></Link></td>} */}
    </Fragment>
}