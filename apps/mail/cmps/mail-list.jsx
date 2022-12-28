import { MailPreview } from "./mail-preview.jsx"

export function MailList({mails}) {

    function getReadMailsCount(){
        let counter = 0
        mails.forEach(mail => {
            if(mail.isRead){
                counter++
            }
        })
        return counter
    }

    function getUnReadMailsCount(){
        let counter = 0
        mails.forEach(mail => {
            if(!mail.isRead){
                counter++
            }
        })
        return counter
    }

    return <section className="mail-list">
        <h1>Read mails: {getReadMailsCount()}</h1>
        <h1>Unread mails: {getUnReadMailsCount()}</h1>
        {
            mails.map(mail => 
            
            <ul className="mail-list" key={mail.id}>
                <MailPreview mail={mail}/>
            </ul>
            )
        }
    </section>
}
