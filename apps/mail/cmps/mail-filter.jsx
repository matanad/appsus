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
            <label htmlFor="subject-filter">Title:</label>
            <input type="text"
                name="txt"
                id="subject-filter"
                placeholder="By subject..."
                ref={elInputRef}
                value={filterByToEdit.txt}
                onChange={handleTitleChange} />

            {/* <label htmlFor="price-filter">Minimum price:</label>
            <input type="number"
                name="minPrice"
                id="price-filter"
                placeholder="By minimum price.."
                value={filterByToEdit.minPrice}
                onChange={handleTitleChange} /> */}

            {/* <label htmlFor="page-count-filter">Page count:</label>
            <select name="pageCount" id="page-count-filter" type='number' onChange={handleTitleChange}>
                <option value="all">All</option>
                <option value="500">Serious reading</option>
                <option value="200">Descent reading</option>
                <option value="100">Light reading</option>
            </select> */}

            <label htmlFor="is-read-filter">Published at:</label>
            <select name="byIsRead" id="is-read-filter" type='text' onChange={handleSelectChange}>
                <option value=''>All</option>
                <option value='byIsRead'>Read</option>
                <option value='byIsNotRead'>Uread</option>
            </select>

            {/* <button className="filter-btn">Filter Mails</button> */}
        </form>
    </section>
}