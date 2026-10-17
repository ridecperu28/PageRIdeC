import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/get-authenticated-user";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");
  const type = searchParams.get("type");
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

  if (year) where.year = Number(year);
  if (type) where.type = type;

  const oportunidades = await prisma.oportunidad.findMany({
    where,
    orderBy: { deadline: "asc" },
  });

  return NextResponse.json(oportunidades);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // IDENTIFICANDO AL USUARIO DESDE EL BACKEND 
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json(
      { error: "No autenticado" },
      { status: 401 }
    );
  }

  const oportunidad = await prisma.oportunidad.create({
    data: {
      title: body.title,
      description: body.description,
      deadline: body.deadline ? new Date(body.deadline) : null,
      type: body.type,
      externalLink: body.externalLink || null,
      image: body.image || null,
      year: body.year,
      creatorId: user.id
    },
  });

  return NextResponse.json(oportunidad, { status: 201 });
}
