const { useState, useEffect, useRef } = React
const { useNavigate, useParams, NavLink } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"

export function MailFolderList() {
    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter())
    const prevFilterType = useRef('')
    const {folderName} = useParams()
    console.log('folderName:', folderName)


    useEffect(() => {
        eventBusService.emit('loadMails', filterByToEdit)
    }, [filterByToEdit])

    function onFolderClick(value) {
        if (prevFilterType.current) setFilterByToEdit(prevFilter => ({ ...prevFilter, [prevFilterType.current]: false }))
        prevFilterType.current = value
        console.log('prevFilterType.current:', prevFilterType.current)
        if (value) {
            setFilterByToEdit(prevFilter => ({ ...prevFilter, [value]: !prevFilter.value }))
        }
    }

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