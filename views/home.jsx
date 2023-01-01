const { NavLink } = ReactRouterDOM

export function Home() {

    return <section className="home-page-container">

        <div className="logos-container">
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
        </div>

        <div className="home-footer">
            <span>
                &#169; By Matan Adi & Lidor York
            </span>
        </div>
    </section>
}