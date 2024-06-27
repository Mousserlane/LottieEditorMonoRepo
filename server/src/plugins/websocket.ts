import fp from 'fastify-plugin'
import Websocket, { WebsocketPluginOptions } from '@fastify/websocket';
export default fp<WebsocketPluginOptions>(async (fastify) => {
  fastify.register(Websocket, {
    logLevel: 'info',
  })
})