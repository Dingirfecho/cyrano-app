// src/app/api/quiz/route.ts

import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    const { archetype, scores } = await req.json()

    // Validar datos
    if (!archetype) {
      return NextResponse.json(
        { error: "Arquetipo inválido" },
        { status: 400 }
      )
    }

    // Actualizar usuario con su arquetipo Cyrano
    // Usamos los campos existentes de forma creativa:
    // mbtiProfile -> archetype (INTERROGATOR, PLEASER, etc)
    // mbtiE -> control score
    // mbtiS -> validation score  
    // mbtiT -> emotion score
    // mbtiJ -> initiative score
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        mbtiProfile: archetype,
        mbtiE: scores.control || 0,
        mbtiS: scores.validation || 0,
        mbtiT: scores.emotion || 0,
        mbtiJ: scores.initiative || 0,
        quizCompletedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      archetype: updatedUser.mbtiProfile
    })

  } catch (error) {
    console.error("Error saving quiz:", error)
    return NextResponse.json(
      { error: "Error al guardar el resultado" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        mbtiProfile: true,
        mbtiE: true,
        mbtiS: true,
        mbtiT: true,
        mbtiJ: true,
        quizCompletedAt: true
      }
    })

    return NextResponse.json({
      hasCompletedQuiz: !!user?.quizCompletedAt,
      archetype: user?.mbtiProfile,
      scores: user?.mbtiProfile ? {
        control: user.mbtiE,
        validation: user.mbtiS,
        emotion: user.mbtiT,
        initiative: user.mbtiJ
      } : null
    })

  } catch (error) {
    console.error("Error fetching quiz:", error)
    return NextResponse.json(
      { error: "Error al obtener datos" },
      { status: 500 }
    )
  }
}
