// app/messaging/page.jsx
"use client"
import { useEffect, useState, useRef } from "react"
import io from "socket.io-client"
import Footer from '@/components/Footer'

let socket

export default function MessagingPage() {
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState(0)
  const [userName, setUserName] = useState("")
  const [hasJoined, setHasJoined] = useState(false)
  const chatEndRef = useRef(null)
  const inputRef = useRef(null)

  // Sample initial messages to show functionality
  const initialMessages = [
    { id: 1, user: "System", message: "Welcome to BloodLink Emergency Chat", timestamp: Date.now(), type: "system" },
    { id: 2, user: "Dr. Smith", message: "We have an urgent O+ blood request at City Hospital", timestamp: Date.now() - 300000, type: "emergency" },
    { id: 3, user: "Sarah M.", message: "I'm O+ and available to donate. What's the timeline?", timestamp: Date.now() - 240000, type: "donor" },
    { id: 4, user: "Dr. Smith", message: "Thank you Sarah! We need it within 2 hours. Please contact us at (555) 123-4567", timestamp: Date.now() - 180000, type: "medical" },
  ]

  useEffect(() => {
    setChat(initialMessages)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [chat])

  useEffect(() => {
    if (hasJoined) {
      // Connect to Socket.IO server
      socket = io()
      
      socket.on("connect", () => {
        setIsConnected(true)
        socket.emit("userJoined", userName)
      })
      
      socket.on("disconnect", () => {
        setIsConnected(false)
      })
      
      socket.on("chatMessage", (msg) => {
        setChat((prev) => [...prev, {
          ...msg,
          id: Date.now(),
          timestamp: Date.now()
        }])
      })
      
      socket.on("userTyping", (data) => {
        setIsTyping(data.isTyping && data.user !== userName)
      })
      
      socket.on("onlineUsers", (count) => {
        setOnlineUsers(count)
      })

      // Cleanup on unmount
      return () => {
        socket.disconnect()
      }
    }
  }, [hasJoined, userName])

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleJoinChat = (e) => {
    e.preventDefault()
    if (userName.trim()) {
      setHasJoined(true)
    }
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    
    const newMessage = {
      user: userName,
      message: message.trim(),
      timestamp: Date.now(),
      type: "user"
    }
    
    if (socket) {
      socket.emit("chatMessage", newMessage)
    } else {
      // Fallback for demo
      setChat(prev => [...prev, { ...newMessage, id: Date.now() }])
    }
    
    setMessage("")
    inputRef.current?.focus()
  }

  const handleTyping = () => {
    if (socket) {
      socket.emit("typing", { user: userName, isTyping: true })
      setTimeout(() => {
        socket.emit("typing", { user: userName, isTyping: false })
      }, 1000)
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const getMessageStyle = (type) => {
    switch (type) {
      case 'system':
        return 'bg-gray-100 text-gray-600 text-center'
      case 'emergency':
        return 'bg-red-50 border-l-4 border-red-500'
      case 'medical':
        return 'bg-blue-50 border-l-4 border-blue-500'
      case 'donor':
        return 'bg-green-50 border-l-4 border-green-500'
      default:
        return 'bg-white'
    }
  }

  if (!hasJoined) {
    return (
      <div className="min-h-screen flex flex-col">
        <section className="flex-1 bg-gradient-to-br from-green-50 via-white to-red-50 py-16">
          <div className="container">
            <div className="max-w-md mx-auto">
              <div className="glass-card fade-in">
                <div className="bg-primary p-6 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Join Emergency Chat</h2>
                  <p className="text-green-100">Connect with medical professionals and donors</p>
                </div>
                
                <div className="p-6">
                  <form onSubmit={handleJoinChat} className="space-y-6">
                    <div className="form-group">
                      <label className="form-label">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="form-input"
                        placeholder="Enter your name or title"
                        required
                      />
                    </div>
                    
                    <button type="submit" className="btn btn-primary btn-lg w-full">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z"/>
                      </svg>
                      Join Emergency Chat
                    </button>
                  </form>
                  
                  <div className="mt-6 text-center">
                    <div className="flex items-center justify-center text-sm text-light">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                      </svg>
                      Secure & Confidential
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 bg-gradient-to-br from-green-50 via-white to-red-50">
        <div className="container py-8">
          {/* Chat Header */}
          <div className="bg-white rounded-lg shadow-lg mb-6 slide-up">
            <div className="bg-primary p-4 rounded-t-lg">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <h1 className="text-2xl font-bold">Emergency Chat</h1>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    {onlineUsers || 4} online
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}>
                    {isConnected ? 'Connected' : 'Connecting...'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden slide-up" style={{ animationDelay: '0.1s' }}>
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {chat.map((msg) => (
                <div
                  key={msg.id || msg.timestamp}
                  className={`rounded-lg p-4 ${getMessageStyle(msg.type)} transition-all duration-300 hover:shadow-sm`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 ${
                        msg.type === 'emergency' ? 'bg-red-500' :
                        msg.type === 'medical' ? 'bg-blue-500' :
                        msg.type === 'donor' ? 'bg-green-500' :
                        msg.type === 'system' ? 'bg-gray-500' : 'bg-primary'
                      }`}>
                        {msg.user === 'System' ? 'S' : msg.user.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-primary">{msg.user}</div>
                        {msg.type !== 'system' && (
                          <div className="text-xs text-light">{formatTime(msg.timestamp)}</div>
                        )}
                      </div>
                    </div>
                    {msg.type === 'emergency' && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                        URGENT
                      </span>
                    )}
                  </div>
                  <div className={`${msg.type === 'system' ? 'text-sm italic' : ''}`}>
                    {msg.message}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="bg-white rounded-lg p-4 border-l-4 border-gray-300">
                  <div className="flex items-center text-light">
                    <div className="flex space-x-1 mr-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-sm">Someone is typing...</span>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form onSubmit={sendMessage} className="flex space-x-4">
                <div className="flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleTyping}
                    className="form-input w-full"
                    placeholder="Type your message..."
                    disabled={!isConnected}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!message.trim() || !isConnected}
                  className="btn btn-accent btn-md px-6"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 slide-up" style={{ animationDelay: '0.2s' }}>
            <button className="btn btn-outline btn-md text-left p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                                    </svg>
                </div>
                <div>
                  <div className="font-semibold text-primary">Report Emergency</div>
                  <div className="text-sm text-light">Submit urgent blood request</div>
                </div>
              </div>
            </button>

            <button className="btn btn-outline btn-md text-left p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-primary">Available to Donate</div>
                  <div className="text-sm text-light">Mark yourself as available</div>
                </div>
              </div>
            </button>

            <button className="btn btn-outline btn-md text-left p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 2h2v4h4v2h-4v4h-2v-4H7v-2h4V5z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-primary">Medical Professional</div>
                  <div className="text-sm text-light">Verify medical credentials</div>
                </div>
              </div>
            </button>
          </div>

          {/* Chat Guidelines */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6 slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              Chat Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-primary mb-3">For Medical Professionals:</h4>
                <ul className="space-y-2 text-sm text-light">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Clearly state blood type and urgency level
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Provide hospital contact information
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Include timeline requirements
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Respect patient privacy (no personal details)
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-3">For Donors:</h4>
                <ul className="space-y-2 text-sm text-light">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Confirm your blood type and availability
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Ask about donation location and process
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Be honest about recent donations
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Follow up if plans change
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-0.5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
                <div>
                  <h5 className="font-semibold text-red-800 mb-1">Important Notice</h5>
                  <p className="text-sm text-red-700">
                    This chat is for emergency coordination only. All medical decisions should be made by qualified healthcare professionals. 
                    Always verify hospital requests through official channels before donating.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Emergency Contact</h3>
              <p className="mb-4 opacity-90">For immediate medical emergencies, contact emergency services</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="tel:911" className="btn btn-ghost btn-md">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  Call 911
                </a>
                <a href="tel:+15551234567" className="btn btn-ghost btn-md">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 2h2v4h4v2h-4v4h-2v-4H7v-2h4V5z"/>
                  </svg>
                  Blood Bank Hotline
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}