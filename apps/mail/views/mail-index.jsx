const { useState, useEffect, useRef } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

//js
import { mailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"
//jsx
import { MailCompose } from "../cmps/mail-compose.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailSideFiler } from "../cmps/mail-side-filter.jsx"

export function MailIndex() {
    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const [mails, setMails] = useState([])
    const { folderName } = useParams()
    const filter = useRef(mailService.getDefaultFilter())
    console.log('folderName:', folderName)

    useEffect(() => {
        filter.current[folderName] = true
        loadMails(filter.current)
        eventBusService.on('loadMails', loadMails)
    }, [folderName])

    useEffect(() => {
        loadMails(filter.current)
    }, [isComposeOpen])

    function loadMails(filter) {
        console.log('filter:', filter)
        mailService.query(filter).then(mailsToSet => {
            setMails(mailsToSet)
        })
    }

    function onNewMail() {
        setIsComposeOpen(!isComposeOpen)
    }

    return <main className='mail-index full'>
        <section className="main-container full">
            <section className="main-side-bar-container">

                <div onClick={onNewMail} className="compose-btn">
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                    Compose
                </div>

                <MailSideFiler />
            </section>

            <section className="main-mails-list-container">
                <MailList mails={mails} />
            </section>
        </section>

        <section className="new-mail-container main-layout">
            {isComposeOpen && <MailCompose setIsComposeOpen={setIsComposeOpen} />}
        </section>
    </main>
}

