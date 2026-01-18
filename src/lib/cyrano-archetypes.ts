// src/lib/cyrano-archetypes.ts

// Los 6 Arquetipos Cyrano de Dating - Versión Expandida con MBTI + DISC

export interface CyranoArchetype {
  id: string
  name: string
  emoji: string
  tagline: string
  
  // Descripción expandida
  description: string
  deepDive: string
  
  // Conexiones psicométricas
  mbtiConnection: {
    types: string[]  // Tipos MBTI más comunes
    dominantFunction: string
    explanation: string
  }
  discConnection: {
    primary: string  // D, I, S, o C
    secondary: string
    profile: string  // Ej: "Alto D, Alto C"
    explanation: string
  }
  
  // Análisis del problema
  weakness: string
  blindSpot: string
  rootCause: string
  
  // Patrones observables
  patterns: {
    inChat: string[]
    inDates: string[]
    redFlags: string[]
  }
  
  // Soluciones
  advice: string
  exercises: string[]
  mantras: string[]
  
  color: string
}

export const cyranoArchetypes: Record<string, CyranoArchetype> = {
  INTERROGATOR: {
    id: 'INTERROGATOR',
    name: 'El Interrogador',
    emoji: '🔍',
    tagline: 'El que convierte citas en entrevistas de trabajo',
    color: '#ef4444',
    
    description: 'Hacés preguntas en ráfaga, querés tener todo bajo control. Tratás el dating como un proceso de selección donde vos sos el reclutador. Necesitás información antes de poder relajarte, y esa necesidad se transmite como presión.',
    
    deepDive: `El Interrogador opera desde un lugar de control defensivo. Tu cerebro está constantemente evaluando "¿es esta persona compatible conmigo?" en vez de simplemente disfrutar el momento. Esto viene de una necesidad profunda de minimizar riesgos emocionales: si podés predecir cómo va a ser la relación, podés evitar el dolor de la incertidumbre.

El problema es que el dating requiere exactamente eso: tolerar la incertidumbre. Cuando bombardeás con preguntas, la otra persona siente que está siendo evaluada, no conocida. Hay una diferencia enorme entre "cuéntame de vos" y "¿cuántos hermanos tenés? ¿a qué te dedicás? ¿qué hacés los fines de semana?". Lo primero abre espacio, lo segundo cierra.

Tu estilo de comunicación tiende a ser transaccional: pregunta-respuesta-pregunta-respuesta. Esto mata la posibilidad de que la conversación fluya orgánicamente hacia lugares inesperados, que es donde se genera la conexión real.

Además, tu necesidad de planificar todo (el lugar, la hora, los temas de conversación) puede hacer que la cita se sienta como un evento corporativo en vez de un encuentro romántico. La otra persona percibe que no hay espacio para la espontaneidad, y eso mata la atracción.`,

    mbtiConnection: {
      types: ['ESTJ', 'ENTJ', 'ISTJ', 'INTJ'],
      dominantFunction: 'Te (Pensamiento Extravertido) o Te auxiliar',
      explanation: `Los tipos con Te dominante o auxiliar tienden a este patrón porque su función cognitiva principal busca organizar el mundo externo de manera eficiente. En el dating, esto se traduce en querer "procesar" a la otra persona como si fuera un proyecto.

Los ESTJ y ENTJ son especialmente propensos porque combinan Te con una orientación hacia la acción. Quieren resultados, y el dating les parece ineficiente. Los ISTJ e INTJ lo hacen desde un lugar más reservado: recolectan datos antes de mostrar interés.

El stack cognitivo Te-Si (ESTJ, ISTJ) lleva a preguntas sobre hechos concretos: trabajo, familia, planes. El stack Te-Ni (ENTJ, INTJ) lleva a preguntas más estratégicas: valores, metas, visión de futuro. Ambos son interrogatorios, solo que de distinto tipo.`
    },
    
    discConnection: {
      primary: 'D',
      secondary: 'C',
      profile: 'Alto D, Alto C',
      explanation: `El perfil D alto te hace directo, orientado a resultados, y con baja tolerancia a la ambigüedad. Querés saber dónde estás parado. El C alto agrega la necesidad de información detallada y precisa antes de tomar decisiones.

Esta combinación es explosiva en el dating: el D quiere avanzar rápido, el C quiere tener todos los datos. El resultado es un interrogatorio eficiente. Hacés las preguntas correctas para obtener la información que necesitás, pero te olvidás de que el dating no es un proceso de due diligence.

El I bajo significa que no priorizás la conexión emocional superficial (small talk, humor liviano). El S bajo significa que no te tomás el tiempo de crear un ambiente cómodo. Vas directo al grano, y eso asusta.`
    },
    
    weakness: 'Generás presión en vez de conexión. La otra persona siente que está rindiendo un examen, no teniendo una cita.',
    
    blindSpot: 'Creés que estás siendo eficiente y directo, pero la otra persona te percibe como intenso, controlador, o simplemente agotador. No te das cuenta de que las mejores conexiones se forman en el espacio entre las preguntas, no en las respuestas.',
    
    rootCause: 'Miedo a perder el tiempo o a ser lastimado. Si podés evaluar rápido, podés descartar rápido y protegerte de invertir emocionalmente en alguien que no vale la pena.',
    
    patterns: {
      inChat: [
        'Preguntas cerradas en ráfaga (¿De dónde sos? ¿A qué te dedicás? ¿Tenés hermanos?)',
        'Poca reciprocidad - preguntás más de lo que compartís',
        'Saltar a logística muy rápido (¿Cuándo nos vemos? ¿Qué día te queda bien?)',
        'Respuestas cortas cuando te preguntan, pero esperás respuestas largas',
        'Cambiar de tema abruptamente cuando ya "tenés" la información que querías'
      ],
      inDates: [
        'Llevar una lista mental (o real) de temas a cubrir',
        'Interrumpir para hacer la siguiente pregunta',
        'Incomodidad con los silencios - los llenás con más preguntas',
        'Evaluar mentalmente las respuestas en vez de escuchar',
        'Planear todo: lugar, hora, duración, siguiente paso'
      ],
      redFlags: [
        'La otra persona da respuestas cada vez más cortas',
        'Te dicen "me siento en una entrevista"',
        'Evitan profundizar en temas personales',
        'La conversación se siente como ping-pong, no como baile'
      ]
    },
    
    advice: 'Aflojá el control. No necesitás saber todo antes de decidir si te gusta alguien. Dejá que la conversación fluya, tolerá la incertidumbre, y recordá que estás conociendo a una persona, no evaluando un currículum.',
    
    exercises: [
      'En tu próximo chat, por cada pregunta que hagas, compartí algo de vos primero',
      'Practicá hacer preguntas abiertas que no se respondan con un dato: "¿Qué es lo que más te apasiona?" en vez de "¿Cuál es tu trabajo?"',
      'En una cita, proponete NO hacer ninguna pregunta directa por los primeros 15 minutos. Solo comentá, reaccioná, compartí',
      'Cuando sientas la urgencia de preguntar algo, esperá 10 segundos. A veces la otra persona lo va a decir sola',
      'Dejá que haya silencios. No los llenes con preguntas. El silencio cómodo es intimidad'
    ],
    
    mantras: [
      'No estoy evaluando, estoy conociendo',
      'La incertidumbre es parte del romance',
      'Menos preguntas, más presencia',
      'Si tengo que forzar la información, no es el momento'
    ]
  },

  PLEASER: {
    id: 'PLEASER',
    name: 'El Complaciente',
    emoji: '🙇',
    tagline: 'El que dice que sí a todo y no desafía nunca',
    color: '#3b82f6',
    
    description: 'Estás tan enfocado en caer bien que perdés tu personalidad. Validás todo, nunca desafiás, sos demasiado disponible. Tu estrategia es ser tan agradable que la otra persona no pueda rechazarte.',
    
    deepDive: `El Complaciente opera desde el miedo al rechazo. Tu estrategia inconsciente es: "si nunca genero fricción, nunca me van a dejar". Pero la ironía cruel es que la ausencia total de fricción también mata la atracción.

Lo que no entendés es que la atracción requiere diferenciación. Cuando estás de acuerdo con todo, cuando nunca tenés una opinión propia, cuando siempre estás disponible, dejás de ser una persona y te convertís en un espejo. Y nadie quiere salir con un espejo.

Tu disponibilidad extrema comunica desesperación, aunque no la sientas. Respondés al instante, siempre estás libre, aceptás cualquier plan. Esto le dice a la otra persona: "no tengo vida propia, mi felicidad depende de vos". Es una carga enorme, y nadie quiere cargarla.

Además, cuando nunca desafiás, la otra persona no tiene forma de conocerte realmente. Las opiniones, incluso las que generan debate, son ventanas a tu interior. Si nunca mostrás nada, quedás como una cáscara vacía. Agradable, sí. Pero no memorable.

El problema más profundo es que esta estrategia atrae exactamente lo que no querés: personas que van a aprovecharse de tu complacencia, o personas que se van a aburrir de tu falta de sustancia. Las personas sanas buscan parejas con espina dorsal.`,

    mbtiConnection: {
      types: ['ISFJ', 'ESFJ', 'INFP', 'ENFP'],
      dominantFunction: 'Fe (Sentimiento Extravertido) o Fi con baja asertividad',
      explanation: `Los tipos con Fe dominante (ESFJ, ENFJ) o auxiliar (ISFJ, INFJ) priorizan la armonía grupal sobre la expresión individual. En el dating, esto se traduce en moldear tu personalidad a lo que la otra persona parece querer.

Los ISFJ son especialmente vulnerables por su combinación de Fe con Si (Sensación Introvertida): quieren cuidar a la otra persona Y seguir las normas sociales de "ser buena pareja". Terminan anticipando necesidades que nadie les pidió.

Los INFP y ENFP (con Fi dominante) pueden caer en esto no por Fe sino por su idealización del amor. Tienen una imagen tan perfecta de la relación que suprimen cualquier cosa que pueda arruinarla. Posponen sus necesidades "hasta que la relación esté más sólida"... pero ese momento nunca llega.

El problema cognitivo central es la falta de Ti (Pensamiento Introvertido) en el stack principal. Sin Ti, no hay un filtro interno que diga "espera, esto no tiene sentido para mí". Todo se procesa en términos de "¿qué quiere el otro?" sin preguntar "¿qué quiero yo?".`
    },
    
    discConnection: {
      primary: 'S',
      secondary: 'I',
      profile: 'Alto S, Alto I, Bajo D',
      explanation: `El S alto te hace orientado a la estabilidad, paciente, y con alta tolerancia a situaciones incómodas (que aguantás en vez de confrontar). El I alto te hace querer caer bien y evitar conflictos sociales.

El D bajo es el factor crítico: no tenés el impulso de imponer tu voluntad o defender tu territorio. Cedés automáticamente porque la confrontación te parece más costosa que la capitulación.

Esta combinación crea un patrón donde priorizás la comodidad del otro sobre tu propia autenticidad. Decís que sí cuando querés decir que no. Aceptás planes que no te gustan. Tolerás comportamientos que te molestan. Todo para "no hacer olas".

El C bajo significa que no analizás críticamente si esta estrategia está funcionando. Seguís haciendo lo mismo porque "así soy yo", sin cuestionar si es efectivo.`
    },
    
    weakness: 'Sin fricción no hay atracción. Te ven como "buena persona" pero no como potencial pareja. Sos el amigo, no el candidato romántico.',
    
    blindSpot: 'Creés que ser complaciente es ser buena pareja, pero en realidad es ser cobarde. No estás siendo amable, estás evitando el rechazo a costa de tu autenticidad.',
    
    rootCause: 'Creencia de que tu valor depende de que otros te aprueben. Miedo a que si mostrás quién sos realmente, no vas a gustar.',
    
    patterns: {
      inChat: [
        'Responder siempre al toque (aunque estés ocupado)',
        'Estar de acuerdo con todas las opiniones de la otra persona',
        'Nunca proponer un plan diferente al sugerido',
        'Usar muchos emojis, "jaja", y signos de exclamación para parecer entusiasta',
        'Pedir perdón por cosas que no requieren disculpa',
        'Preguntar "¿vos qué preferís?" antes de dar tu opinión'
      ],
      inDates: [
        'Dejar que la otra persona elija todo: lugar, comida, actividad',
        'Reírte de chistes que no te parecen graciosos',
        'No mencionar cosas que te molestan o incomodan',
        'Ofrecer pagar siempre, llevar regalos, hacer favores no solicitados',
        'Evitar hablar de vos para no "aburrir" a la otra persona'
      ],
      redFlags: [
        'La otra persona empieza a tomarte por sentado',
        'Te cancelan planes y no pasa nada',
        'Sentís que das más de lo que recibís',
        'La otra persona te ve como "too nice" o "too available"'
      ]
    },
    
    advice: 'Tener opiniones propias es atractivo. Está bien no estar de acuerdo. No respondas al instante. Dejá que te extrañen. Tu valor no depende de que todos te aprueben.',
    
    exercises: [
      'Esperá al menos 30 minutos antes de responder un mensaje (aunque lo hayas visto)',
      'En tu próxima conversación, expresá una opinión contraria a la de la otra persona (aunque sea sobre algo menor)',
      'Decí que no a un plan y proponé una alternativa que vos prefieras',
      'Dejá de pedir perdón por cosas que no son tu culpa. Contá cuántas veces decís "perdón" en un día',
      'Antes de decir que sí a algo, preguntate: "¿realmente quiero esto, o solo estoy evitando conflicto?"'
    ],
    
    mantras: [
      'Mi opinión importa tanto como la suya',
      'No soy responsable de cómo se sienten los demás',
      'Si no les gusta quién soy, no son para mí',
      'La mejor manera de caer bien es ser auténtico, no complaciente'
    ]
  },

  LOGICIAN: {
    id: 'LOGICIAN',
    name: 'El Lógico',
    emoji: '🧠',
    tagline: 'El que explica todo y no siente nada',
    color: '#8b5cf6',
    
    description: 'Convertís cada conversación en un debate o una clase. Analizás en vez de sentir. Explicás chistes en vez de reírte. Tu cabeza va tan rápido que tu corazón no puede seguirte el ritmo.',
    
    deepDive: `El Lógico usa el intelecto como escudo emocional. Tu cerebro es tu zona de confort, y cuando una situación se pone emocionalmente intensa, te retirás a ese lugar seguro. El problema es que el dating es fundamentalmente un juego emocional, no intelectual.

Cuando alguien te cuenta algo que le pasó, tu primer instinto es analizarlo, no conectar con cómo se sintió. Cuando hay un momento romántico, tu cabeza empieza a procesar "¿qué significa esto? ¿hacia dónde va? ¿cuáles son las implicaciones?". Para cuando terminás de pensar, el momento ya pasó.

Tu necesidad de tener razón es un problema serio. No podés dejar pasar una inexactitud, una generalización, un argumento mal construido. Tenés que corregir. Y aunque técnicamente tengas razón, emocionalmente estás matando la conexión. Nadie quiere sentirse evaluado o corregido en una cita.

Los mensajes largos son tu sello. Donde otros ponen "jaja qué loco", vos escribís tres párrafos explicando por qué es loco y cuáles son las causas históricas de esa locura. Es agotador para quien lo recibe.

El problema más profundo es que usás la lógica para evitar la vulnerabilidad. Si todo es un análisis, nada es personal. Si todo tiene explicación, nada duele. Pero el costo es que tampoco nada conecta.`,

    mbtiConnection: {
      types: ['INTP', 'ENTP', 'INTJ', 'ISTP'],
      dominantFunction: 'Ti (Pensamiento Introvertido) o Ni con Ti auxiliar',
      explanation: `Los tipos con Ti dominante (INTP, ISTP) o prominente (ENTP) procesan todo a través de marcos lógicos internos. El dating, que es inherentemente ilógico, les genera cortocircuito. Intentan meter la atracción y el romance en categorías que no aplican.

El INTP es el caso más extremo: Ti-Ne crea un loop infinito de análisis. Ven todas las posibilidades, analizan cada una, y terminan paralizados o, peor, explicando su parálisis en detalle.

El ENTP es similar pero más social: Ti-Ne con Fe terciario. Puede debatir encantadoramente, pero confunde debate con conexión. Cree que si "gana" la conversación, gana atracción. No funciona así.

El INTJ (Ni-Te) tiene un problema diferente: ve patrones, hace predicciones, y trata de optimizar la relación antes de que exista. Es el que ya planeó los próximos 5 años cuando todavía están en la segunda cita.

El problema cognitivo central es la falta de Fe (Sentimiento Extravertido) en posición alta. Sin Fe, no hay lectura natural de las emociones ajenas ni habilidad para crear ambiente emocional.`
    },
    
    discConnection: {
      primary: 'C',
      secondary: 'D',
      profile: 'Alto C, variable D, Bajo I, Bajo S',
      explanation: `El C alto te hace orientado a la precisión, analítico, y con alta necesidad de entender antes de actuar. Cada situación es un problema a resolver, cada persona un sistema a descifrar.

El I bajo es crítico: no priorizás la conexión emocional superficial, el small talk, la liviandad. Te parece una pérdida de tiempo. Querés ir a lo "importante" (para vos: ideas, análisis, debate).

El S bajo significa que no creás ambientes cómodos ni te tomás el tiempo de "calentar" la conversación. Entrás directo a lo profundo sin construir la rampa.

El D puede variar: algunos Lógicos son pasivos (esperan que el otro inicie), otros son activamente dominantes (imponen su marco de análisis). En ambos casos, el resultado es el mismo: mucha cabeza, poco corazón.`
    },
    
    weakness: 'El dating es emocional, no racional. Nadie quiere un profesor, quieren una conexión. Tu análisis es correcto pero irrelevante.',
    
    blindSpot: 'Creés que ser inteligente es atractivo. Y lo es, pero solo si viene acompañado de calidez emocional. La inteligencia sin conexión es frío. Y frío no calienta a nadie.',
    
    rootCause: 'Miedo a la vulnerabilidad emocional. El intelecto es tu zona segura porque ahí no te pueden lastimar. Si todo es análisis, nada es personal.',
    
    patterns: {
      inChat: [
        'Mensajes largos que parecen ensayos',
        'Explicar chistes o referencias en vez de simplemente disfrutarlos',
        'Corregir errores factuales o gramaticales',
        'Usar palabras técnicas o rebuscadas innecesariamente',
        'Responder a una anécdota emocional con un análisis de por qué pasó',
        'Debatir opiniones en vez de aceptar diferencias'
      ],
      inDates: [
        'Dar una clase sobre un tema que la otra persona mencionó casualmente',
        'Analizar la dinámica de la cita EN la cita',
        'Incapacidad de mantener conversación liviana por más de 5 minutos',
        'Incomodidad visible con muestras de afecto espontáneas',
        'Necesidad de tener razón incluso en discusiones triviales'
      ],
      redFlags: [
        'La otra persona dice "no todo tiene que ser tan profundo"',
        'Te evitan para temas emocionales',
        'Sienten que no los escuchás realmente, solo preparás tu respuesta',
        'La conversación se siente como un podcast, no como una cita'
      ]
    },
    
    advice: 'Menos cabeza, más corazón. No todo necesita una explicación. Cuando alguien te cuenta algo, conectá con cómo se sintió antes de analizar qué pasó. Practicá estar presente sin procesar.',
    
    exercises: [
      'Cuando alguien te cuente algo, tu primera respuesta tiene que ser sobre cómo se sintió, no sobre qué pasó',
      'Limitá tus mensajes a 3 oraciones máximo. Si no entra, es que estás sobre-explicando',
      'Practicá conversaciones donde tu único objetivo es hacer reír a la otra persona, no enseñarle nada',
      'Cuando tengas ganas de corregir algo, preguntate: "¿esto va a mejorar la conexión o solo mi ego?"',
      'En tu próxima cita, proponete NO explicar nada a menos que te lo pidan explícitamente'
    ],
    
    mantras: [
      'No necesito tener razón para conectar',
      'Escuchar es más que esperar mi turno para hablar',
      'Las emociones no son problemas a resolver',
      'Mi valor no depende de ser el más inteligente de la sala'
    ]
  },

  CLOWN: {
    id: 'CLOWN',
    name: 'El Payaso',
    emoji: '🎭',
    tagline: 'El que hace reír pero nunca conecta',
    color: '#f59e0b',
    
    description: 'Usás el humor como escudo. Todo es un chiste, nunca mostrás vulnerabilidad. Entretenés pero no conectás. La gente se ríe con vos pero no te conoce realmente.',
    
    deepDive: `El Payaso descubrió temprano que el humor es moneda social. Hace reír = cae bien = es aceptado. Pero lo que funcionaba en el colegio no funciona en el dating adulto, porque el humor sin profundidad es entretenimiento, no intimidad.

Tu patrón es predecible: cada vez que la conversación se pone seria o emocional, hacés un chiste para alivianar. Cada vez que podrías mostrar vulnerabilidad, la tapás con ironía. Cada vez que alguien se acerca demasiado, ponés la barrera del humor.

El problema es que el humor constante comunica: "no te voy a dejar conocerme". Y aunque conscientemente busques conexión, inconscientemente la estás saboteando. Porque la conexión real requiere vulnerabilidad, y la vulnerabilidad requiere dejar de esconderse detrás de los chistes.

Además, el humor sin sustancia cansa. Las primeras 3 citas sos "el divertido". Para la cita 5, la otra persona se pregunta si hay algo más debajo de la superficie. Y si nunca lo mostrás, asumen que no hay nada.

El patrón más tóxico es usar el humor para evitar conversaciones difíciles. Ella quiere hablar de hacia dónde va la relación, vos hacés un chiste. Él te pregunta cómo te sentís, vos cambiás de tema con algo gracioso. El humor como evasión es autosabotaje.`,

    mbtiConnection: {
      types: ['ENTP', 'ENFP', 'ESTP', 'ESFP'],
      dominantFunction: 'Ne o Se con Fe/Te en posición media',
      explanation: `Los tipos con Ne dominante (ENTP, ENFP) tienen una facilidad natural para las conexiones inesperadas y el humor. El problema es que Ne puede convertirse en un mecanismo de defensa: saltar de idea en idea para nunca quedarse en un lugar emocional incómodo.

Los ENTP especialmente usan el humor como campo de batalla intelectual. Cada chiste es una pequeña victoria, cada risa es validación. Pero las victorias en humor no se traducen a intimidad.

Los ESTP y ESFP (Se dominante) son los entertainers naturales. Viven en el momento, capturan la atención, son el alma de la fiesta. Pero Se sin profundidad emocional crea conexiones anchas pero poco profundas. Conocen a todos pero nadie los conoce.

El problema cognitivo es la función inferior Si (ENTP/ENFP) o Ni (ESTP/ESFP). Ambas tienen que ver con profundidad y reflexión, exactamente lo que el Payaso evita. Acceder a esas funciones requiere bajar la guardia del humor.`
    },
    
    discConnection: {
      primary: 'I',
      secondary: 'D',
      profile: 'Alto I, Bajo C, variable D/S',
      explanation: `El I alto te hace socialmente fluido, encantador, y enfocado en generar reacciones positivas. Querés que la gente la pase bien cuando está con vos. El problema es cuando esto se convierte en tu única estrategia.

El C bajo significa que no analizás si este patrón funciona a largo plazo. Solo repetís lo que genera risas inmediatas sin cuestionar si genera conexión duradera.

El D variable es interesante: algunos Payasos son dominantes (controlan la conversación con humor), otros son más pasivos (usan el humor como defensa reactiva). Ambos usan el humor para manejar la dinámica social, pero desde lugares diferentes.

El S bajo es el factor que te impide crear intimidad: no te quedás el tiempo suficiente en un tema emocional para que la conexión se profundice. Siempre hay otro chiste que hacer.`
    },
    
    weakness: 'Te ven como divertido pero no como pareja seria. Entretenés pero no conectás. Sos el amigo gracioso, no el candidato romántico.',
    
    blindSpot: 'Creés que si dejás de ser gracioso, van a perder interés. La realidad es lo contrario: si no mostrás quién sos detrás del humor, van a perder interés porque no hay nada a qué aferrarse.',
    
    rootCause: 'El humor es tu armadura contra el rechazo. Si te rechazan, no están rechazando al "verdadero vos", solo al personaje. Pero el costo es que el verdadero vos nunca es visto.',
    
    patterns: {
      inChat: [
        'Responder con memes, GIFs, o chistes a todo',
        'Cambiar de tema con humor cuando algo se pone serio',
        'Incapacidad de mantener una conversación seria por más de 3 mensajes',
        'Hacer comentarios auto-despreciativos en vez de hablar de sentimientos reales',
        'Deflectar cumplidos con humor'
      ],
      inDates: [
        'Ser "el divertido" pero no memorable por nada más',
        'Incomodidad visible cuando la conversación se pone emocional',
        'Usar historias graciosas para evitar preguntas personales',
        'Transformar momentos románticos potenciales en momentos cómicos',
        'No poder sostener contacto visual serio por más de unos segundos'
      ],
      redFlags: [
        'La otra persona dice "sos muy gracioso pero no sé nada de vos"',
        'Te buscan para pasarla bien pero no para momentos difíciles',
        'Sentís que si dejás de ser gracioso, no tenés nada para ofrecer',
        'Relaciones que empiezan divertidas pero se estancan rápido'
      ]
    },
    
    advice: 'El humor es genial, pero la vulnerabilidad crea conexión. No todo tiene que ser gracioso. Mostrá quién sos de verdad, aunque dé miedo. Las personas quieren conocerte, no solo reírse.',
    
    exercises: [
      'En tu próxima conversación, contá algo que te importe de verdad, sin hacer un chiste al respecto',
      'Cuando sientas la urgencia de alivianar con humor, contá hasta 5 y respondé en serio',
      'Practicá aceptar cumplidos con un simple "gracias" sin deflectarlos con un chiste',
      'Tené una conversación entera donde no hagas ningún chiste. Observá cómo te sentís',
      'Cuando te pregunten cómo estás, respondé honestamente en vez de con algo gracioso'
    ],
    
    mantras: [
      'Puedo ser interesante sin ser gracioso',
      'Mi vulnerabilidad es atractiva',
      'No necesito entretener para ser querido',
      'El humor es herramienta, no escudo'
    ]
  },

  ANXIOUS: {
    id: 'ANXIOUS',
    name: 'El Ansioso',
    emoji: '😰',
    tagline: 'El que necesita respuesta YA',
    color: '#ec4899',
    
    description: 'Cada minuto sin respuesta es una tortura. Mandás doble texto, interpretás silencios como rechazo, necesitás validación constante. Tu ansiedad se transmite y genera presión en la otra persona.',
    
    deepDive: `El Ansioso vive en un estado de hiper-vigilancia emocional. Cada mensaje enviado abre un reloj interno que cuenta los segundos hasta la respuesta. Cada minuto que pasa sin respuesta es evidencia de que algo está mal, de que hiciste algo mal, de que te van a dejar.

Tu cerebro está constantemente buscando señales de abandono. Un mensaje corto = está enojada. Una respuesta tardía = perdió interés. Un emoji menos de lo habitual = ya no le gustás. Vivís en un estado de interpretación constante, y casi siempre interpretás negativo.

El problema es que esta ansiedad se transmite. Cuando mandás el segundo mensaje preguntando "¿todo bien?", cuando stalkeas sus redes para ver si está online, cuando necesitás confirmación constante de que siguen interesados, la otra persona lo siente. Y se siente sofocante.

La ironía cruel es que tu miedo al abandono genera exactamente lo que temés. Tu ansiedad crea presión, la presión aleja, y el alejamiento confirma tu miedo. Es una profecía autocumplida.

El patrón más destructivo es la búsqueda de seguridad. Necesitás saber "qué somos", "hacia dónde vamos", "qué significa esto". Y no porque genuinamente quieras definir la relación, sino porque la ambigüedad te genera demasiada ansiedad. Pero las relaciones saludables requieren tolerar cierto nivel de ambigüedad, especialmente al principio.`,

    mbtiConnection: {
      types: ['INFJ', 'INFP', 'ENFJ', 'ISFJ'],
      dominantFunction: 'Fe o Fi dominante/auxiliar con loop ansioso',
      explanation: `Los tipos con Fe alto (ENFJ, INFJ, ESFJ, ISFJ) son especialmente vulnerables porque su bienestar emocional está conectado al feedback de otros. Si no reciben señales claras de que todo está bien, asumen que algo está mal.

El INFJ es particularmente susceptible por su Ni-Fe: Ni hace predicciones sobre el futuro, Fe las colorea emocionalmente. El resultado es una capacidad infinita para imaginar escenarios negativos sobre la relación.

El INFP con Fi-Ne tiene un problema similar: Fi tiene una visión idealizada del amor, Ne imagina todas las formas en que podría fracasar. La combinación genera ansiedad anticipatoria constante.

El ISFJ (Si-Fe) se ancla en experiencias pasadas de abandono o rechazo y las proyecta hacia el futuro. Si alguna vez alguien desapareció después de un silencio, ahora todo silencio significa desaparición.

El problema cognitivo es el loop ansioso entre la función dominante y la terciaria, bypaseando la función auxiliar que daría equilibrio.`
    },
    
    discConnection: {
      primary: 'S',
      secondary: 'C',
      profile: 'Alto S, Alto C, Bajo D',
      explanation: `El S alto te hace orientado a la estabilidad y seguridad. Necesitás saber que todo está bien para poder relajarte. La incertidumbre en relaciones te genera un malestar profundo.

El C alto agrega la necesidad de información y certeza. Querés datos, confirmación, evidencia de que la relación está bien. El problema es que el dating no funciona con certezas, y esta necesidad te lleva a buscar confirmación constantemente.

El D bajo es crítico: no sentís que tenés control sobre la situación, y eso amplifica la ansiedad. Si pudieras controlar cómo va la relación, te sentirías mejor. Pero no podés, entonces te sentís a la deriva.

Esta combinación crea un patrón de hipervigilancia y búsqueda de seguridad que, paradójicamente, aleja a las personas que podrían darte esa seguridad.`
    },
    
    weakness: 'Tu ansiedad se transmite y genera presión. La otra persona siente que tiene que "cuidarte" emocionalmente, y eso la agota.',
    
    blindSpot: 'Creés que si preguntás suficiente, vas a obtener la seguridad que buscás. Pero las preguntas constantes generan el efecto contrario: demuestran inseguridad y alejan.',
    
    rootCause: 'Estilo de apego ansioso, probablemente formado en la infancia. Experiencias de abandono o inconsistencia emocional crearon un modelo mental donde el amor es inestable y hay que vigilarlo constantemente.',
    
    patterns: {
      inChat: [
        'Responder al instante y esperar lo mismo',
        'Doble o triple mensaje cuando no responden rápido',
        'Preguntar "¿todo bien?" o "¿pasó algo?" sin motivo',
        'Interpretar cambios mínimos en el tono como señales de alarma',
        'Checkear constantemente si están online',
        'Releer conversaciones viejas buscando pistas de que algo está mal'
      ],
      inDates: [
        'Necesitar confirmación verbal de que la cita va bien',
        'Preguntar sobre el estado de la relación demasiado pronto',
        'Ansiedad visible cuando no podés leer las señales',
        'Over-explaining: justificar todo lo que decís por miedo a malentendidos',
        'Dificultad para disfrutar el momento porque estás anticipando el siguiente'
      ],
      redFlags: [
        'La otra persona tarda cada vez más en responder (para evitar tu intensidad)',
        'Te dicen que sos "mucho" o "intenso"',
        'Sentís que estás persiguiendo más de lo que te persiguen',
        'Relaciones que empiezan intensas y mueren rápido'
      ]
    },
    
    advice: 'El silencio no es rechazo. Tené tu propia vida que te distraiga de la espera. La seguridad se construye con tiempo, no se exige con preguntas.',
    
    exercises: [
      'Silenciá las notificaciones por períodos de 2 horas. El mundo no se acaba',
      'Cuando sientas urgencia de mandar un segundo mensaje, esperá 24 horas. Probablemente no sea necesario',
      'Escribí tus miedos en un papel en vez de mandarlos por mensaje. ¿Cuántos eran reales después de un día?',
      'Practicá hacer otras cosas mientras esperás respuesta: ejercicio, trabajo, amigos. Tu vida no puede girar alrededor de un chat',
      'Antes de interpretar un silencio, listá 5 razones normales (no catastróficas) por las que alguien podría tardar en responder'
    ],
    
    mantras: [
      'El silencio no significa rechazo',
      'Mi valor no depende de una respuesta',
      'Puedo tolerar la incertidumbre',
      'Si es para mí, no tengo que perseguirlo'
    ]
  },

  GHOST: {
    id: 'GHOST',
    name: 'El Fantasma',
    emoji: '👻',
    tagline: 'El que está pero no está',
    color: '#6b7280',
    
    description: 'Respondés poco, tardás horas o días, parecés desinteresado. Puede ser timidez, puede ser miedo, puede ser que genuinamente no sabés mostrar interés. El resultado es el mismo: la otra persona no sabe si le gustás.',
    
    deepDive: `El Fantasma es el polo opuesto del Ansioso, pero igualmente disfuncional. Donde el Ansioso sobre-comunica, el Fantasma sub-comunica. Donde el Ansioso asfixia, el Fantasma abandona.

Tu patrón puede venir de varios lugares. Tal vez sos genuinamente introvertido y la comunicación constante te agota. Tal vez tenés miedo de mostrar interés y ser rechazado. Tal vez no sabés cómo comunicar entusiasmo sin sentirte vulnerable. O tal vez simplemente no le das la prioridad que requiere.

El problema es que en el dating, la falta de comunicación SE COMUNICA. Tu silencio dice "no me importás lo suficiente". Tus respuestas cortas dicen "no tengo ganas de hablar con vos". Tu falta de iniciativa dice "no estoy interesado". Aunque no sea lo que sentís, es lo que transmitís.

El dating requiere cierto nivel de inversión visible. Si nunca iniciás, nunca proponés planes, nunca mostrás entusiasmo, la otra persona va a asumir que no te interesa. Y se va a ir. No porque no les gustes, sino porque no les diste ninguna señal de que vos estás interesado.

El problema más profundo es que tu patrón atrae exactamente lo que no querés: personas ansiosas que van a perseguirte, o personas sanas que se van a cansar y van a buscar a alguien que demuestre interés.`,

    mbtiConnection: {
      types: ['ISTP', 'INTP', 'INTJ', 'ISTJ'],
      dominantFunction: 'Ti o Ni dominante con Fe/Se inferior',
      explanation: `Los tipos con Ti dominante (ISTP, INTP) viven en su mundo interno de análisis. La comunicación externa no es su prioridad natural. Pueden estar muy interesados en alguien pero simplemente... no lo demuestran.

El ISTP es particularmente propenso porque Ti-Se crea un patrón de acción práctica sin comunicación verbal. Para el ISTP, estar presente es demostrar interés. Para la otra persona, si no lo decís, no existe.

El INTP tiene Ti-Ne, que crea una vida mental tan rica que la comunicación externa parece redundante. "Ya sé que me gusta, ¿para qué lo voy a decir?" Pero la otra persona no puede leerte la mente.

El INTJ (Ni-Te) puede parecer fantasma por su independencia extrema. No necesita validación constante, entonces asume que nadie la necesita. Su comunicación es eficiente al punto de parecer fría.

El ISTJ (Si-Te) puede ser fantasma por su rutina rígida. Si chatear no está en la agenda, no pasa. Su vida estructurada no deja espacio para la espontaneidad que el dating requiere.

El problema cognitivo es el Fe inferior (ISTP, INTP) o el Fe ausente (INTJ, ISTJ). Sin Fe en posición alta, la lectura de necesidades emocionales ajenas no es automática.`
    },
    
    discConnection: {
      primary: 'C',
      secondary: 'S',
      profile: 'Bajo I, Bajo D, variable C/S',
      explanation: `El I bajo es el factor dominante: la comunicación social no es tu prioridad ni tu fuente de energía. Preferís procesar internamente que compartir externamente.

El D bajo significa que no tomás la iniciativa. Esperás que las cosas pasen, que el otro inicie, que la relación se forme sola. No por desinterés, sino por pasividad natural.

El C alto puede manifestarse como sobre-análisis antes de comunicar. "¿Qué le digo? ¿Cómo lo digo? ¿Va a estar bien?" Y mientras analizás, pasan tres días sin responder.

El S alto puede manifestarse como comodidad con la rutina actual, resistencia al cambio que una relación nueva implica. Es más fácil quedarse en tu zona de confort que invertir en algo nuevo.

Esta combinación crea una persona que puede estar muy interesada pero que no lo demuestra de ninguna forma visible.`
    },
    
    weakness: 'La otra persona no sabe si te interesa. Se cansan de adivinar y de perseguirte. Eventualmente, asumen que no les gustás y se van.',
    
    blindSpot: 'Creés que si le gustás, van a quedarse aunque no demuestres nada. Pero las relaciones requieren inversión visible. Tu silencio no es misterioso, es frustrante.',
    
    rootCause: 'Puede ser introversión extrema, miedo a la vulnerabilidad de mostrar interés, o simplemente no saber cómo comunicar entusiasmo. También puede ser evitación: si no invertís, no te puede doler.',
    
    patterns: {
      inChat: [
        'Respuestas de una palabra: "sí", "no", "jaja"',
        'Tardar horas o días en responder',
        'Nunca iniciar conversaciones',
        'No hacer preguntas de seguimiento',
        'Dejar morir conversaciones en vez de mantenerlas vivas',
        'Responder tarde y encima responder poco'
      ],
      inDates: [
        'Esperar que la otra persona proponga siempre',
        'Dar pocas señales de interés (poco contacto visual, cuerpo cerrado)',
        'Respuestas cortas incluso en persona',
        'No mencionar planes futuros ni próxima cita',
        'Parecer aburrido o desinteresado aunque no lo estés'
      ],
      redFlags: [
        'La otra persona te pregunta directamente si te interesa',
        'Se quejan de que "sos difícil de leer"',
        'Dejan de escribirte y no te das cuenta por días',
        'Terminan con vos citando falta de interés (aunque lo sentías)'
      ]
    },
    
    advice: 'Si te interesa, demostralo. No esperes que adivinen. Iniciá conversaciones, proponé planes, respondé en un tiempo razonable. Tu silencio comunica desinterés aunque no lo sea.',
    
    exercises: [
      'Por cada mensaje que recibas, respondé dentro de las próximas 4 horas (como máximo)',
      'Iniciá vos la conversación al menos la mitad de las veces. Si siempre te escriben primero, empezá vos',
      'Cuando respondas, agregá algo: una pregunta, un comentario, algo que mantenga la conversación viva',
      'Practica expresar entusiasmo explícito: "me gustó mucho verte", "estuvo muy bueno hablar"',
      'Proponé vos el próximo plan en vez de esperar que lo propongan'
    ],
    
    mantras: [
      'Mostrar interés no es debilidad',
      'Si me gusta, tengo que demostrarlo',
      'Mi silencio comunica desinterés',
      'Tomar iniciativa es atractivo'
    ]
  }
}

// Dimensiones que medimos (actualizado)
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
