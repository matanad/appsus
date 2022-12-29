const { Link, NavLink, useParams } = ReactRouterDOM

export function AppsMenu() {

    return <div className="apps-menu">
        <NavLink to="/"><span className="material-symbols-outlined">
            home
        </span>
        </NavLink>
        <NavLink to="/mail">
            <span className="material-symbols-outlined">
                mail
            </span>
        </NavLink>
        <NavLink to="/note"><span className="material-symbols-outlined">
            note
        </span></NavLink>
        <NavLink to='/about'>
        <span className="material-symbols-outlined">
            groups
        </span>
        </NavLink>
    </div>
}