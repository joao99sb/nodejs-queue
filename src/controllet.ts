import { Writable } from "stream"
import { StreamService } from "./service"


export class StreamController {
  constructor(private streamService: StreamService) { }

  public getData(socket: any, channel: string) {

    const { clientStream } = this.streamService.getData()

    const writeStream = this.writeStreamOnObj((chunk) => {

      socket.emit(channel, chunk)
    })

    clientStream.pipe(writeStream)

    return {
      onClose: () => {
        console.info(`closing connection of ${socket.id}`)
      }
    }
  }

  private writeStreamOnObj(func: (chunk: any) => void) {
    return new Writable({
      objectMode: true,
      write(chunk, encoding, callback) {
        func(chunk)
        callback()
      }
    })
  }
}
