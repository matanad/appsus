import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, onTrashClick, onStarClick, onEnvelopeClick }) {

    // function getReadMailsCount() {
    //     let counter = 0
    //     mails.forEach(mail => {
    //         if (mail.isRead) {
    //             counter++
    //         }
    //     })
    //     return counter
    // }

    // function getUnReadMailsCount() {
    //     let counter = 0
    //     mails.forEach(mail => {
    //         if (!mail.isRead) {
    //             counter++
    //         }
    //     })
    //     return counter
    // }

    return <section className="mail-table-container ">

        <table className="mail-table ">
            <tbody className="">
                {
                    mails.map(mail =>
                        <tr className={`mail-list-item ${(mail.isRead === 'read') && 'mail-is-read'}`} key={mail.id}>
                            <MailPreview mail={mail} onTrashClick={onTrashClick} onStarClick={onStarClick} onEnvelopeClick={onEnvelopeClick} />
                        </tr>
                    )
                }
            </tbody>
        </table>
    </section>
}
