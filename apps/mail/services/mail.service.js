
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
  query,
  get,
  remove,
  save,
  getDate,
  getEmptyMail,
  getDefaultFilter,
  deleteMail,
  moveToTrash,
  starredToggle,
  setReadUnRead,

}

function query(filterBy = getDefaultFilter()) {
  return storageService.query(MAIL_KEY)
    .then(mails => {
      if (!filterBy.isTrash) {
        mails = mails.filter(mail => !mail.isTrash)
      }
      if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        mails = mails.filter(mail => regex.test(mail.subject))
      }
      if (filterBy.isRead === 'read') {
        mails = mails.filter(mail => mail.isRead === 'read')
      }
      if (filterBy.isRead === 'unread') {
        mails = mails.filter(mail => mail.isRead === 'unread')
      }
      if (filterBy.isTrash) {
        mails = mails.filter(mail => mail.isTrash)
      }
      if (filterBy.isStarred) {
        mails = mails.filter(mail => mail.isStarred)
      }
      // if (filterBy.minYear) {
      //     mails = mails.filter(mail => filterBy.minYear >= utilService.getYearsDistance(mail.publishedDate))
      // }
      return mails
    })
}

function getDefaultFilter() {
  return { txt: '', isRead: '', isTrash: false, isStarred: false }
}

function getEmptyMail(to = '', subject = '', body = '') {
  return {
    to: '',
    subject: '',
    body: '',
    isRead: 'unread',
    sentAt: Date.now(),
    from: 'Me',
    isTrash: false,
    folder: ['new'],
    isSrarred: false,

  }
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

function deleteMail(mailId) {
  return remove(mailId)
}

function moveToTrash(mail) {
  mail.isTrash = true
  mail.removedAt = Date.now()
  return save(mail)
}

function setReadUnRead(mail) {
  if (mail.isRead === 'read') {
    mail.isRead = 'unread'
  } else if (mail.isRead === 'unread') {
    mail.isRead = 'read'
  }
  return save(mail)
}

function starredToggle(mail) {
  if (!mail.isStarred) {
    mail.isStarred = true
  } else {
    mail.isStarred = false
  }
  return save(mail)
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = [
      {
        id: 'e101',
        fullName: 'Wix',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: 'unread',
        sentAt: 1609459200,
        to: 'momo@momo.com',
        from: 'Wix',
        isTrash: false,
        folder: ['new', 'important',],
        removedAt: null,
      },
      {
        id: 'e102',
        fullName: 'Dana',
        subject: 'Hi there',
        body: 'how are toy doing?',
        isRead: 'unread',
        sentAt: new Date(Date.now()),
        to: 'momo@momo.com',
        from: 'Dana',
        isTrash: false,
        folder: ['new', 'important',],
        removedAt: null,
      },
      {
        id: 'e103',
        fullName: 'Matan',
        subject: 'fix the door',
        body: 'you need to fix it',
        isRead: 'unread',
        sentAt: 1672233833003,
        to: 'momo@momo.com',
        from: 'Matan',
        isTrash: false,
        folder: ['new', 'important',],
        removedAt: null,
      },
      {
        id: 'e104',
        fullName: 'Sharon',
        subject: 'Importent subject',
        body: 'enim. Etiam gravida molestie arcu. Sed eu nibh vulputate mauris sagittis placerat. Cras dictum ultricies ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egesta',
        isRead: 'unread',
        sentAt: 1672233833003,
        to: 'momo@momo.com',
        from: 'Matan',
        isTrash: false,
        folder: ['new', 'important',],
        removedAt: null,
      },
    ]

    utilService.saveToStorage(MAIL_KEY, mails)
  }
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




