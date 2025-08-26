import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const classes = await prisma.class.findMany({
    orderBy: [{ day: 'asc' }, { startTime: 'asc' }],
  });
  return NextResponse.json(classes);
}