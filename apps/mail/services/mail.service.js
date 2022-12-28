
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
  query,
  get,
  remove,
  save,
  setIsTrash,
  getDate,
}

function getDate(timestamp) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds
  var date = new Date(timestamp);

  // Get the year, month, and day from the date object
  var year = date.getFullYear();
  var month = date.getMonth() + 1; // Jan is 0, dec is 11
  var day = date.getDate();

  // Return the formatted date string
  return month + '/' + day + '/' + year;
}

function setIsTrash(mail){
  mail.isTrash = true
  storageService.put(MAIL_KEY, mail)
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
                sentAt : 1609459200,
                to: 'momo@momo.com',
                isTrash: false,
                folder: ['new', 'important',],
            },
            {
                id: 'e102',
                subject: 'Hi there',
                body: 'how are toy doing?',
                isRead: false,
                sentAt : new Date(Date.now()),
                to: 'momo@momo.com',
                isTrash: false,
                folder: ['new', 'important',],
            },
            {
                id: 'e103',
                subject: 'fix the door',
                body: 'you need to fix it',
                isRead: false,
                sentAt : 1672233833003,
                to: 'momo@momo.com',
                isTrash: false,
                folder: ['new', 'important',],
            },
        ] 

      utilService.saveToStorage(MAIL_KEY, mails)
    }
  }

function query() {
  return storageService.query(MAIL_KEY)
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) { 
    return storageService.put(MAIL_KEY, mail)
  } else {
    return storageService.post(MAIL_KEY, mail)
  }
}




