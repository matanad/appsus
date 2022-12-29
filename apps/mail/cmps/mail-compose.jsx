const { useState, useEffect, useRef } = React
// const { useNavigate, useParams, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailCompose({ setIsComposeOpen }) {

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


        <form onSubmit={onAddMail} className='compose-mail-form'>

            <header className="form-header flex">
                <div>New Message</div>
            </header>

            {/* <label htmlFor="mail-to">To</label> */}
            <input type="email"
                name="to"
                id="mail-to"
                placeholder="To"
                onChange={handleChange}
            />

            {/* <label htmlFor="mail-Subject">Subject</label> */}
            <input type="text"
                name="subject"
                id="mail-Subject"
                placeholder="Subject"
                onChange={handleChange}
            />

            {/* <label htmlFor="body">Content</label> */}
            <textarea type="text"
                name="body"
                id="body"
                placeholder=""
                onChange={handleChange}
            />

            <div className="form-btns-container flex">
                <button className="form-send-btn">Send</button>
            </div>
        </form>
    </div>

}