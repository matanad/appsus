import { storageService } from '../../../services/async-storage.service.js'
import { storageService as localStorageService } from '../../../services/storage.service.js'

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getEmptyTodo
}

const STORAGE_KEY = 'noteDB'
const gNotes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        color: '',
        info: { txt: "Fullstack Me Baby!" }
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
            url: "",
            title: "Let's Dance!"
        },
        style: {
            backgroundColor: "#00d"
        }
    }
]

_createNotes()

function query(filterBy = '') {
    return storageService.query(STORAGE_KEY)
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
    return storageService.query(STORAGE_KEY)
}

function _createNotes() {
    _loadNotesFromStorage().then(notes => {
        if (!notes || !notes.length) _saveNotesToStorage(gNotes)
        else _saveNotesToStorage(notes)
    })
}