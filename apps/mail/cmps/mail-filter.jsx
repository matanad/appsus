const { useState, useEffect, useRef } = React

import { mailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"

export function MailFilter() {
    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter())
    const elInputRef = useRef(null)
    // const prevFilterType = useRef('')
    
    useEffect(() => {
        console.log('filterByToEdit:', filterByToEdit)
        eventBusService.emit('loadMails',filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value } = target
        setFilterByToEdit(prevFilter=>({...prevFilter,[target.name]:value}))
    }

    return <section className="mail-top-filter ">
        <form className="main-search">
            <input type="text"
                name="txt"
                id="subject-filter"
                placeholder="Search Email by subject..."
                ref={elInputRef}
                value={filterByToEdit.txt}
                onChange={handleChange} />

            <select name="isRead" id="is-read-filter" type='text' onChange={handleChange}>
                <option value=''>All</option>
                <option value='read'>Read</option>
                <option value='unread'>Uread</option>
            </select>
        </form>
    </section>
}