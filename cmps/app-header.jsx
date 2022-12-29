const { Link, NavLink, useParams } = ReactRouterDOM
const Router = ReactRouterDOM

export function AppHeader() {
    // const params = dangerouslyGetParent()
    console.log('params', Router);

    return <header className="app-header">
        <Link to="/">
            <div className="logo"/>
        </Link>
        <div className="main-search">
            <span class="material-symbols-outlined">
                search
            </span>
            <input placeholder="Search Here" />
        </div>
        <nav>
            <span class="material-symbols-outlined">
                apps
            </span>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
