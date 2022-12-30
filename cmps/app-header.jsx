const { Link, useLocation } = ReactRouterDOM
const { useState } = React

import { MailFilter } from "../apps/mail/cmps/mail-filter.jsx"
import { AppsMenu } from "./apps-menu.jsx"

export function AppHeader() {
    const { pathname } = useLocation()

    const [isAppsMenuOpen, setIsAppsMenuOpen] = useState(true)

    function onOpenAppsMenu() {
        setIsAppsMenuOpen((prev) => !prev)
    }

    return <header className="app-header">
        <Link to="/">
            <div
                className={`
            logo ${pathname.includes('/note') && 'note-logo'}
            ${pathname.includes('/mail') && 'mail-logo'}
            `} />
        </Link>
        {pathname.includes('/mail') && <MailFilter />}
        <nav className="apps-menu-btn">
            <span onClick={onOpenAppsMenu} className="material-symbols-outlined">
                apps
            </span>
            {isAppsMenuOpen && <AppsMenu />}
        </nav>
    </header>
}
