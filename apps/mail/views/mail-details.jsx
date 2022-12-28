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
        // console.log('params.mailId:', params.mailId)
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
                console.log('Had issues in mail details', err)
                navigate('/mail')
            })
    }

    if (!mail) return <h1>Loading....</h1>
    return <div>
        <h1>hi from mail details</h1>
        {/* <MailTopFilter/> */}
        {/* <MailSideFiler/> */}
        <h4>{mailService.getDate(mail.sentAt)}</h4>
        <h4>{mail.subject}</h4>
        <h4>{mail.body}</h4>
        <button onClick={() => onMoveToTrash(mail)}>Move to trash</button>
        <Link to='/mail/'>To all Emails</Link>
        {isComposeOpen && <MailCompose />}
    </div>
}