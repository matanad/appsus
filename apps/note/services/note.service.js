import { storageService } from '../../../services/async-storage.service.js'
import { storageService as localStorageService } from '../../../services/storage.service.js'

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getEmptyTodo,
    getDefaultFilter
}

const STORAGE_KEY = 'noteDB'
const gNotes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        color: '',
        info: {
            title: "Fullstack Me Baby!",
            txt: "Oh yeahhhh!!!"
        }
    },
    {
        id: "n102",
        type: "note-img",
        color: '',
        info: {
            url: "https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg",
            title: "Bobi and Me"
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: "n103",
        type: "note-todos",
        color: '',
        info: {
            label: "Get my stuff together",
            todos: [{
                txt: "Driving liscence",
                doneAt: null
            },
            {
                txt: "Coding power",
                doneAt: 187111111
            }
            ]
        }
    },
    {
        id: "n104",
        type: "note-video",
        color: '',
        info: {
            url: "https://www.youtube.com/watch?v=PvDowVEX0kY&ab_channel=BoomShakaLaka",
            title: "Let's party!"
        },
        style: {
            backgroundColor: "#00d"
        }
    }
]

_createNotes()

function getDefaultFilter() {
    return {
        info: {
            title: '',
            url: '',
            txt: '',
            doneAt: null,
        }
    }
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(STORAGE_KEY)
        .then(notes => {
            if (filterBy.txt) notes = notes.filter(({ type, info }) => {
                const regex = new RegExp(filterBy.txt, 'i')
                if (type === 'note-txt') return regex.test(info.txt)
                if (type === 'note-todos') {
                    const todos = info.todos.filter(({txt}) => regex.test(txt))
                    if (todos && todos.length) return true
                }
                return false
            })
            // if (filterBy.url) notes = notes.filter(({ info }) => info.url === filterBy.url)
            // if (filterBy.title) notes = notes.filter(({ info }) => info.title === filterBy.title)
            // if (filterBy.doneAt) notes = notes.filter(({ info }) => info.doneAt === filterBy.doneAt)
            return notes
        })
}

function get(noteId) {
    return storageService.get(STORAGE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(STORAGE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(STORAGE_KEY, note)
    } else {
        return storageService.post(STORAGE_KEY, note)
    }
}

function getEmptyNote(type = '', info = { txt: '' }, color = '') {
    return { type, info, color }
}

function getEmptyTodo(type = '', info = { label: '', todos: [''] }, color = '') {
    return { type, info, color }
}

function _saveNotesToStorage(notes) {
    localStorageService.saveToStorage(STORAGE_KEY, notes)
}

function _loadNotesFromStorage() {
    return localStorageService.loadFromStorage(STORAGE_KEY)
}

function _createNotes() {
    const notes = _loadNotesFromStorage()
    if (!notes || !notes.length) _saveNotesToStorage(gNotes)
    else _saveNotesToStorage(notes)
}