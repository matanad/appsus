const { useState, useEffect, useRef } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

//js
import { mailService } from "../services/mail.service.js"
import { eventBusService, showErrorMsg } from "../../../services/event-bus.service.js"
//jsx
import { MailCompose } from "../cmps/mail-compose.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailSideFiler } from "../cmps/mail-side-filter.jsx"
import { UserMsg } from "../../../cmps/user-msg.jsx"

export function MailIndex() {
    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const [mails, setMails] = useState([])
    const filter = useRef(mailService.getDefaultFilter())
    const { folderName } = useParams() ? useParams() : '/inbox'


    useEffect(() => {
        eventBusService.on('loadMails', loadMails)
    }, [])

    useEffect(() => {
        filter.current[folderName] = true
        loadMails(filter.current)
        filter.current = mailService.getDefaultFilter()
    }, [folderName])

    function loadMails(filter) {
        mailService.query(filter).then(mailsToSet => {
            setMails(mailsToSet)
        })
    }

    function onMailCompose() {
        setIsComposeOpen(!isComposeOpen)
    }

    function onMoveToTrash(mail) {
        mailService.setTrashOrDelete(mail)
            .then(() => {
                let newFilter = mailService.getDefaultFilter()
                newFilter[folderName] = true
                loadMails(newFilter)
                showSuccessMsg('Deleted')
            })
            .catch((err) => {
                console.log('Delete mail failed error: ', err, 'mail: ', mail)
                showErrorMsg('Delete Failed')
            })

    }



    return <main className='mail-index full'>
        {/* <MailFilter /> */}

        <section className="main-container full">
            <section className="main-side-bar-container">

                <div onClick={onMailCompose} className="compose-btn">
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                    <div>
                        Compose
                    </div>
                </div>

                <MailSideFiler />
            </section>

            <section className="main-mails-list-container">
                <MailList mails={mails} onMoveToTrash={onMoveToTrash} />
            </section>
        </section>

        <section className="new-mail-container main-layout">
            {isComposeOpen && <MailCompose setIsComposeOpen={setIsComposeOpen} loadMails={loadMails} />}
        </section>
        <UserMsg />
    </main>
}

