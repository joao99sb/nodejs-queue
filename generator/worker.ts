import { Queue } from '../src/Queue';


const queue = new Queue()
const sendRandomNumber = async () => {

  const randomNumber = Math.floor(Math.random() * 100);
  queue.sendToQueue(randomNumber)
}
const start = async () => {
  await queue.connect()

  setInterval(sendRandomNumber, 1000);
}

start()


