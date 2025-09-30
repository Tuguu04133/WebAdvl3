import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

// CORS нээх
fastify.register(cors, { origin: true });

// ------------------ ROUTES ------------------

// Бүх байгууллага авах
fastify.get('/orgs', async () => {
  return prisma.organization.findMany();
});

// Нэг байгууллага авах
fastify.get<{ Params: { id: string } }>('/orgs/:id', async (request, reply) => {
  const org = await prisma.organization.findUnique({
    where: { id: Number(request.params.id) },
  });
  if (!org) return reply.status(404).send({ message: 'Not found' });
  return org;
});

// Шинэ байгууллага нэмэх
fastify.post<{ Body: { name: string; phone: string; email: string; address: string; category: string } }>(
  '/orgs',
  async (request) => {
    return prisma.organization.create({ data: request.body });
  }
);

// Байгууллага засах
fastify.put<{ Params: { id: string }; Body: Partial<{ name: string; phone: string; email: string; address: string; category: string }> }>(
  '/orgs/:id',
  async (request, reply) => {
    try {
      return await prisma.organization.update({
        where: { id: Number(request.params.id) },
        data: request.body,
      });
    } catch {
      return reply.status(404).send({ message: 'Not found' });
    }
  }
);

// Байгууллага устгах
fastify.delete<{ Params: { id: string } }>('/orgs/:id', async (request) => {
  await prisma.organization.delete({ where: { id: Number(request.params.id) } });
  return { success: true };
});

// ------------------ SERVER START ------------------
const port = Number(process.env.PORT || 3000);
fastify.listen({ port, host: '0.0.0.0' }).then(() => {
  console.log(`🚀 Fastify API running at http://localhost:${port}`);
});
  