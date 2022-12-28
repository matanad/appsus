export function ColorPalet({onSetColor}) {
    return <div className="btns-color-container">
        <button className="btn-red" onClick={() => { onSetColor('red') }}>
            <span className="material-symbols-outlined">
                circle
            </span>
        </button>
        <button className="btn-blue" onClick={() => { onSetColor('blue') }}>
            <span className="material-symbols-outlined">
                circle
            </span>
        </button>
        <button className="btn-yellow" onClick={() => { onSetColor('yellow') }}>
            <span className="material-symbols-outlined">
                circle
            </span>
        </button>
        <button className="btn-purple" onClick={() => { onSetColor('purple') }}>
            <span className="material-symbols-outlined">
                circle
            </span>
        </button>
    </div>
}