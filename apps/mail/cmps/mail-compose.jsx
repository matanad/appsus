const { useState } = React
import { mailService } from "../services/mail.service.js"

export function MailCompose({ setIsComposeOpen, loadMails }) {
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())

    function handleChange({ target }) {
        let { value, name: field } = target
        console.log('newMail:', newMail)
        setNewMail((prevMail) => ({ ...prevMail, [field]: value }))

    }

    function onAddMail(ev) {
        ev.preventDefault()
        mailService.saveComposeMail(newMail).then((mail) => {
            setIsComposeOpen()
            loadMails()
            // showSuccessMsg('Mail sent')
            // navigate('/mail/')
        })
    }

    return <div className="mail-compose">

        <form onSubmit={onAddMail} className='compose-mail-form'>

            <header className="form-header flex">
                <div>New Message</div>
            </header>

            <input type="email"
                name="to"
                id="mail-to"
                placeholder="To"
                onChange={handleChange}
            />

            <input type="text"
                name="subject"
                id="mail-Subject"
                placeholder="Subject"
                onChange={handleChange}
            />

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