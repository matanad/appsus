const { useState, useEffect, useRef } = React
const { useNavigate, useParams, NavLink } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"

export function MailFolderList() {
    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter())
    const prevFilterType = useRef('')
    const { folderName } = useParams()

    useEffect(() => {
        // eventBusService.emit('loadMails', filterByToEdit)
    }, [filterByToEdit])

    return <section className="mail-folder-list">

        <NavLink to={'/mail/inbox'}>
                <span className="material-symbols-outlined">
                    inbox
                </span>
            <div className="inbox">
                Inbox
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
            {/* onClick={() => onFolderClick('isTrash')} className='trash' */}
                <span className="material-symbols-outlined">
                    delete
                </span>
            <div className="trash">
                Trash
            </div>
        </NavLink>

    </section>
}