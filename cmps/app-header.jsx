const { Link, useLocation } = ReactRouterDOM
const { useState} = React

import { MailFilter } from "../apps/mail/cmps/mail-filter.jsx"
import { AppsMenu } from "./apps-menu.jsx"

export function AppHeader() {
    const {pathname} = useLocation()
    console.log('app:', pathname)


    const  [isAppsMenuOpen, setIsAppsMenuOpen] = useState(true)


    function onOpenAppsMenu(){
        setIsAppsMenuOpen((prev)=>!prev)
    }

    return <header className="app-header">
        <Link to="/">
            <div className="logo"/>
        </Link>
        {pathname.includes('/mail') && <MailFilter/>}
        {/* <div className="main-search">
            <span className="material-symbols-outlined">
                search
            </span>
            <input placeholder="Search Here" />
        </div> */}
        <nav className="apps-menu-btn">
            <span onClick={onOpenAppsMenu} className="material-symbols-outlined">
                apps
            </span>
            {isAppsMenuOpen && <AppsMenu/>}
        </nav>
    </header>
}
