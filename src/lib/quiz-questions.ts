// src/lib/quiz-questions.ts

export interface Question {
  id: number
  dimension: 'EI' | 'SN' | 'TF' | 'JP'
  text: string
  optionA: {
    text: string
    score: 'E' | 'S' | 'T' | 'J'
  }
  optionB: {
    text: string
    score: 'I' | 'N' | 'F' | 'P'
  }
}

export const quizQuestions: Question[] = [
  // Dimensión E/I - Energía (4 preguntas)
  {
    id: 1,
    dimension: 'EI',
    text: "Después de una primera cita que salió bien, vos:",
    optionA: {
      text: "Le contás a tus amigos inmediatamente y querés salir de nuevo pronto",
      score: 'E'
    },
    optionB: {
      text: "Necesitás tiempo a solas para procesar cómo te sentís antes de hablar",
      score: 'I'
    }
  },
  {
    id: 2,
    dimension: 'EI',
    text: "En una fiesta donde podrías conocer gente nueva:",
    optionA: {
      text: "Te energiza hablar con muchas personas diferentes",
      score: 'E'
    },
    optionB: {
      text: "Preferís una conversación profunda con una o dos personas",
      score: 'I'
    }
  },
  {
    id: 3,
    dimension: 'EI',
    text: "Cuando te gusta alguien:",
    optionA: {
      text: "Se lo hacés saber bastante rápido, sos directo/a",
      score: 'E'
    },
    optionB: {
      text: "Observás y esperás señales antes de mostrar interés",
      score: 'I'
    }
  },
  {
    id: 4,
    dimension: 'EI',
    text: "Tu forma ideal de conocer a alguien nuevo es:",
    optionA: {
      text: "En un evento social, bar, o a través de amigos en común",
      score: 'E'
    },
    optionB: {
      text: "Por una app donde podés chatear primero y conocerlo/a gradualmente",
      score: 'I'
    }
  },

  // Dimensión S/N - Información (4 preguntas)
  {
    id: 5,
    dimension: 'SN',
    text: "Cuando conocés a alguien, te fijás más en:",
    optionA: {
      text: "Detalles concretos: cómo viste, qué hace, dónde vive",
      score: 'S'
    },
    optionB: {
      text: "La vibra general: si hay química, si es interesante, el potencial",
      score: 'N'
    }
  },
  {
    id: 6,
    dimension: 'SN',
    text: "En una conversación de dating, preferís hablar de:",
    optionA: {
      text: "Experiencias reales: viajes, trabajo, hobbies, anécdotas",
      score: 'S'
    },
    optionB: {
      text: "Ideas y posibilidades: sueños, teorías, 'qué pasaría si...'",
      score: 'N'
    }
  },
  {
    id: 7,
    dimension: 'SN',
    text: "Al planear una cita, vos:",
    optionA: {
      text: "Buscás un lugar probado que sabés que funciona",
      score: 'S'
    },
    optionB: {
      text: "Te gusta improvisar o probar algo nuevo y diferente",
      score: 'N'
    }
  },
  {
    id: 8,
    dimension: 'SN',
    text: "Cuando alguien te cuenta algo, tendés a:",
    optionA: {
      text: "Escuchar los hechos y detalles específicos",
      score: 'S'
    },
    optionB: {
      text: "Leer entre líneas y buscar el significado más profundo",
      score: 'N'
    }
  },

  // Dimensión T/F - Decisiones (4 preguntas)
  {
    id: 9,
    dimension: 'TF',
    text: "Si una cita no funcionó, pensás:",
    optionA: {
      text: "Analizás objetivamente qué salió mal para no repetirlo",
      score: 'T'
    },
    optionB: {
      text: "Te enfocás en cómo te hizo sentir y si hubo conexión real",
      score: 'F'
    }
  },
  {
    id: 10,
    dimension: 'TF',
    text: "Al elegir con quién salir, priorizás:",
    optionA: {
      text: "Compatibilidad práctica: valores, metas, estilo de vida",
      score: 'T'
    },
    optionB: {
      text: "La conexión emocional y cómo te hace sentir",
      score: 'F'
    }
  },
  {
    id: 11,
    dimension: 'TF',
    text: "Cuando tu pareja tiene un problema, vos:",
    optionA: {
      text: "Ofrecés soluciones y formas de arreglarlo",
      score: 'T'
    },
    optionB: {
      text: "Escuchás y validás sus sentimientos primero",
      score: 'F'
    }
  },
  {
    id: 12,
    dimension: 'TF',
    text: "En una discusión de pareja, es más importante:",
    optionA: {
      text: "Tener razón y resolver el problema lógicamente",
      score: 'T'
    },
    optionB: {
      text: "Mantener la armonía y que ambos se sientan bien",
      score: 'F'
    }
  },

  // Dimensión J/P - Estilo de vida (4 preguntas)
  {
    id: 13,
    dimension: 'JP',
    text: "Con respecto a las citas, vos:",
    optionA: {
      text: "Preferís planear con anticipación: día, hora, lugar definidos",
      score: 'J'
    },
    optionB: {
      text: "Te gusta dejar las cosas abiertas y ver qué surge",
      score: 'P'
    }
  },
  {
    id: 14,
    dimension: 'JP',
    text: "Cuando estás conociendo a alguien:",
    optionA: {
      text: "Querés saber pronto hacia dónde va la relación",
      score: 'J'
    },
    optionB: {
      text: "Preferís dejar que las cosas fluyan naturalmente",
      score: 'P'
    }
  },
  {
    id: 15,
    dimension: 'JP',
    text: "Los mensajes sin respuesta te generan:",
    optionA: {
      text: "Ansiedad, preferís respuestas claras y rápidas",
      score: 'J'
    },
    optionB: {
      text: "No te estresás mucho, cada uno tiene sus tiempos",
      score: 'P'
    }
  },
  {
    id: 16,
    dimension: 'JP',
    text: "Tu estilo de textear es:",
    optionA: {
      text: "Respondés rápido y esperás lo mismo",
      score: 'J'
    },
    optionB: {
      text: "A veces tardás, te distraés con otras cosas",
      score: 'P'
    }
  }
]

