const { useState, useEffect } = React

//js
import { mailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"

//jsx
import { MailCompose } from "../cmps/mail-compose.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"

export function MailIndex() {
    const [isComposeOpen, setIsComposeOpen] = useState(false)

    const [mails, setMails] = useState([])

    useEffect(() => {
       eventBusService.on('loadMails', loadMails)
    }, [])

    useEffect(() => {
        loadMails()
    }, [isComposeOpen])

    function loadMails(filter) {
        mailService.query(filter).then(mailsToSet => {
            setMails(mailsToSet)
        })
    }

    function onNewMail() {
        setIsComposeOpen(!isComposeOpen)
    }



    return <main className='mail-index full'>
        <MailFilter/>
        <section className="new-mail-container main-layout">
        <button onClick={onNewMail}>New Mail</button>
        {isComposeOpen && <MailCompose setIsComposeOpen={setIsComposeOpen} />}
        </section>

        <MailList mails={mails} />



    </main>
}

