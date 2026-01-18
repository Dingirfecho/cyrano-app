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

    const { archetype, scores, demographics } = await req.json()

    // Validar datos
    if (!archetype) {
      return NextResponse.json(
        { error: "Arquetipo inválido" },
        { status: 400 }
      )
    }

    // Preparar datos de actualización
    const updateData: any = {
      mbtiProfile: archetype,
      mbtiE: scores?.control || 0,
      mbtiS: scores?.validation || 0,
      mbtiT: scores?.emotion || 0,
      mbtiJ: scores?.initiative || 0,
      quizCompletedAt: new Date()
    }

    // Agregar datos demográficos si existen
    if (demographics) {
      if (demographics.gender) updateData.gender = demographics.gender
      if (demographics.age) updateData.age = parseInt(demographics.age.split('-')[0]) || null
      if (demographics.lookingFor) updateData.lookingFor = demographics.lookingFor
      if (demographics.intention) updateData.intention = demographics.intention
    }

    // Actualizar usuario
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData
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
        quizCompletedAt: true,
        gender: true,
        age: true,
        lookingFor: true,
        intention: true
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
      } : null,
      demographics: {
        gender: user?.gender,
        age: user?.age,
        lookingFor: user?.lookingFor,
        intention: user?.intention
      }
    })

  } catch (error) {
    console.error("Error fetching quiz:", error)
    return NextResponse.json(
      { error: "Error al obtener datos" },
      { status: 500 }
    )
  }
}
