// src/app/api/admin/stats/route.ts

import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// Verificar que el usuario es admin
async function isAdmin(session: any) {
  if (!session?.user?.id) return false
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  })
  
  return user?.role === 'ADMIN'
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!await isAdmin(session)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    // Fecha de hace 7 días
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    // Fecha de hace 30 días
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const [
      totalUsers,
      usersLast7Days,
      usersLast30Days,
      totalAnalyses,
      analysesLast7Days,
      usersByPlan,
      usersByArchetype,
      recentUsers
    ] = await Promise.all([
      // Total usuarios
      prisma.user.count(),
      
      // Usuarios últimos 7 días
      prisma.user.count({
        where: { createdAt: { gte: sevenDaysAgo } }
      }),
      
      // Usuarios últimos 30 días
      prisma.user.count({
        where: { createdAt: { gte: thirtyDaysAgo } }
      }),
      
      // Total análisis
      prisma.analysis.count(),
      
      // Análisis últimos 7 días
      prisma.analysis.count({
        where: { createdAt: { gte: sevenDaysAgo } }
      }),
      
      // Usuarios por plan
      prisma.user.groupBy({
        by: ['plan'],
        _count: { plan: true }
      }),
      
      // Usuarios por arquetipo
      prisma.user.groupBy({
        by: ['mbtiProfile'],
        _count: { mbtiProfile: true },
        where: { mbtiProfile: { not: null } }
      }),
      
      // Últimos 5 usuarios registrados
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          mbtiProfile: true
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      })
    ])

    return NextResponse.json({
      overview: {
        totalUsers,
        usersLast7Days,
        usersLast30Days,
        totalAnalyses,
        analysesLast7Days,
        avgAnalysesPerUser: totalUsers > 0 ? (totalAnalyses / totalUsers).toFixed(1) : 0
      },
      usersByPlan: usersByPlan.map(p => ({
        plan: p.plan,
        count: p._count.plan
      })),
      usersByArchetype: usersByArchetype
        .map(a => ({
          archetype: a.mbtiProfile,
          count: a._count.mbtiProfile
        }))
        .sort((a, b) => b.count - a.count),
      recentUsers
    })

  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Error al obtener estadísticas" }, { status: 500 })
  }
}
