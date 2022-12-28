
import { mailService } from "../services/mail.service.js"

export function MailPreview({mail}){

    function onMoveToTrash(mail){
        mailService.setIsTrash(mail)
    }
   
    return <li className="mail-preview">
        <h4>{mail.subject}</h4>
        <h4>{mail.body}</h4>
        <h4>{mailService.getDate(mail.sentAt)}</h4>
        <button onClick={()=>onMoveToTrash(mail)}>Move to trash</button>
    </li>
}