import { FastifyPluginAsync } from 'fastify'


const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', { websocket: true }, async function (socket, reply) {

    socket.on('message', (data) => {
      if (data.toString() === 'ping') {
        socket.pong()
      }
      socket.send(socket.readyState)
    });

    socket.on('ping', () => {
      socket.send("ping!!")
    })

    socket.on('pong', () => {
      socket.send('pong!')
    })
  })
}

export default root;
