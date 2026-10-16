import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContacto(body) {
  const errors = {};

  const nombre = body.nombre?.trim();
  if (!nombre) {
    errors.nombre = "El nombre es obligatorio";
  } else if (nombre.length < 2) {
    errors.nombre = "El nombre debe tener al menos 2 caracteres";
  }

  const email = body.email?.trim();
  if (!email) {
    errors.email = "El correo electrónico es obligatorio";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "El correo electrónico no es válido";
  }

  const mensaje = body.mensaje?.trim();
  if (!mensaje) {
    errors.mensaje = "El mensaje es obligatorio";
  } else if (mensaje.length < 10) {
    errors.mensaje = "El mensaje debe tener al menos 10 caracteres";
  }

  return { errors, data: { nombre, email, mensaje } };
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "El cuerpo de la solicitud no es JSON válido" },
        { status: 400 }
      );
    }

    const { errors, data } = validateContacto(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: "Datos inválidos", campos: errors },
        { status: 400 }
      );
    }

    const nuevoContacto = await prisma.contacto.create({
      data: {
        nombre: data.nombre,
        email: data.email,
        mensaje: data.mensaje,
      },
    });

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.CONTACT_EMAIL,
      replyTo: data.email,
      subject: `Nuevo mensaje de contacto: ${data.nombre}`,
      text: `Nombre: ${data.nombre}
    Correo: ${data.email}

    Mensaje:
    ${data.mensaje}`,
    });

    return NextResponse.json(nuevoContacto, { status: 201 });

  } catch (error) {
    console.error("Error en POST /api/contacto:", error);
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const contactos = await prisma.contacto.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(contactos);

  } catch (error) {
    console.error("Error en GET /api/contacto:", error);
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}
