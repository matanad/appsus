
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

const loggedinUser = {
  mail: 'user@appsus.com',
  fullname: 'Me'
}
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
  saveComposeMail,
}

function query(filterBy = getDefaultFilter()) {
  return storageService.query(MAIL_KEY)
    .then(mails => {
      if (!filterBy.isTrash) {
        mails = mails.filter(mail => !mail.isTrash)
      }
      if (!filterBy.sent) {
        mails = mails.filter(mail => mail.from != loggedinUser.mail)
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
      if (filterBy.sent) {
        mails = mails.filter(mail => mail.from === loggedinUser.mail)
      }
      // if (filterBy.minYear) {
      //     mails = mails.filter(mail => filterBy.minYear >= utilService.getYearsDistance(mail.publishedDate))
      // }
      return mails
    })
}

function getDefaultFilter() {
  return { txt: '', isRead: '', isTrash: false, isStarred: false, sent: false,}
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
        subject: 'Web advertise',
        body: 'Just by having a site of your own, you can start earning passive income. There are just a handful of steps you’ll need to take to build a website that makes money online. First you’ll need to choose from one of many professionally designed website templates, select a domain name and get free website hosting. Then you can begin thinking about the different routes toward monetizing your website. ',
        sentAt: 1609459200,
        isRead: 'unread',
        to: loggedinUser.mail,
        from: 'stam@mail.com',
        fullName: 'Wix',
        isTrash: false,
        folder: ['new', 'important',],
        removedAt: null,
      },
      {
        id: 'e102',
        fullName: 'Dana',
        subject: 'Design websites',
        body: 'Whether it’s something you have experience in or you’re a natural at, designing websites can be an excellent source of income. In fact, web designers are always in demand as the industry exponentially grows. That said, you’ll need to make a name for yourself in order to stand out. Working with the right clients can help optimize your web design portfolio and highlight your talents. ',
        isRead: 'unread',
        sentAt: new Date(Date.now()),
        to: loggedinUser.mail,
        from: 'aaaa@mail.com',
        isTrash: false,
        folder: ['new', 'important',],
        removedAt: null,
      },
      {
        id: 'e103',
        fullName: 'Matan',
        subject: 'Fix the door',
        body: 'So often we live in our heads and we completely forget about our body, unless of course, we are in distress.',
        isRead: 'unread',
        sentAt: 1672233833003,
        to: loggedinUser.mail,
        from: 'vbbb@mail.com',
        isTrash: false,
        folder: ['new', 'important',],
        removedAt: null,
      },
      {
        id: 'e104',
        fullName: 'Sharon',
        subject: 'Importent',
        body: 'You can either jump out of the can, leave all your useless junk behind, or you can stay confined to old ways and habits.',
        isRead: 'unread',
        sentAt: 1672233833003,
        to: loggedinUser.mail,
        from: 'asdzxc@mail.com',
        isTrash: false,
        folder: ['new', 'important',],
        removedAt: null,
      },
      {
        id: 'e105',
        fullName: 'Ron',
        subject: 'Job Interview',
        body: 'Lacerat. Cras dictum ultricies l, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egesta',
        isRead: 'unread',
        sentAt: 1682232833003,
        to: loggedinUser.mail,
        from: 'stam@mail.com',
        isTrash: false,
        folder: ['new', 'important',],
        removedAt: null,
      },
      {
        id: utilService.makeId(),
        fullName: 'David',
        subject: 'Staff meeting',
        body: 'Test your subject lines. Write 3-5 subject lines for every email and then choose the best—or use A/B testing to pick winners Note that due to the iOS 15 update, declaring winners based on open rate may not be the best route.',
        isRead: 'unread',
        sentAt: 1282232833003,
        to: loggedinUser.mail,
        from: 'stam@mail.com',
        isTrash: false,
        folder: ['new', 'important',],
        removedAt: null,
      },
      {
        id: utilService.makeId(),
        fullName: 'Yafit',
        subject: 'Sale 50% off',
        body: 'Keep it brief. Between 30 and 50 characters. According to a MailChimp study, emails with 50 characters or less have 12% higher email newsletter open rates, and 75% higher click-through rates than other emails.',
        isRead: 'unread',
        sentAt: 1531234533003,
        to: loggedinUser.mail,
        from: 'stam@mail.com',
        isTrash: false,
        folder: ['new', 'important',],
        removedAt: null,
      },
      {
        id: utilService.makeId(),
        fullName: 'Ron',
        subject: 'Zoom meeting',
        body: 'Avoid spam traps. Don’t use weird spacing, an excess amount of punctuation or caps, or special fonts and avoid spam trigger words like earn extra cash, make $, get out of debt, click here, 100% free, will not believe your eyes, and other clickbait terms.',
        isRead: 'unread',
        sentAt: 11324432833003,
        to: loggedinUser.mail,
        from: 'stam@mail.com',
        isTrash: false,
        folder: ['new', 'important',],
        removedAt: null,
      },
      {
        id: utilService.makeId(),
        fullName: 'Shlomi',
        subject: 'Birthday party',
        body: 'Personalize when possible: Not just by including their name, but information specific to their location, their purchase, interests, and more. You can use email automation with dynamic tokens for this.',
        isRead: 'unread',
        sentAt: 1287485585003,
        to: loggedinUser.mail,
        from: 'stam@mail.com',
        isTrash: false,
        folder: ['new', 'important',],
        removedAt: null,
      },
      {
        id: utilService.makeId(),
        fullName: 'Adam',
        subject: 'Zoom meeting',
        body: 'Use preheader text. This is like your subject line’s subtitle, where you can add more detail to increase the email’s appeal. Move the “view in browser” links and other mumbo-jumbo to the bottom of the email so you can make the most of the preview field.',
        isRead: 'unread',
        sentAt: 1295872833003,
        to: loggedinUser.mail,
        from: 'stam@mail.com',
        isTrash: false,
        folder: ['new', 'important',],
        removedAt: null,
      },
      {
        id: utilService.makeId(),
        fullName: 'Blogi',
        subject: 'Create a blog',
        body: 'The wonderful thing about blogging is that you can create content about absolutely anything as long as there are people interested in reading it. After some time, your free blog will attract website traffic and offer monetization opportunities. This is one of the reasons blogging is a great digital nomad job. ',
        isRead: 'unread',
        sentAt: 1212592833003,
        to: loggedinUser.mail,
        from: 'stam@mail.com',
        isTrash: false,
        folder: ['new', 'important',],
        removedAt: null,
      },
      {
        id: utilService.makeId(),
        fullName: 'OnlineOn',
        subject: 'Open online store',
        body: 'Internet shopping has become synonymous with convenience. As a result, people are purchasing more goods online than ever before. You can grab a slice of this profitable eCommerce pie by opening your own online store. Be sure to choose an eCommerce website builder that offers advanced business features, including secure payment and checkout, shipping and marketing tools, and store analytics to help you run your venture. ',
        isRead: 'unread',
        sentAt: 1284592833003,
        to: loggedinUser.mail,
        from: 'stam@mail.com',
        isTrash: false,
        folder: ['new', 'important',],
        removedAt: null,
      },
      {
        id: utilService.makeId(),
        fullName: 'DropIL',
        subject: 'Start dropshipping',
        body: 'Did you know that you can be an online seller without needing to stock up on products? Dropshipping lets you sell items using a third-party retailer that completely manages the order fulfillment process. All you have to do is find the right products for your business and connect with a supplier. This also means that you can begin a dropshipping business right away and start accepting customers as soon as you integrate your dropshipping products into your website.',
        isRead: 'unread',
        sentAt: 1282232833003,
        to: loggedinUser.mail,
        from: 'stam@mail.com',
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

function saveComposeMail(mail){
  if(mail.to === loggedinUser.mail){
    
  }
  let mailToSet = getEmptyMail()
  mailToSet.fullName = loggedinUser.fullname
  mailToSet.from = loggedinUser.mail
  mailToSet.to = mail.to
  mailToSet.subject = mail.subject
  mailToSet.body = mail.body
  return storageService.post(MAIL_KEY, mailToSet)
}




