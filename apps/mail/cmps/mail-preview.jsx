const { Link } = ReactRouterDOM
//js
import { mailService } from "../services/mail.service.js"
//jsx
import { LongTxt } from "./long-txt.jsx"

export function MailPreview({ mail }) {

    function onMoveToTrash(mail) {
        mailService.setIsTrash(mail)
    }

    return <li className="mail-preview">
        <Link to={`/mail/${mail.id}`}>
            <h4>{mail.subject}</h4>
            <LongTxt txt={mail.body} length={10} />
            <h4>{mailService.getDate(mail.sentAt)}</h4>
            {mail.isRead && <h4>Mail Read</h4>}
            {!mail.isRead && <h4>Mail Unread</h4>}
        </Link>
        <button onClick={() => onMoveToTrash(mail)}>Move to trash</button>
    </li>
}