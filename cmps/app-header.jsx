const { Link, NavLink, useParams  } = ReactRouterDOM
const Router = ReactRouterDOM

export function AppHeader() {
    // const params = dangerouslyGetParent()
    console.log('params', Router);

    return <header className="app-header">
        <Link to="/">
            <h3>LOGO!</h3>
        </Link>
        <input placeholder="Search Here" />
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
