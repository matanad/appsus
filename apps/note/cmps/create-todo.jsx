const { Fragment, useState, useEffect, useRef } = React

export function CreateTodo({ handleChange, setNewNote }) {
    const todos = useRef([{ txt: '', doneAt: null }])

    useEffect(() => {
        return (() => { todos.current = [{ txt: '' }] })
    }, [])

    function clearTodosLine() {
        return todos.current.filter(todo => todo.txt !== '')
    }

    function handleChangeTodo(ev, idx) {
        const { value, name: field } = ev.target
        todos.current[idx].txt = value
        todos.current = clearTodosLine()
        setNewNote(preTodoNote => ({ ...preTodoNote, info: { todos: todos.current, lable: '' } }))
        handleChange({ target: { value: todos.current, name: field } })
        todos.current.push({ txt: '' })
    }

    function handleChangeLabel() { }

    return <Fragment>
        <input
            type='text'
            key={'label'}
            placeholder='Label...'
            className='todo-label'
            name="label"
            onChange={handleChangeLabel}
        />
        {todos.current.map((todo, idx) =>
            <input
                type='text'
                key={idx}
                placeholder='What todo?'
                value={todo.txt}
                className='todo-line'
                name="todos"
                onChange={(ev) => handleChangeTodo(ev, idx)}
            />
        )}
    </Fragment>
}