import { initalizeTracing } from './tracing.js';
await initalizeTracing()

import { trace, context } from '@opentelemetry/api';

import Fastify from 'fastify';
const PORT = 8080;

const app = Fastify();


app.get('/user', async (request, reply) => {
    const span = trace.getSpan(context.active())
    const payload = {
        nome:"user112",
        password:"**********",
        userId:"632423b4jh32g4gy4323947"
    }
    span.setAttribute('http.response_payload', JSON.stringify(payload))
    return reply.status(200).send(payload)
});

const address = await app.listen({ port: PORT })
console.log(`Server is running on ${address}`);