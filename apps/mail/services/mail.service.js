
import { utilService } from '../services/utilService.js'
import { storageService } from '../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
  query,
  get,
  remove,
  save,
//   getEmptyBook,
//   getDefaultFilter,
  addReview,
  getNextBookId,
  getPrevBookId,

}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e101',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt : 1551133930594,
                to: 'momo@momo.com'
            },
            {
                id: 'e102',
                subject: 'Hi there',
                body: 'how are toy doing?',
                isRead: false,
                sentAt : 1551133930594,
                to: 'momo@momo.com'
            },
            {
                id: 'e103',
                subject: 'fix the door',
                body: 'you need to fix it',
                isRead: false,
                sentAt : 1551133930594,
                to: 'momo@momo.com'
            },
        ] 

      utilService.saveToStorage(MAIL_KEY, mails)
    }
  }


function query(filterBy = getDefaultFilter()) {
  return storageService.query(MAIL_KEY)
    .then(books => {
      if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        books = books.filter(book => regex.test(book.title))
      }
      if (filterBy.price) {
        books = books.filter(book => book.listPrice.amount >= filterBy.price)
      }
      return books
    })
}

function getNextBookId(bookId) {
  return storageService.query(MAIL_KEY)
      .then(books => {
          var idx = books.findIndex(book => book.id === bookId)
          if (idx === books.length - 1) idx = -1
          return books[idx + 1].id
      })
}

function getPrevBookId(bookId) {
  return storageService.query(MAIL_KEY)
      .then(books => {
          var idx = books.findIndex(book => book.id === bookId)
          if (idx === 0) idx = books.length
          return books[idx - 1].id
      })
}

function get(bookId) {
  return storageService.get(MAIL_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(MAIL_KEY, bookId)
}

function save(book) {
  if (book.id) { 
    return storageService.put(MAIL_KEY, book)
  } else {
    return storageService.post(MAIL_KEY, book)
  }
}



// function getEmptyBook(title = '', price = '') {
//   return { id: '', title, price }
// }

// function getDefaultFilter() {
//   return { title: '', price: '' }
// }




