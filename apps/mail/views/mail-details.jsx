import { MailCompose } from "../cmps/mail-compose"
import { MailSideFiler } from "../cmps/mail-side-filter"
import { MailTopFilter } from "../cmps/mail-top-filter"


export function MailDetails(){
    const isComposeOpen = false

    return <div>
        <MailTopFilter/>
        <MailSideFiler/>

        {isComposeOpen && <MailCompose/>}
        hi from mail details
    </div>
}