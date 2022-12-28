const { Fragment } = React
const { Link } = ReactRouterDOM
//js
import { mailService } from "../services/mail.service.js"
//jsx
import { LongTxt } from "./long-txt.jsx"

export function MailPreview({ mail }) {

    function onMoveToTrash(mail) {
        mailService.setIsTrash(mail)
    }

    const isReadClass = mail.isRead ? 'mail-is-read' : 'mail-un-read'

    return <Fragment>
        <td><Link to={`/mail/${mail.id}`}><h4>{mail.from}</h4></Link></td>
        <td ><Link to={`/mail/${mail.id}`}><h4>{mail.subject}</h4></Link></td>
        <td><Link to={`/mail/${mail.id}`}><LongTxt txt={mail.body} length={10} /></Link></td>
        <td><button className="trans-btn" onClick={() => onMoveToTrash(mail)}><span className="material-symbols-outlined">delete</span></button></td>
        <td className="mail-date"><Link to={`/mail/${mail.id}`}><h4>{mailService.getDate(mail.sentAt)}</h4></Link></td>

        {/* {mail.isRead && <td><Link to={`/mail/${mail.id}`}><h4>Mail Read</h4></Link></td>}
        {!mail.isRead && <td><Link to={`/mail/${mail.id}`}><h4>Mail Unread</h4></Link></td>} */}
    </Fragment>
}