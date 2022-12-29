const { Link, NavLink, useParams } = ReactRouterDOM

export function AppsMenu() {

    return <div className="apps-menu">
        <NavLink to="/"><span class="material-symbols-outlined">
            home
        </span>
        </NavLink>
        <NavLink to="/mail">
            <span class="material-symbols-outlined">
                mail
            </span>
        </NavLink>
        <NavLink to="/note"><span class="material-symbols-outlined">
            note
        </span></NavLink>
        <NavLink to='/about'>
        <span class="material-symbols-outlined">
            groups
        </span>
        </NavLink>
    </div>
}