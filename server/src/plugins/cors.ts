import fp from 'fastify-plugin';
import cors, { FastifyCorsOptions } from '@fastify/cors';

export default fp<FastifyCorsOptions>(async (fastify) => {
  fastify.register(cors, {
    origin: (origin, cb) => {
      // TODO : need to configure cors for deployment
      const hostname = new URL(origin!).hostname;

      if (hostname === 'localhost') {
        cb(null, true);
        return;
      }

      cb(new Error("Connection Not Allowed"), false);
    }
  });
})
