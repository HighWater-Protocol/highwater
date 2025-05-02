// In-memory DAL for portfolios
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createPortfolio(data: any): Promise<any> {
  return prisma.portfolio.create({ data });
}

export async function getPortfolios(): Promise<any[]> {
  return prisma.portfolio.findMany();
}

export async function updatePortfolio(id: string, updates: any): Promise<any | null> {
  return prisma.portfolio.update({ where: { id }, data: updates });
}

export async function deletePortfolio(id: string): Promise<any> {
  return prisma.portfolio.delete({ where: { id } });
}
