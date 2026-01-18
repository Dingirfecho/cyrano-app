// src/app/api/analyze/route.ts

import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import Anthropic from "@anthropic-ai/sdk"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CYRANO_SYSTEM_PROMPT } from "@/lib/cyrano-prompt"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado. Iniciá sesión primero." },
        { status: 401 }
      )
    }

    // Check credits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true, plan: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      )
    }

    if (user.credits <= 0 && user.plan === "FREE") {
      return NextResponse.json(
        { error: "Sin créditos. Actualizá tu plan para seguir analizando." },
        { status: 403 }
      )
    }

    // Get conversation text from request
    const { conversation } = await req.json()

    if (!conversation || conversation.trim().length < 10) {
      return NextResponse.json(
        { error: "La conversación es muy corta para analizar." },
        { status: 400 }
      )
    }

    // Call Claude API
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      system: CYRANO_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Analizá esta conversación de dating:\n\n${conversation}`
        }
      ]
    })

    // Extract text response
    const responseText = message.content[0].type === "text" 
      ? message.content[0].text 
      : ""

    // Parse JSON response
    let analysisData
    try {
      analysisData = JSON.parse(responseText)
    } catch {
      // If parsing fails, return raw response
      return NextResponse.json({
        raw: responseText,
        error: "No se pudo estructurar el análisis"
      })
    }

    // Deduct credit (only for FREE plan)
    if (user.plan === "FREE") {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { credits: { decrement: 1 } }
      })
    }

    // Save analysis to database
    if (analysisData.perfil) {
      await prisma.analysis.create({
        data: {
          userId: session.user.id,
          inputText: conversation,
          mbtiProfile: analysisData.perfil.mbti,
          discVector: analysisData.perfil.disc,
          archetype: analysisData.arquetipo.codigo,
          diagnosis: analysisData.fallo.explicacion,
          corrections: analysisData.correcciones
        }
      })
    }

    return NextResponse.json({
      analysis: analysisData,
      creditsRemaining: user.plan === "FREE" ? user.credits - 1 : "unlimited"
    })

  } catch (error) {
    console.error("Error in analyze:", error)
    return NextResponse.json(
      { error: "Error al procesar el análisis. Intentá de nuevo." },
      { status: 500 }
    )
  }
}
