import { MailPreview } from "./mail-preview.jsx"

export function MailList() {

    return <section className="mail-list">

        {/* <Link to='mail/details/**mailId**'> */}
            <MailPreview />
        {/* </Link> */}

    </section>

}
