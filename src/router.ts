import { Server } from "socket.io"
import { StreamController } from "./controllet"
import { StreamService } from "./service"
import { Queue } from "./Queue"

export const mountRuter = async (io: Server,) => {
  const queue = new Queue()
  await queue.connect()
  const streamService = new StreamService(queue)
  const streamController = new StreamController(streamService)
  io.on("connection", async (socket) => {
    console.log(`user connected: ${socket.id}`)

    const { onClose } = streamController.getData(socket, 'stream_data');

    socket.on("disconnect", () => {
      console.log(`user disconnected: ${socket.id}`)
      onClose()
    })
  })


}