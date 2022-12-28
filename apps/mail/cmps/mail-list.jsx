import { MailPreview } from "./mail-preview.jsx"



export function MailList({mails}) {

    return <section className="mail-list">
        {
            mails.map(mail => 
            
            <ul className="mail-list" key={mail.id}>
                <MailPreview mail={mail}/>
            </ul>
            )
        }

        {/* <Link to='mail/details/**mailId**'> */}
        {/* </Link> */}

    </section>

}
