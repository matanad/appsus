const { Link, NavLink, useParams } = ReactRouterDOM
const Router = ReactRouterDOM
const { useState, useEffect, useRef } = React

import { AppsMenu } from "./apps-menu.jsx"

export function AppHeader() {
    // const params = dangerouslyGetParent()


    const  [isAppsMenuOpen, setIsAppsMenuOpen] = useState(true)


    function onOpenAppsMenu(){
        setIsAppsMenuOpen((prev)=>!prev)
    }

    return <header className="app-header">
        <Link to="/">
            <div className="logo"/>
        </Link>
        <div className="main-search">
            <span className="material-symbols-outlined">
                search
            </span>
            <input placeholder="Search Here" />
        </div>
        <nav className="apps-menu-btn">
            <span onClick={onOpenAppsMenu} className="material-symbols-outlined">
                apps
            </span>
            {isAppsMenuOpen && <AppsMenu/>}
        </nav>
    </header>
}
