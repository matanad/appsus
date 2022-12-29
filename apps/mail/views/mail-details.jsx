const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM
const { Link } = ReactRouterDOM

//js
import { mailService } from "../services/mail.service.js"
//jsx
import { MailCompose } from "../cmps/mail-compose.jsx"
// import { MailSideFiler } from "../cmps/mail-side-filter.jsx"
// import { MailTopFilter } from "../cmps/mail-top-filter.jsx"

export function MailDetails() {
    const isComposeOpen = false
    const [mail, setMail] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadMail()
    }, [])

    function loadMail() {
        mailService.get(params.mailId)
            .then((mail) => {
                mail.isRead = true
                mailService.save(mail)
                setMail(mail)
            })
            .catch((err) => {
                navigate('/mail')
            })
    }

    if (!mail) return <h1>Loading....</h1>
    return <main className="mail-details-container">
        <h4>{mailService.getDate(mail.sentAt)}</h4>
        <h4>{mail.subject}</h4>
        <h4>{mail.body}</h4>
        <button onClick={() => onMoveToTrash(mail)}>Move to trash</button>
        <Link to='/mail/'>To all Emails</Link>
        {isComposeOpen && <MailCompose />}

    </main>
}