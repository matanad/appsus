const { useEffect, useState } = React
const { useParams } = ReactRouterDOM
const { Link } = ReactRouterDOM
//js
import { mailService } from "../services/mail.service.js"
//jsx
import { MailCompose } from "../cmps/mail-compose.jsx"

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
                mail.isRead = 'read'
                mailService.save(mail)
                setMail(mail)
            })
            .catch((err) => {
                navigate('/mail')
            })
    }

    if (!mail) return <h1>Loading....</h1>
    return <div className="main-mail-details-container">

        <main className="mail-details-container">

            <div className="flex mail-details-top">
                <h4>{mail.subject}</h4>
                <h4>{mailService.getDate(mail.sentAt)}</h4>
            </div>

            <div className="mail-details-img-container flex">
            <img className="mail-details-img" src={`https://robohash.org/${mail.id}?set=set5`}/>
            </div>

            <main className="mail-details-center flex">
                <h4>{mail.body}</h4>
            </main>

            <div className="mail-details-buttons flex">
            </div>

            <Link to='/mail/'>GO back</Link>
            {isComposeOpen && <MailCompose />}

        </main>
    </div>
}