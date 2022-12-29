export function MailFolderList() {

    return <section className="side-nav-folders">
        <div className="inbox">
            <span className="material-symbols-outlined">
                inbox 
            </span>
            Inbox
        </div>

        <div className="starred">
            <span className="material-symbols-outlined">
                star
            </span>
            Starred
        </div>

        <div className="sent">
            <span className="material-symbols-outlined">
                send
            </span>
            Sent
        </div>

        <div className="trash">
            <span className="material-symbols-outlined">
                delete
            </span>
            Trash
        </div>
    </section>
}