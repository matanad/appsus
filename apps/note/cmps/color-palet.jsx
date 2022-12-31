export function ColorPalet({ onSetColor}) {
    function setColor(ev, color) {
        ev.stopPropagation()
        onSetColor(color)
    }

    return <div className="btns-color-container">
        <button className="btn btn-red" onClick={(ev) => { setColor(ev, 'red') }}>
            <span className="material-symbols-outlined">
                circle
            </span>
        </button>
        <button className="btn btn-blue" onClick={(ev) => { setColor(ev, 'blue') }}>
            <span className="material-symbols-outlined">
                circle
            </span>
        </button>
        <button className="btn btn-yellow" onClick={(ev) => { setColor(ev, 'yellow') }}>
            <span className="material-symbols-outlined">
                circle
            </span>
        </button>
        <button className="btn btn-purple" onClick={(ev) => { setColor(ev, 'purple') }}>
            <span className="material-symbols-outlined">
                circle
            </span>
        </button>
    </div>
}