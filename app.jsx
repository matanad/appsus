const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { MailDetails } from "./apps/mail/views/mail-details.jsx"
import { MailCompose } from "./apps/mail/cmps/mail-compose.jsx"
import { NoteDetails } from "./apps/note/views/note-details.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/note/:noteId" element={<NoteIndex />} />
                {/* Mail App */}
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/:folderName" element={<MailIndex />} />
                <Route path="/mail/:folderName/:mailId" element={<MailDetails />} />
            </Routes>
        </section>
    </Router>
}
