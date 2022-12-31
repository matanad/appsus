const { useEffect, useState } = React
const { useParams, Link } = ReactRouterDOM
//js
import { mailService } from "../services/mail.service.js"
//jsx
import { MailCompose } from "../cmps/mail-compose.jsx"
import { MailSideFiler } from "../cmps/mail-side-filter.jsx"

export function MailDetails() {
    const isComposeOpen = false
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const [mails, setMails] = useState(null)

    useEffect(() => {
        getMails()
            .then(mails => {
                setMails(mails)
                const mail = mails.find(mail => mail.id === mailId)
                setMail(mail)
            })
    }, [])

    function getMails() {
        return mailService.query()
    }

    if (!mail) return <h1>Loading....</h1>
    return <div className="main-mail-details-container">

        <MailSideFiler mails={mails} />

        <main className="mail-details-container">

            <div className="mail-details-top-container">
                <h4>{mail.fullName}</h4>
                <h4>{mailService.getDate(mail.sentAt)}</h4>
            </div>

            <div className="mail-details-middle-container">

                <div className="img-container">
                    <img className="mail-details-img" src={`https://robohash.org/${mail.id}?set=set5`} />
                </div>

                <div >
                    <div className="middle">
                        <div className="mail-content">
                            <h4 className="h41">{mail.subject}</h4>
                            <h4 className="h42">{mail.body}</h4>
                        </div>
                        <div>
                            <Link to='/mail/'>GO back</Link>
                        </div>
                    </div>
                </div>
            </div>

            {isComposeOpen && <MailCompose />}

        </main>
    </div>
}