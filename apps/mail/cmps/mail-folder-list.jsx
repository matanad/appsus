const { useState, useEffect, useRef } = React
const { useNavigate, useParams, NavLink } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"

export function MailFolderList({ mails }) {
    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        eventBusService.emit('loadMails', filterByToEdit)
    }, [filterByToEdit])

    function getUnreadMailsCount() {
        let counter = 0
        mails.forEach(mail => {
            if (mail.isRead === 'unread') {
                counter++
            }
        })
        return counter
    }

    return <section className="mail-folder-list">
        <NavLink to={'/mail/inbox'}>
            <span className="material-symbols-outlined">
                inbox
            </span>
            <div className="inbox">
                Inbox
            </div>
            <div className="inbox-counter">
                <span>{getUnreadMailsCount()}</span>
            </div>
        </NavLink>

        <NavLink to={'/mail/isStarred'}>
            <span className="material-symbols-outlined">
                star
            </span>
            <div className="starred">
                Starred
            </div>
        </NavLink>

        <NavLink to={'/mail/sent'}>
            <span className="material-symbols-outlined">
                send
            </span>
            <div className="sent">
                Sent
            </div>
        </NavLink>

        <NavLink to={'/mail/isTrash'}>
            <span className="material-symbols-outlined">
                delete
            </span>
            <div className="trash">
                Trash
            </div>
        </NavLink>

    </section>
}