const { useState, useEffect, useRef } = React

import { mailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"

export function MailFilter() {
    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter())
    const elInputRef = useRef(null)
    // const prevFilterType = useRef('')
    
    useEffect(() => {
        // console.log('filterByToEdit:', filterByToEdit)
        eventBusService.emit('loadMails',filterByToEdit)
    }, [filterByToEdit])

    function handleSelectChange({ target }) {
        let { value } = target
        // if (prevFilterType.current) setFilterByToEdit(prevFilter => ({ ...prevFilter, [prevFilterType.current]: false }))
        // prevFilterType.current = value
        // if (value) {
        //     setFilterByToEdit(prevFilter => ({ ...prevFilter, [value]: !prevFilter.value }))
        // }
        console.log(target.name,value);
    }

    function handleTitleChange({ target }) {
        let { value } = target
        console.log(target.name,value);
        setFilterByToEdit(prevFilter=>({...prevFilter,[target.name]:value}))
        // setFilterByToEdit((prevFilter) => {
        //     return { ...prevFilter, txt: value }
        // })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="mail-top-filter ">
        <form onSubmit={onSubmitFilter} className="main-search">
            <input type="text"
                name="txt"
                id="subject-filter"
                placeholder="Search Email by subject..."
                ref={elInputRef}
                value={filterByToEdit.txt}
                onChange={handleTitleChange} />

            <select name="isRead" id="is-read-filter" type='text' onChange={handleTitleChange}>
                <option value=''>All</option>
                <option value='read'>Read</option>
                <option value='unread'>Uread</option>
            </select>
        </form>
    </section>
}