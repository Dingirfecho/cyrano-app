// src/lib/cyrano-archetypes.ts

// Los 6 Arquetipos Cyrano de Dating
export interface CyranoArchetype {
  id: string
  name: string
  emoji: string
  tagline: string
  description: string
  weakness: string
  pattern: string
  advice: string
  color: string
}

export const cyranoArchetypes: Record<string, CyranoArchetype> = {
  INTERROGATOR: {
    id: 'INTERROGATOR',
    name: 'El Interrogador',
    emoji: '🔍',
    tagline: 'El que convierte citas en entrevistas de trabajo',
    description: 'Hacés preguntas en ráfaga, querés tener todo bajo control. Tratás el dating como un proceso de selección donde vos sos el reclutador.',
    weakness: 'Generás presión en vez de conexión. La otra persona siente que está rindiendo un examen.',
    pattern: 'Preguntas cerradas, logística prematura, poco espacio para el misterio.',
    advice: 'Aflojá el control. Dejá que la conversación fluya. No necesitás saber todo antes de la primera cita.',
    color: '#ef4444'
  },
  PLEASER: {
    id: 'PLEASER',
    name: 'El Complaciente',
    emoji: '🙇',
    tagline: 'El que dice que sí a todo y no desafía nunca',
    description: 'Estás tan enfocado en caer bien que perdés tu personalidad. Validás todo, nunca desafiás, sos demasiado disponible.',
    weakness: 'Sin fricción no hay atracción. Te ven como "buena persona" pero no como potencial pareja.',
    pattern: 'Respuestas siempre positivas, disponibilidad total, evitás cualquier conflicto.',
    advice: 'Tener opiniones propias es atractivo. Está bien no estar de acuerdo. No respondas al instante.',
    color: '#3b82f6'
  },
  LOGICIAN: {
    id: 'LOGICIAN',
    name: 'El Lógico',
    emoji: '🧠',
    tagline: 'El que explica todo y no siente nada',
    description: 'Convertís cada conversación en un debate o una clase. Analizás en vez de sentir. Explicás chistes en vez de reirte.',
    weakness: 'El dating es emocional, no racional. Nadie quiere un profesor, quieren una conexión.',
    pattern: 'Explicaciones largas, correcciones innecesarias, análisis excesivo.',
    advice: 'Menos cabeza, más corazón. No todo necesita una explicación. Sentí antes de pensar.',
    color: '#8b5cf6'
  },
  CLOWN: {
    id: 'CLOWN',
    name: 'El Payaso',
    emoji: '🎭',
    tagline: 'El que hace reír pero nunca conecta',
    description: 'Usás el humor como escudo. Todo es un chiste, nunca mostrás vulnerabilidad. Entretenés pero no conectás.',
    weakness: 'Te ven como divertido pero no como pareja seria. No pueden conocer al verdadero vos.',
    pattern: 'Chistes constantes, cambios de tema cuando se pone serio, evitás la profundidad.',
    advice: 'El humor es genial, pero la vulnerabilidad crea conexión. Mostrá quién sos de verdad.',
    color: '#f59e0b'
  },
  ANXIOUS: {
    id: 'ANXIOUS',
    name: 'El Ansioso',
    emoji: '😰',
    tagline: 'El que necesita respuesta YA',
    description: 'Cada minuto sin respuesta es una tortura. Mandás doble texto, interpretás silencios como rechazo, necesitás validación constante.',
    weakness: 'Tu ansiedad se transmite y genera presión. La otra persona siente que tiene que "cuidarte".',
    pattern: 'Doble texto, preguntas sobre el estado de la relación, interpretación excesiva.',
    advice: 'El silencio no es rechazo. Tené tu propia vida. La seguridad se construye, no se exige.',
    color: '#ec4899'
  },
  GHOST: {
    id: 'GHOST',
    name: 'El Fantasma',
    emoji: '👻',
    tagline: 'El que está pero no está',
    description: 'Respondés poco, tardás horas o días, parecés desinteresado. Puede ser timidez o puede ser que no sabés mostrar interés.',
    weakness: 'La otra persona no sabe si te interesa. Se cansan de perseguirte y se van.',
    pattern: 'Respuestas cortas, tiempos largos, poca iniciativa, mensajes fríos.',
    advice: 'Si te interesa, demostralo. No esperes que adivinen. Iniciá vos también.',
    color: '#6b7280'
  }
}

