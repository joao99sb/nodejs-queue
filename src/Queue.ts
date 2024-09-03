import amqp from 'amqplib'
import { EventEmitter } from 'stream';
import { QUEUE_HOST, QUEUE_NAME, QUEUE_PASS, QUEUE_PORT, QUEUE_USER, QUEUE_VHOST } from './constants';




export class Queue extends EventEmitter {
  private url: string;
  private channel: amqp.Channel | null;
  private static instance: Queue
  constructor() {
    super();

    this.url = `amqp://${QUEUE_USER}:${QUEUE_PASS}@${QUEUE_HOST}:${QUEUE_PORT}${QUEUE_VHOST}`

    this.channel = null
  }


  static getInstance() {
    if (!this.instance) {
      this.instance = new Queue()
    }
    return this.instance
  }

  addEvent(event: string, cb: (...args: any[]) => void): void {
    this.on(event, cb)
  }



  async consumeQueue(queueName: string, event: string) {
    if (!this.channel) {
      throw new Error('Channel not initialized')
    }

    this.channel.consume(queueName, (msg) => {
      if (!msg) {
        return
      }

      const content = msg.content.toString()
      this.emit(event, content)
      this.channel!.ack(msg)
    })
  }


  async connect() {
    try {
      const connection = await amqp.connect(this.url);
      const channel = await connection.createChannel()
      this.channel = channel
      await this.assertQueue(channel, QUEUE_NAME)
      console.log('Connected to RabbitMQ')
    } catch (err) {
      console.error(err);
    }
  }

  private async assertQueue(channel: amqp.Channel, queue: string, option?: amqp.Options.AssertQueue) {
    const defaultOption: amqp.Options.AssertQueue = {
      exclusive: false,
      durable: true,
      autoDelete: false,
      arguments: null
    }

    await channel.assertQueue(queue, { ...defaultOption, ...option })

  }

  async sendToQueue(data: string | number) {
    if (!this.channel) {
      throw new Error('Channel not initialized')
    }

    this.channel.sendToQueue(QUEUE_NAME, Buffer.from(data.toString()))
  }

}