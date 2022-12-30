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
        clearTimeout(timeoutCloseIdRef.current)

      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    timeoutCloseIdRef.current && clearTimeout(timeoutCloseIdRef.current)
    elMsg.current && setAnimation(getAnimatedClass('fadeInUp'))
  }, [msg])

  function closeMsg() {
    setAnimation(getAnimatedClass('fadeOutDown'))
    timeoutCloseIdRef.current = setTimeout(() => {
      setMsg(null)
      timeoutCloseIdRef.current && clearTimeout(timeoutCloseIdRef.current)
    }, 800)

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