// Dimensiones que medimos
export interface DimensionScores {
  control: number      // Alto = quiere controlar, Bajo = fluye
  validation: number   // Alto = necesita validación, Bajo = seguro
  emotion: number      // Alto = emocional, Bajo = racional  
  vulnerability: number // Alto = vulnerable, Bajo = cerrado
  initiative: number   // Alto = proactivo, Bajo = pasivo
  patience: number     // Alto = paciente, Bajo = ansioso
}

export interface QuizQuestion {
  id: number
  text: string
  optionA: {
    text: string
    scores: Partial<DimensionScores>
  }
  optionB: {
    text: string
    scores: Partial<DimensionScores>
  }
}

export const quizQuestions: QuizQuestion[] = [
  // Bloque 1: Control vs Fluir
  {
    id: 1,
    text: "Vas a tener una primera cita. ¿Cómo la encarás?",
    optionA: {
      text: "Planeo todo: lugar, hora, temas de conversación de backup",
      scores: { control: 2 }
    },
    optionB: {
      text: "Elijo un lugar copado y dejo que fluya",
      scores: { control: -1 }
    }
  },
  {
    id: 2,
    text: "En el chat, la conversación se desvía del tema. Vos:",
    optionA: {
      text: "La vuelvo a encarrilar, me gusta ir al punto",
      scores: { control: 2 }
    },
    optionB: {
      text: "Sigo el nuevo tema, a veces lo random es más divertido",
      scores: { control: -1 }
    }
  },
  {
    id: 3,
    text: "Querés saber algo sobre la otra persona. ¿Cómo lo hacés?",
    optionA: {
      text: "Pregunto directo, no me gusta dar vueltas",
      scores: { control: 2, vulnerability: -1 }
    },
    optionB: {
      text: "Tiro un comentario relacionado y veo si surge naturalmente",
      scores: { control: -1, vulnerability: 1 }
    }
  },

  // Bloque 2: Necesidad de validación
  {
    id: 4,
    text: "Mandaste un mensaje y pasaron 3 horas sin respuesta. Pensás:",
    optionA: {
      text: "Estará ocupado/a, ya va a responder",
      scores: { validation: -1, patience: 2 }
    },
    optionB: {
      text: "¿Habré dicho algo mal? Releo el mensaje 5 veces",
      scores: { validation: 2, patience: -2 }
    }
  },
  {
    id: 5,
    text: "La cita salió bien pero no te escribió al día siguiente. Vos:",
    optionA: {
      text: "Le escribo yo, si me gustó no veo por qué esperar",
      scores: { initiative: 2, validation: -1 }
    },
    optionB: {
      text: "Espero que escriba primero para confirmar que le interesó",
      scores: { initiative: -1, validation: 2 }
    }
  },
  {
    id: 6,
    text: "Te hacen un cumplido. Tu reacción interna es:",
    optionA: {
      text: "Qué bueno, le gusto",
      scores: { validation: -1 }
    },
    optionB: {
      text: "¿Lo dirá en serio o es solo por ser amable?",
      scores: { validation: 2 }
    }
  },

  // Bloque 3: Emoción vs Lógica
  {
    id: 7,
    text: "Te cuentan un problema que tuvieron en el trabajo. Vos:",
    optionA: {
      text: "Escucho y pregunto cómo se sintió con eso",
      scores: { emotion: 2, vulnerability: 1 }
    },
    optionB: {
      text: "Analizo la situación y sugiero posibles soluciones",
      scores: { emotion: -2 }
    }
  },
  {
    id: 8,
    text: "Hay un tema donde no están de acuerdo. ¿Qué hacés?",
    optionA: {
      text: "Explico mi punto de vista con argumentos claros",
      scores: { emotion: -2, control: 1 }
    },
    optionB: {
      text: "Escucho su perspectiva y busco el punto medio",
      scores: { emotion: 1, vulnerability: 1 }
    }
  },
  {
    id: 9,
    text: "Te preguntan '¿qué sentís por mí?'. Respondés:",
    optionA: {
      text: "Me resulta fácil expresar lo que siento",
      scores: { emotion: 2, vulnerability: 2 }
    },
    optionB: {
      text: "Me cuesta, prefiero demostrarlo con acciones",
      scores: { emotion: -1, vulnerability: -1 }
    }
  },

  // Bloque 4: Vulnerabilidad vs Escudo
  {
    id: 10,
    text: "Algo te puso mal. En el chat con alguien que te gusta:",
    optionA: {
      text: "Le cuento lo que me pasa, me hace bien hablarlo",
      scores: { vulnerability: 2, emotion: 1 }
    },
    optionB: {
      text: "Hago como si nada, no quiero parecer negativo/a",
      scores: { vulnerability: -2 }
    }
  },
  {
    id: 11,
    text: "Cuando alguien te conoce, tiende a pensar que sos:",
    optionA: {
      text: "Divertido/a y fácil de llevar",
      scores: { vulnerability: -1 }
    },
    optionB: {
      text: "Profundo/a e interesante",
      scores: { vulnerability: 1, emotion: 1 }
    }
  },
  {
    id: 12,
    text: "El humor en tus conversaciones es:",
    optionA: {
      text: "Constante, me gusta mantener el tono liviano",
      scores: { vulnerability: -2, emotion: -1 }
    },
    optionB: {
      text: "Natural, pero también hay lugar para charlas serias",
      scores: { vulnerability: 1, emotion: 1 }
    }
  },

  // Bloque 5: Iniciativa
  {
    id: 13,
    text: "Te gusta alguien que conociste. ¿Quién manda el primer mensaje?",
    optionA: {
      text: "Yo, si espero capaz no pasa nada",
      scores: { initiative: 2 }
    },
    optionB: {
      text: "Prefiero esperar alguna señal de su parte",
      scores: { initiative: -2 }
    }
  },
  {
    id: 14,
    text: "En general, las citas las proponés:",
    optionA: {
      text: "Yo la mayoría de las veces",
      scores: { initiative: 2, control: 1 }
    },
    optionB: {
      text: "Espero que surja de los dos, no quiero parecer intenso/a",
      scores: { initiative: -1, validation: 1 }
    }
  },
  {
    id: 15,
    text: "La conversación por chat se murió. Vos:",
    optionA: {
      text: "Mando algo para revivirla, un meme o un tema nuevo",
      scores: { initiative: 2 }
    },
    optionB: {
      text: "Si no me escribe, no voy a ser yo quien insista",
      scores: { initiative: -2, patience: 1 }
    }
  },

  // Bloque 6: Paciencia vs Ansiedad
  {
    id: 16,
    text: "Están saliendo hace unas semanas. Querés saber '¿qué somos?':",
    optionA: {
      text: "Se lo pregunto, prefiero tener las cosas claras",
      scores: { patience: -2, control: 2 }
    },
    optionB: {
      text: "Dejo que se defina solo, no hay apuro",
      scores: { patience: 2 }
    }
  },
  {
    id: 17,
    text: "Después de escribir un mensaje, vos:",
    optionA: {
      text: "Lo mando y sigo con mi vida",
      scores: { patience: 2, validation: -1 }
    },
    optionB: {
      text: "Quedo pendiente del celular esperando respuesta",
      scores: { patience: -2, validation: 2 }
    }
  },
  {
    id: 18,
    text: "La persona que te gusta está online pero no te respondió. Pensás:",
    optionA: {
      text: "Tendrá sus cosas, ya responderá",
      scores: { patience: 2, validation: -1 }
    },
    optionB: {
      text: "Si está online y no responde, algo pasa",
      scores: { patience: -2, validation: 2 }
    }
  },

  // Bloque 7: Preguntas de desempate/confirmación
  {
    id: 19,
    text: "Si tuvieras que elegir un defecto en el dating, sería:",
    optionA: {
      text: "A veces soy muy intenso/a o insistente",
      scores: { patience: -1, validation: 1 }
    },
    optionB: {
      text: "A veces parezco frío/a o desinteresado/a",
      scores: { initiative: -1, vulnerability: -1 }
    }
  },
  {
    id: 20,
    text: "La gente que te conoce diría que tu problema en el amor es:",
    optionA: {
      text: "Me enfoco demasiado en la otra persona",
      scores: { validation: 2, control: 1 }
    },
    optionB: {
      text: "Me cuesta abrirme y mostrar interés",
      scores: { vulnerability: -2, initiative: -1 }
    }
  }
]

