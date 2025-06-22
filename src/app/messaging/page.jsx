// app/messaging/page.jsx
"use client"
import { useEffect, useState } from "react"
import io from "socket.io-client"

let socket

export default function MessagingPage() {
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])

  useEffect(() => {
    // Connect to Socket.IO server
    socket = io()
    socket.on("chatMessage", (msg) => {
      setChat((prev) => [...prev, msg])
    })

    // Cleanup on unmount
    return () => {
      socket.disconnect()
    }
  }, [])

  function sendMessage(e) {
    e.preventDefault()
    if (!message.trim()) return
    socket.emit("chatMessage", message)
    setMessage("")
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">RealTime Messaging</h1>
      <div className="border p-4 h-64 overflow-y-auto mb-4">
        {chat.map((msg, idx) => (
          <div key={idx} className="p-2 border-b">{msg}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          className="border p-2 mr-2 w-2/3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="bg-red-600 text-white p-2" type="submit">
          Send
        </button>
      </form>
    </div>
  )
}
