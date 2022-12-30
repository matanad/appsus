const { useState, useEffect, useRef } = React

import { eventBusService } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

export function UserMsg() {
  const { getAnimatedClass } = utilService
  const [animation, setAnimation] = useState(null)
  const [msg, setMsg] = useState(null)
  const elMsg = useRef(null)
  const timeoutIdRef = useRef()
  const timeoutCloseIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
      setMsg(msg)
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
        
      }
      timeoutIdRef.current = setTimeout(closeMsg, 2000)
    })
    return unsubscribe
  }, [])
  
  useEffect(() => {
    elMsg.current && setAnimation(getAnimatedClass('fadeInUp'))
    timeoutCloseIdRef.current && clearTimeout(timeoutCloseIdRef.current)
  }, [msg])

  function closeMsg() {

    setAnimation(getAnimatedClass('fadeOutDown'))
    timeoutCloseIdRef.current = setTimeout(() => {
      setMsg(null)
      clearTimeout(timeOut)
    }, 1000)

  }

  if (!msg) return <span></span>
  return (
    <section ref={elMsg} className={`${animation} user-msg ${msg.type}`}>
      <button onClick={closeMsg}>
        <span className="material-symbols-outlined">
          close
        </span>
      </button>

      {msg.txt}
    </section>
  )
}
