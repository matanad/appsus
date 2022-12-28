import { MailCompose } from "../cmps/mail-compose.jsx"
import { MailList } from "../cmps/mail-list.jsx"

export function MailIndex() {
    const isComposeOpen = false

    return <section className='mail-index'>
        <h1>Hellow From Mail INDEX</h1>

            <MailList/>
        {isComposeOpen && <MailCompose/>}
    </section>
}

