// app/api/socket/route.js
import { Server } from "socket.io"

let io

export function config() {
  return {
    api: {
      bodyParser: false,
    },
  }
}

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.IO")
    io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on("connection", (socket) => {
      console.log("New client connected", socket.id)

      // Example: handle a chat message event
      socket.on("chatMessage", (msg) => {
        // Broadcast the message to all connected clients
        io.emit("chatMessage", msg)
      })

      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id)
      })
    })
  }
  res.end()
}
