import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/get-authenticated-user";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const year = searchParams.get("year");
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const dashboard = searchParams.get("dashboard");

  const where: Record<string, unknown> = {};

  // Para el dashboard, verificar quién realiza la petición.
  if (dashboard === "true") {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    // Los usuarios normales solo ven sus propios eventos.
    // Los administradores pueden verlos todos.
    if (user.role !== "ADMIN") {
      where.creatorId = user.id;
    }
  }

  if (year) {
    where.date = {
      gte: new Date(`${year}-01-01`),
      lt: new Date(`${Number(year) + 1}-01-01`),
    };
  }
  if (category) where.category = category;
  if (featured === "true") where.featured = true;

  const eventos = await prisma.evento.findMany({
    where,
    orderBy: { date: "desc" },
  });

  return NextResponse.json(eventos);
}

export async function POST(request: NextRequest) {

  // IDENTIFICANDO AL USUARIO DESDE EL BACKEND 
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json(
      { error: "No autenticado" },
      { status: 401 }
    );
  }

  const body = await request.json();

  const evento = await prisma.evento.create({
    data: {
      title: body.title,
      description: body.description,
      date: new Date(body.date),
      category: body.category,
      tagLabel: body.tagLabel,
      image: body.image,
      location: body.location || null,
      featured: body.featured ?? false,
      creatorId: user.id,
    },
  });

  return NextResponse.json(evento, { status: 201 });
}
