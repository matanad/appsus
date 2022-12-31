const { NavLink } = ReactRouterDOM

export function Home() {

    return <section className="home home-page-container flex">
        <NavLink to="/note">
            <div className="home-page-img-container">
                <img src="./assets/img/notesus-main-logo.svg" alt="" />
            </div>
        </NavLink>
        
        <NavLink to="/mail">
            <div className="home-page-img-container">
                <img src="./assets/img/mailsus-main-logo.svg" alt="" />
            </div>
        </NavLink>
    </section>
}