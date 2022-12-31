import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, onTrashClick, onStarClick, onEnvelopeClick }) {

    return <section className="mail-table-container ">
        <div className="mail-table ">
            <div className="">
                {
                    mails.map(mail =>
                        <div className={`mail-list-item ${(mail.isRead === 'read') && 'mail-is-read'}`} key={mail.id}>
                            <MailPreview mail={mail} onTrashClick={onTrashClick} onStarClick={onStarClick} onEnvelopeClick={onEnvelopeClick} />
                        </div>
                    )
                }
            </div>
        </div>
    </section>
}
