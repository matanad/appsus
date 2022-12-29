const { useState, useEffect, useRef } = React

import { mailService } from "../services/mail.service.js"

export function MailFilter() {

    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter())
    const elInputRef = useRef(null)
    const prevFilterType = useRef('')
    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
    }, [filterByToEdit, mails])

    function loadMails() {
        mailService.queryWithFilter(filterByToEdit).then(mailsToSet => {
            console.log('allMails from mail:', mailsToSet)
            setMails(mails)
        })
    }

    function handleSelectChange({ target }) {
        let { value } = target
        if (prevFilterType.current) setFilterByToEdit(prevFilter => ({ ...prevFilter, [prevFilterType.current]: false }))
        prevFilterType.current = value
        if (value) {
            setFilterByToEdit(prevFilter => ({ ...prevFilter, [value]: !prevFilter.value }))
        }
    }

    function handleTitleChange({ target }) {
        let { value } = target
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter, txt: value }
        })
    }



    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="mail-top-filter">
        <form onSubmit={onSubmitFilter}>
            <input type="text"
                name="txt"
                id="subject-filter"
                placeholder="Search Email by subject..."
                ref={elInputRef}
                value={filterByToEdit.txt}
                onChange={handleTitleChange} />

            <select name="byIsRead" id="is-read-filter" type='text' onChange={handleSelectChange}>
                <option value=''>All</option>
                <option value='byIsRead'>Read</option>
                <option value='byIsNotRead'>Uread</option>
            </select>

            {/* <button className="filter-btn">Filter Mails</button> */}
        </form>
    </section>
}