import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { createServer } from 'http'
import { mountRuter } from './router'

import { Server } from 'socket.io'

import { Worker } from 'worker_threads'
import path from 'path'

const PORT = process.env.PORT || 3000


function startWorker() {
  const worker = new Worker(path.join(__dirname, '../generator/worker.ts'));


}
async function main() {
  const app = express()
  const server = createServer(app)
  const io = new Server(server, {
    cors: {
      origin: "*",
    }
  })
  await mountRuter(io)


  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  })
  startWorker()
}

main()