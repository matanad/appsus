import { MailFolderList } from "./mail-folder-list.jsx"

export function MailSideFiler({mails}){
    return <section className="side-nav-container">
        <MailFolderList mails={mails}/>
    </section>
}