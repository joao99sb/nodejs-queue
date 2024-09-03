import { PassThrough, Readable } from "stream"
import { Queue } from "./Queue"
import { QUEUE_NAME } from "./constants"

export class StreamService {


  private dataStream: Readable
  constructor(private queueService: Queue) {
    this.dataStream = new Readable({
      read() { }
    });
    const event = 'dataStream'
    this.queueService.consumeQueue(QUEUE_NAME, event).catch(console.error)
    this.queueService.on(event, (data) => {
      console.log('data', data)
      this.dataStream.push(data)
    })

  }

  public getData() {

    const clientStream = this.createClientStream()

    this.dataStream.pipe(clientStream)

    return {
      clientStream
    }
  }

  private createClientStream() {
    const clientStream = new PassThrough()

    return clientStream

  }
}