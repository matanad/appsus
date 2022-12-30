const { useState, useEffect, useRef } = React
const { useNavigate, useParams, NavLink } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"

export function MailFolderList() {
    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter())
    const prevFilterType = useRef('')
    const {folderName} = useParams()

    useEffect(() => {
        // eventBusService.emit('loadMails', filterByToEdit)
    }, [filterByToEdit])

    return <section className="side-nav-folders">
        
        <NavLink to={'/mail/inbox'}>
        <div className="inbox">
            <span className="material-symbols-outlined">
                inbox
            </span>
            Inbox
        </div>
        </NavLink>

        <NavLink to={'/mail/isStarred'}>
        <div className="starred">
            <span className="material-symbols-outlined">
                star
            </span>
            Starred
        </div>
        </NavLink>

        <NavLink to={'/mail/sent'}>
        <div className="sent">
            <span className="material-symbols-outlined">
                send
            </span>
            Sent
        </div>
        </NavLink>

        <NavLink to={'/mail/isTrash'}>
        {/* onClick={() => onFolderClick('isTrash')} className='trash' */}
        <div className="trash">
            <span className="material-symbols-outlined">
                delete
            </span>
            Trash
        </div>
        </NavLink>

    </section>
}