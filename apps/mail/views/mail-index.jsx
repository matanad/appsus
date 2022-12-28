const { useState, useEffect } = React

//js
import { mailService } from "../services/mail.service.js"
//jsx
import { MailCompose } from "../cmps/mail-compose.jsx"
import { MailList } from "../cmps/mail-list.jsx"

export function MailIndex() {
    const [isComposeOpen, setIsComposeOpen] = useState(false)

    // const [isLoading, setIsLoading] = useState(false)
    const [mails, setMails] = useState([])

    useEffect(() => {
        // setIsLoading(true)
        loadMails()
    }, [isComposeOpen])

    function loadMails() {
        mailService.query().then(mailsToSet => {
            console.log('allMails from mail:', mailsToSet)
            setMails(mailsToSet)
            // setIsLoading(false)
        })
    }

    function onNewMail(){
        setIsComposeOpen(!isComposeOpen)
    }



    return <main className='mail-index'>
        <h1>Hellow From Mail INDEX</h1>
            <button onClick={onNewMail}>New Mail</button>

            <MailList mails={mails} />



        {isComposeOpen && <MailCompose setIsComposeOpen={setIsComposeOpen}/>}
    </main>
}