// Función para calcular el arquetipo basado en las respuestas
export function calculateArchetype(answers: Record<number, 'A' | 'B'>): {
  archetype: CyranoArchetype
  scores: DimensionScores
  secondaryArchetype?: CyranoArchetype
} {
  // Inicializar scores
  const scores: DimensionScores = {
    control: 0,
    validation: 0,
    emotion: 0,
    vulnerability: 0,
    initiative: 0,
    patience: 0
  }

  // Calcular scores basado en respuestas
  quizQuestions.forEach(q => {
    const answer = answers[q.id]
    if (!answer) return
    
    const selectedOption = answer === 'A' ? q.optionA : q.optionB
    
    Object.entries(selectedOption.scores).forEach(([key, value]) => {
      scores[key as keyof DimensionScores] += value
    })
  })

  // Determinar arquetipo basado en combinación de scores
  const archetypeScores: Record<string, number> = {
    INTERROGATOR: 0,
    PLEASER: 0,
    LOGICIAN: 0,
    CLOWN: 0,
    ANXIOUS: 0,
    GHOST: 0
  }

  // INTERROGATOR: Alto control, baja emoción
  archetypeScores.INTERROGATOR = scores.control * 2 - scores.emotion - scores.patience

  // PLEASER: Alta validación, baja iniciativa, alta paciencia
  archetypeScores.PLEASER = scores.validation * 1.5 - scores.initiative + scores.patience * 0.5 - scores.control

  // LOGICIAN: Baja emoción, baja vulnerabilidad, alto control
  archetypeScores.LOGICIAN = -scores.emotion * 2 - scores.vulnerability + scores.control

  // CLOWN: Baja vulnerabilidad, alta iniciativa, baja emoción (usa humor como escudo)
  archetypeScores.CLOWN = -scores.vulnerability * 2 + scores.initiative * 0.5 - scores.emotion * 0.5

  // ANXIOUS: Alta validación, baja paciencia, alta emoción
  archetypeScores.ANXIOUS = scores.validation * 2 - scores.patience * 2 + scores.emotion * 0.5

  // GHOST: Baja iniciativa, baja vulnerabilidad, baja emoción
  archetypeScores.GHOST = -scores.initiative * 2 - scores.vulnerability - scores.emotion * 0.5

  // Encontrar el arquetipo principal y secundario
  const sorted = Object.entries(archetypeScores).sort((a, b) => b[1] - a[1])
  
  const primaryId = sorted[0][0]
  const secondaryId = sorted[1][0]

  return {
    archetype: cyranoArchetypes[primaryId],
    scores,
    secondaryArchetype: sorted[1][1] > 0 ? cyranoArchetypes[secondaryId] : undefined
  }
}

// Para el quiz rápido (10 preguntas)
export const quickQuizIds = [1, 4, 7, 10, 13, 16, 17, 18, 19, 20]
