import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails }) {

    function getReadMailsCount() {
        let counter = 0
        mails.forEach(mail => {
            if (mail.isRead) {
                counter++
            }
        })
        return counter
    }

    function getUnReadMailsCount() {
        let counter = 0
        mails.forEach(mail => {
            if (!mail.isRead) {
                counter++
            }
        })
        return counter
    }

    return <section className="mail-table-container full">
        <h1>Read mails: {getReadMailsCount()}</h1>
        <h1>Unread mails: {getUnReadMailsCount()}</h1>
        <table className="mail-table ">
            <tbody className="main-layout">
            {
                mails.map(mail =>
                    <tr className={`mail-list-item ${mail.isRead && 'mail-is-read'}`} key={mail.id}>
                        <MailPreview mail={mail} />
                    </tr>
                )
            }
            </tbody>
        </table>
    </section>
}
