const { useState, useEffect, useRef } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailCompose({setIsComposeOpen}){

    const [newMail, setNewMail] = useState(mailService.getEmptyMail())
    // const navigate = useNavigate()

    function handleChange({ target }) {
        let { value, name: field } = target
        setNewMail((prevMail) => ({ ...prevMail, [field]: value }))
    }

    function onAddMail(ev) {
        ev.preventDefault()
        mailService.save(newMail).then((mail) => {
            setIsComposeOpen()
            // showSuccessMsg('Mail sent')
            // navigate('/mail/')
        })
    }

    return <div className="mail-compose">
            <h1>HI FROM MAIL COMPOSE</h1>

            <form onSubmit={onAddMail}>
            <label htmlFor="mail-to">To : </label>
            <input type="text"
                name="to"
                id="mail-to"
                placeholder="To..."
                onChange={handleChange}
            />
            <label htmlFor="mail-Subject">Subject : </label>
            <input type="text"
                name="subject"
                id="mail-Subject"
                placeholder="Subject..."
                onChange={handleChange}
            />
            <label htmlFor="body">Content : </label>
            <input type="text-area"
                name="body"
                id="body"
                placeholder="Mail content..."
                onChange={handleChange}
            />
            <button>Send</button>
            </form>
    </div>

}