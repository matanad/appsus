const { useState, useEffect, useRef } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

//js
import { mailService } from "../services/mail.service.js"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
//jsx
import { MailCompose } from "../cmps/mail-compose.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { MailSideFiler } from "../cmps/mail-side-filter.jsx"
import { UserMsg } from "../../../cmps/user-msg.jsx"

export function MailIndex() {
    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const [mails, setMails] = useState([])
    const filter = useRef(mailService.getDefaultFilter())
    const { folderName } = useParams()


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

    function onTrashClick(mail) {
        if (!mail.removedAt) {
            mailService.moveToTrash(mail)
                .then(() => {
                    let newFilter = mailService.getDefaultFilter()
                    newFilter[folderName] = true
                    loadMails(newFilter)
                    showSuccessMsg('Moved to trash successfully')
                })
                .catch((err) => {
                    console.log('Move to trash failed error: ', err, 'mail: ', mail)
                    showErrorMsg('Move to trash failed')
                })
        } else {
            mailService.deleteMail(mail.id)
                .then(() => {
                    let newFilter = mailService.getDefaultFilter()
                    newFilter[folderName] = true
                    loadMails(newFilter)
                    showSuccessMsg('Mail deleted successfully')
                })
                .catch((err) => {
                    console.log('Delete mail failed error: ', err, 'mail: ', mail)
                    showErrorMsg('Delete Failed')
                })
        }

    }

    function onStarClick(mail) {
            mailService.starredToggle(mail)
                .then(() => {
                    let newFilter = mailService.getDefaultFilter()
                    newFilter[folderName] = true
                    loadMails(newFilter)
                })
                .catch((err) => {
                    console.log('Star toggle failed error: ', err, 'mail: ', mail)
                    showErrorMsg('Something went wrong')
                })
        
    }

    function onEnvelopeClick(mail){
        mailService.setReadUnRead(mail)
        .then(() => {
            let newFilter = mailService.getDefaultFilter()
            newFilter[folderName] = true
            loadMails(newFilter)
        })
        .catch((err) => {
            console.log('Read toggle failed error: ', err, 'mail: ', mail)
            showErrorMsg('Something went wrong')
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

                <MailSideFiler mails={mails}/>
            </section>

            <section className="main-mails-list-container">
                <MailList mails={mails} onTrashClick={onTrashClick} onStarClick={onStarClick} onEnvelopeClick={onEnvelopeClick}/>
            </section>
        </section>

        <section className="new-mail-container main-layout">
            {isComposeOpen && <MailCompose setIsComposeOpen={setIsComposeOpen} loadMails={loadMails} />}
        </section>
        <UserMsg />
    </main>
}

