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

export async function GET(req) {
  const { socket } = req
  if (socket && !socket.server.io) {
    console.log("Initializing Socket.IO")
    io = new Server(socket.server)
    socket.server.io = io

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
  return new Response(null, { status: 200 })
}
