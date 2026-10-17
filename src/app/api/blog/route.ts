import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/get-authenticated-user";

// ================================================
// GET BLOG POSTED
// ================================================

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  const published = searchParams.get("published");
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

  if (published !== "false") where.published = true;
  if (tag) where.tags = { contains: tag };

  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}

// ======================================
// CREAR NUEVO BLOG 
// ======================================

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

  const slug = body.slug || body.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const post = await prisma.blogPost.create({
    data: {
      title: body.title,
      slug,
      content: body.content,
      author: body.author,
      image: body.image || null,
      tags: body.tags || "",
      published: body.published ?? false,
      creatorId: user.id
    },
  });

  return NextResponse.json(post, { status: 201 });
}
