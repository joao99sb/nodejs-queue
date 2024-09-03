# ✔️ Real-Time Data Processing with Queues - Proof of Concept ✔️

## 💻 About the Project

♻️ This repository contains a proof of concept for real-time data processing using queues. The project demonstrates how to handle continuous data streams efficiently by leveraging queue systems and real-time communication. It showcases an architecture that combines worker threads, queue services, and streaming capabilities to process and deliver data in real-time.

## Key Features

- Real-time Processing: Utilizes worker threads for non-blocking data processing
- Queue-based Architecture: Implements a queue system for efficient data flow management
- Streaming Capability: Uses Node.js streams for handling large volumes of data
- WebSocket Communication: Leverages Socket.IO for real-time client-server interaction

## Running the Project

To run this proof of concept, ensure you have Node.js installed on your system and follow these steps:

```bash
# Clone this repository
$ git clone https://github.com/joao99sb/nodejs-queue

# Go into the repository
$ cd nodejs-queue

# Install dependencies
$ npm install

# Start the server
$ npm run dev

# Start web front
$ npx http-server -c-1 web
```

The application will start and be ready to process data in real-time.

## 🚀 Technologies Used

- Node.js
- Express
- Socket.IO
- Worker Threads
- Node.js Streams

## ⚠️ Note

This code is a proof of concept and may require further refinement and error handling for production use. It serves as a starting point for building robust, scalable real-time data processing systems.
