import { FastifyPluginAsync } from 'fastify'
import { v4 as uuidv4 } from 'uuid'

const clients: any = {};

const collaborate: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', { websocket: true }, async function (socket, reply) {
    const clientId = uuidv4();
    clients[clientId] = socket

    const server = fastify.websocketServer;

    const broadcast = (msg: any) => {
      server.clients.forEach(client => client.send(msg))
    }

    socket.on('open', () => {
      console.log('Connection open')
      socket.send('Connection open')
    })

    socket.on('message', (data) => {
      socket.send('received')
      broadcast(data)
    })
  })
}

export default collaborate