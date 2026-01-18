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

    const { profile, scores } = await req.json()

    // Validar datos
    if (!profile || profile.length !== 4) {
      return NextResponse.json(
        { error: "Perfil MBTI inválido" },
        { status: 400 }
      )
    }

    // Actualizar usuario con su perfil MBTI
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        mbtiProfile: profile,
        mbtiE: scores.E,
        mbtiS: scores.S,
        mbtiT: scores.T,
        mbtiJ: scores.J,
        quizCompletedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      profile: updatedUser.mbtiProfile
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
      profile: user?.mbtiProfile,
      scores: user?.mbtiProfile ? {
        E: user.mbtiE,
        S: user.mbtiS,
        T: user.mbtiT,
        J: user.mbtiJ
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
