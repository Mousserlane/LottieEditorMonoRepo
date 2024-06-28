import { FastifyPluginAsync } from 'fastify'
import { v4 as uuidv4 } from 'uuid';
import { Clients, MESSAGE_TYPE, SessionMessage } from './types.js';
import { getRandomColor } from '../../utils/clientColorRandomizer.js';
// TODO : Should use CRDT 
// import { applyPatch } from 'json-joy/lib/json-patch'


const clients: Clients = new Set();
let animationData: string = ''

const broadcastMessage = <T>(clients: Clients, message: SessionMessage<T>) => {
  console.log('broadcast', message)
  for (const client of clients) {
    client.conn.send(JSON.stringify(message))
  }
}

const collaborate: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', { websocket: true }, async function (socket, request) {
    const clientId = uuidv4();

    clients.add({ clientId, conn: socket, colorScheme: getRandomColor() });

    socket.send(JSON.stringify({ type: "connection_open", data: { message: 'connection open', clientId }, }));

    if (Boolean(animationData)) {
      socket.send(JSON.stringify({ type: MESSAGE_TYPE.HAS_ACTIVE_FILE, data: animationData }))
    }

    broadcastMessage(clients, {
      type: MESSAGE_TYPE.ACTIVE_CLIENTS,
      data: Array.from(clients).map(client => ({ clientId: client.clientId, colorScheme: client.colorScheme }))
    });

    socket.on('message', (data) => {
      const bufferToString = data.toString()
      // TODO : Need to guard for a non object string
      const parsedMessage: SessionMessage<any> = JSON.parse(bufferToString);

      if (parsedMessage.type === MESSAGE_TYPE.CLIENT_SELECT_LAYER) {
        const client = Array.from(clients).find(client => client.clientId === parsedMessage.data.clientId)
        broadcastMessage<any>(clients, {
          type: MESSAGE_TYPE.CLIENT_SELECT_LAYER,
          data: {
            selectedLayer: parsedMessage.data.selectedLayer, client
          }
        })
      }

      socket.send(JSON.stringify({ type: "acknowledge", data: "received" }))
    })

    socket.on('close', (_, reason) => {
      socket.send(reason)
      socket.terminate()
    })
  })

  fastify.post('/', async function (req, reply) {
    try {
      const data: any = req.body;
      animationData = data;

      const message = { type: MESSAGE_TYPE.FILE_UPLOAD, data: animationData };

      broadcastMessage<string>(clients, message)

      reply.status(200).send({ status: 'Upload Successful' })
    } catch (error) {
      console.log('error', error)
      reply.status(500).send({ status: "Upload Error", message: error })
    }
  })
}

export default collaborate;