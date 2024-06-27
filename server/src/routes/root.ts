import { FastifyPluginAsync } from 'fastify'


const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // fastify.addHook('onReady', async () => {
  //   getUws(fastify)
  // })

  fastify.get('/', { websocket: true }, async function (socket, reply) {

    // const server = this.websocketServer;
    // const heartbeat = setInterval(() => {
    //   if (socket.readyState === socket.OPEN) {
    //     console.log('open', server.clients)
    //     socket.ping()
    //   }
    // }, 3000)

    socket.on('message', (data) => {
      console.log('data ', data.toString())
      if (data.toString() === 'ping') {
        console.log('true?')
        socket.pong()
      }
      socket.send(socket.readyState)
    });

    // socket.on('close', () => {
    //   clearInterval(heartbeat)
    // })

    socket.on('ping', () => {
      console.log('ping')
      socket.send("ping!!")
    })

    socket.on('pong', () => {
      console.log('pong received')
      socket.send('pong!')
    })
  })
}

export default root;
