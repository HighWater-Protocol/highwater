// In-memory DAL for clients
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createClient(data: any): Promise<any> {
  return prisma.client.create({ data });
}

export async function getClients(): Promise<any[]> {
  return prisma.client.findMany();
}

export async function updateClient(id: string, updates: any): Promise<any | null> {
  return prisma.client.update({ where: { id }, data: updates });
}

export async function deleteClient(id: string): Promise<any> {
  return prisma.client.delete({ where: { id } });
}
