const { useState, useEffect, useRef } = React
const { Fragment } = React
const { Link } = ReactRouterDOM
//js
import { mailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.JS"
//jsx
import { LongTxt } from "./long-txt.jsx"



export function MailPreview({ mail }) {

    const prevFilterType = useRef('')
    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter())


    function onMoveToTrash(mail) {
        mailService.setTrashOrDelete(mail)
            .then(() => {
                if (mail.removedAt) {
                    setFilterByToEdit(prevFilter => {
                        ({ ...prevFilter, 'isTrash': true })
                        console.log('prevFilter:', prevFilter)
                        eventBusService.emit('loadMails', filterByToEdit)
                        console.log('filterByToEdit111:', filterByToEdit)
                    })
                }
                else {
                    // eventBusService.emit('loadMails')
                    console.log('imGEREEEEEEEEEEEEEEE:', filterByToEdit)
                }
            })
    }

    const isReadClass = mail.isRead ? 'mail-is-read' : 'mail-un-read'

    return <Fragment>
        {/* From */}
        <td><Link to={`/mail/${mail.id}`}><h4>{mail.from}</h4></Link></td>

        {/* Subject */}
        <td ><Link to={`/mail/${mail.id}`}><h4>{mail.subject}</h4></Link></td>

        {/* Body */}
        <td><Link to={`/mail/${mail.id}`}><LongTxt txt={mail.body} length={10} /></Link></td>

        {/* Trash btn */}
        <td><button className="trash-btn" onClick={() => onMoveToTrash(mail)}><span className="material-symbols-outlined">delete</span></button></td>

        {/* Date */}
        <td className="mail-date"><Link to={`/mail/${mail.id}`}><h4>{mailService.getDate(mail.sentAt)}</h4></Link></td>

        {/* {mail.isRead && <td><Link to={`/mail/${mail.id}`}><h4>Mail Read</h4></Link></td>}
        {!mail.isRead && <td><Link to={`/mail/${mail.id}`}><h4>Mail Unread</h4></Link></td>} */}
    </Fragment>
}