// Quiz rápido: 2 preguntas por dimensión (IDs: 1,3 para EI, 5,7 para SN, 9,11 para TF, 13,15 para JP)
export const quickQuizIds = [1, 3, 5, 7, 9, 11, 13, 15]

export function calculateMBTI(answers: Record<number, 'A' | 'B'>): {
  profile: string
  scores: { E: number, S: number, T: number, J: number }
} {
  const scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  }

  quizQuestions.forEach(q => {
    const answer = answers[q.id]
    if (answer === 'A') {
      scores[q.optionA.score]++
    } else if (answer === 'B') {
      scores[q.optionB.score]++
    }
  })

  const profile = 
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P')

  // Convertir a porcentajes (0-100)
  const totalEI = scores.E + scores.I
  const totalSN = scores.S + scores.N
  const totalTF = scores.T + scores.F
  const totalJP = scores.J + scores.P

  return {
    profile,
    scores: {
      E: totalEI > 0 ? Math.round((scores.E / totalEI) * 100) : 50,
      S: totalSN > 0 ? Math.round((scores.S / totalSN) * 100) : 50,
      T: totalTF > 0 ? Math.round((scores.T / totalTF) * 100) : 50,
      J: totalJP > 0 ? Math.round((scores.J / totalJP) * 100) : 50
    }
  }
}

export const mbtiDescriptions: Record<string, { name: string, weakness: string }> = {
  'INTJ': { name: 'El Estratega', weakness: 'Planificás demasiado, no fluís' },
  'INTP': { name: 'El Arquitecto', weakness: 'Sobre-analizás todo, explicás de más' },
  'ENTJ': { name: 'El Comandante', weakness: 'Convertís el chat en negociación' },
  'ENTP': { name: 'El Debatidor', weakness: 'Discutís todo, no mostrás vulnerabilidad' },
  'INFJ': { name: 'El Consejero', weakness: 'Psicoanálisis no solicitado, muy intenso' },
  'INFP': { name: 'El Mediador', weakness: 'Ponés en pedestal, textos muy largos' },
  'ENFJ': { name: 'El Protagonista', weakness: 'Querés "arreglar" al otro' },
  'ENFP': { name: 'El Activista', weakness: 'Caótico, love bombing y ghosting' },
  'ISTJ': { name: 'El Logístico', weakness: 'Solo hechos y horarios, cero coqueteo' },
  'ISFJ': { name: 'El Defensor', weakness: 'Servilismo extremo, pedís perdón por todo' },
  'ESTJ': { name: 'El Ejecutivo', weakness: 'Micro-management, exigís planes' },
  'ESFJ': { name: 'El Cónsul', weakness: 'Necesitás validación constante' },
  'ISTP': { name: 'El Virtuoso', weakness: 'Monosílabos, parecés que odiás al match' },
  'ISFP': { name: 'El Aventurero', weakness: 'Pasivo-agresivo, te cerrás' },
  'ESTP': { name: 'El Emprendedor', weakness: 'Muy sexual muy rápido' },
  'ESFP': { name: 'El Animador', weakness: 'Attention seeking, conversación vacía' }
}
