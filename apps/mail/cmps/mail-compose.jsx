const { useState, useEffect, useRef } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailCompose(){

    const [mails, setMails] = useState([])
    const debounceLoadFromGoogle = useRef(null)

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query().then(mailsToSet => {
            console.log('allMails from mails compose:', mailsToSet)
            setMails(mailsToSet)
        })
    }

    function onAddMail(mail) {
        console.log('mail from onaddmail:', mail)
        mailService.save(mail).then((mail) => {
            // showSuccessMsg('Book saved!')
            navigate('/mail/')
        })
    }



    return <div className="mail-compose">
            <h1>HI FROM MAIL COMPOSE</h1>

            <form onSubmit={onAddMail}>
            <label htmlFor="mail-to">To : </label>
            <input type="text"
                name="mail-to"
                id="mail-to"
                placeholder="To..."
                // onChange={handleChange}
            />
            <label htmlFor="mail-Subject">Subject : </label>
            <input type="text"
                name="mail-Subject"
                id="mail-Subject"
                placeholder="Subject..."
                // onChange={handleChange}
            />
            <label htmlFor="title">Content : </label>
            <input type="text-area"
                name="mail-content"
                id="title"
                placeholder="Enter book title..."
                // onChange={handleChange}
            />
            <button>Send</button>
            </form>
    </div>

}