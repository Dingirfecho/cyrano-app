// src/components/Quiz.tsx

"use client"

import { useState } from "react"
import { quizQuestions, calculateArchetype, cyranoArchetypes, quickQuizIds, CyranoArchetype, DimensionScores } from "@/lib/cyrano-archetypes"
import { Brain, ChevronRight, Check, RotateCcw, ChevronDown, ChevronUp, Sparkles, Heart, Users, Target } from "lucide-react"

interface QuizProps {
  onComplete: (archetype: string, scores: DimensionScores) => void
  isQuickQuiz?: boolean
}

type QuizStage = 'intro' | 'demographics' | 'questions' | 'result'

interface Demographics {
  gender: string
  age: string
  lookingFor: string
  intention: string
}

export default function Quiz({ onComplete, isQuickQuiz = false }: QuizProps) {
  const questions = isQuickQuiz 
    ? quizQuestions.filter(q => quickQuizIds.includes(q.id))
    : quizQuestions

  const [stage, setStage] = useState<QuizStage>('intro')
  const [demographics, setDemographics] = useState<Demographics>({
    gender: '',
    age: '',
    lookingFor: '',
    intention: ''
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({})
  const [result, setResult] = useState<{ 
    archetype: CyranoArchetype
    scores: DimensionScores
    secondaryArchetype?: CyranoArchetype 
  } | null>(null)
  const [saving, setSaving] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    deepDive: false,
    mbti: false,
    disc: false,
    patterns: false,
    exercises: false,
    apps: false
  })

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex) / questions.length) * 100

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleDemographicChange = (field: keyof Demographics, value: string) => {
    setDemographics(prev => ({ ...prev, [field]: value }))
  }

  const canProceedFromDemographics = () => {
    return demographics.gender && demographics.age && demographics.lookingFor && demographics.intention
  }

  const handleAnswer = (answer: 'A' | 'B') => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer }
    setAnswers(newAnswers)

    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300)
    } else {
      const calculated = calculateArchetype(newAnswers)
      setResult(calculated)
      setStage('result')
    }
  }

  const handleSave = async () => {
    if (!result) return
    
    setSaving(true)
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: result.archetype.id,
          scores: result.scores,
          demographics
        })
      })
      
      if (res.ok) {
        onComplete(result.archetype.id, result.scores)
      }
    } catch (error) {
      console.error('Error saving quiz:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleRetake = () => {
    setAnswers({})
    setCurrentIndex(0)
    setStage('intro')
    setResult(null)
    setExpandedSections({
      deepDive: false,
      mbti: false,
      disc: false,
      patterns: false,
      exercises: false,
      apps: false
    })
  }

  // Componente para secciones expandibles
  const ExpandableSection = ({ 
    id, 
    title, 
    emoji, 
    color, 
    children 
  }: { 
    id: string
    title: string
    emoji: string
    color: string
    children: React.ReactNode 
  }) => (
    <div style={{
      background: "#141416",
      border: "1px solid #27272a",
      borderRadius: 12,
      marginBottom: 16,
      overflow: "hidden"
    }}>
      <button
        onClick={() => toggleSection(id)}
        style={{
          width: "100%",
          padding: 20,
          background: "transparent",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          color: "white"
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20 }}>{emoji}</span>
          <span style={{ fontWeight: 600, color }}>{title}</span>
        </span>
        {expandedSections[id] ? (
          <ChevronUp style={{ width: 20, height: 20, color: "#71717a" }} />
        ) : (
          <ChevronDown style={{ width: 20, height: 20, color: "#71717a" }} />
        )}
      </button>
      {expandedSections[id] && (
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid #27272a" }}>
          {children}
        </div>
      )}
    </div>
  )

  // ==================== PANTALLA DE INTRO ====================
  if (stage === 'intro') {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0a0a0b",
        color: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
      }}>
        <div style={{ maxWidth: 600, width: "100%", textAlign: "center" }}>
          {/* Logo animado */}
          <div style={{
            width: 100,
            height: 100,
            background: "linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 32px",
            boxShadow: "0 0 60px rgba(239, 68, 68, 0.3)"
          }}>
            <Brain style={{ width: 50, height: 50, color: "white" }} />
          </div>

          <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>
            Descubrí tu Arquetipo de Dating
          </h1>

          <p style={{ fontSize: 18, color: "#a1a1aa", marginBottom: 40, lineHeight: 1.6 }}>
            En los próximos minutos vas a completar un test psicométrico diseñado 
            específicamente para el mundo del dating. No hay respuestas correctas o 
            incorrectas, solo patrones que te definen.
          </p>

          {/* Pasos */}
          <div style={{
            background: "#141416",
            border: "1px solid #27272a",
            borderRadius: 16,
            padding: 32,
            marginBottom: 40,
            textAlign: "left"
          }}>
            <h3 style={{ fontSize: 14, color: "#71717a", textTransform: "uppercase", letterSpacing: 1, marginBottom: 24 }}>
              ¿Qué va a pasar?
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: Users, title: "Paso 1: Sobre vos", desc: "Algunas preguntas básicas para personalizar tu experiencia" },
                { icon: Brain, title: "Paso 2: Test de 20 preguntas", desc: "Situaciones de dating donde elegís cómo reaccionarías" },
                { icon: Target, title: "Paso 3: Tu arquetipo", desc: "Descubrí cuál de los 6 arquetipos te define y qué significa" },
                { icon: Sparkles, title: "Paso 4: Análisis de chats", desc: "Usá Cyrano para analizar tus conversaciones reales" }
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    background: "#ef444420",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <step.icon style={{ width: 20, height: 20, color: "#ef4444" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{step.title}</div>
                    <div style={{ fontSize: 14, color: "#71717a" }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontSize: 14, color: "#71717a", marginBottom: 24 }}>
            ⏱️ Tiempo estimado: 5-7 minutos
          </p>

          <button
            onClick={() => setStage('demographics')}
            style={{
              width: "100%",
              padding: "18px 32px",
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "white",
              border: "none",
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12
            }}
          >
            Empezar
            <ChevronRight style={{ width: 20, height: 20 }} />
          </button>
        </div>
      </div>
    )
  }

  // ==================== PANTALLA DE DEMOGRAFÍA ====================
  if (stage === 'demographics') {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0a0a0b",
        color: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
      }}>
        <div style={{ maxWidth: 500, width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
              Contanos sobre vos
            </h2>
            <p style={{ color: "#71717a" }}>
              Esta información nos ayuda a personalizar tu experiencia
            </p>
          </div>

          {/* Género */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 14, color: "#a1a1aa", marginBottom: 12 }}>
              ¿Cómo te identificás?
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { value: 'hombre_cis', label: 'Hombre cis' },
                { value: 'mujer_cis', label: 'Mujer cis' },
                { value: 'hombre_trans', label: 'Hombre trans' },
                { value: 'mujer_trans', label: 'Mujer trans' },
                { value: 'no_binario', label: 'No binario' },
                { value: 'otro', label: 'Prefiero no decirlo' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleDemographicChange('gender', opt.value)}
                  style={{
                    padding: "14px 20px",
                    background: demographics.gender === opt.value ? "#ef444420" : "#141416",
                    border: demographics.gender === opt.value ? "2px solid #ef4444" : "1px solid #27272a",
                    borderRadius: 10,
                    color: "white",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Edad */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 14, color: "#a1a1aa", marginBottom: 12 }}>
              ¿Qué edad tenés?
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[
                { value: '18-24', label: '18-24' },
                { value: '25-30', label: '25-30' },
                { value: '31-35', label: '31-35' },
                { value: '36-40', label: '36-40' },
                { value: '41-50', label: '41-50' },
                { value: '50+', label: '50+' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleDemographicChange('age', opt.value)}
                  style={{
                    padding: "14px 16px",
                    background: demographics.age === opt.value ? "#ef444420" : "#141416",
                    border: demographics.age === opt.value ? "2px solid #ef4444" : "1px solid #27272a",
                    borderRadius: 10,
                    color: "white",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Qué busca */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 14, color: "#a1a1aa", marginBottom: 12 }}>
              ¿Qué género te interesa?
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { value: 'hombres', label: 'Hombres' },
                { value: 'mujeres', label: 'Mujeres' },
                { value: 'todos', label: 'Todos los géneros' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleDemographicChange('lookingFor', opt.value)}
                  style={{
                    padding: "14px 20px",
                    background: demographics.lookingFor === opt.value ? "#ef444420" : "#141416",
                    border: demographics.lookingFor === opt.value ? "2px solid #ef4444" : "1px solid #27272a",
                    borderRadius: 10,
                    color: "white",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Intención */}
          <div style={{ marginBottom: 32 }}>
            <label style={{ display: "block", fontSize: 14, color: "#a1a1aa", marginBottom: 12 }}>
              ¿Qué estás buscando?
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { value: 'pareja', label: '💕 Conocer una pareja seria', desc: 'Busco algo a largo plazo' },
                { value: 'casual', label: '🔥 Salir sin compromisos', desc: 'Algo más relajado y casual' },
                { value: 'amigos', label: '👋 Conocer gente nueva', desc: 'Amigos, conexiones, lo que surja' },
                { value: 'no_definido', label: '🤷 No estoy seguro/a', desc: 'Viendo qué pasa' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleDemographicChange('intention', opt.value)}
                  style={{
                    padding: "16px 20px",
                    background: demographics.intention === opt.value ? "#ef444420" : "#141416",
                    border: demographics.intention === opt.value ? "2px solid #ef4444" : "1px solid #27272a",
                    borderRadius: 10,
                    color: "white",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>{opt.label}</div>
                  <div style={{ fontSize: 13, color: "#71717a" }}>{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStage('questions')}
            disabled={!canProceedFromDemographics()}
            style={{
              width: "100%",
              padding: "18px 32px",
              background: canProceedFromDemographics() 
                ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" 
                : "#27272a",
              color: canProceedFromDemographics() ? "white" : "#71717a",
              border: "none",
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 600,
              cursor: canProceedFromDemographics() ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12
            }}
          >
            Continuar al test
            <ChevronRight style={{ width: 20, height: 20 }} />
          </button>
        </div>
      </div>
    )
  }

  // ==================== PANTALLA DE PREGUNTAS ====================
  if (stage === 'questions') {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0a0a0b",
        color: "#fafafa",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* Header */}
        <div style={{
          padding: "20px",
          borderBottom: "1px solid #27272a"
        }}>
          <div style={{
            maxWidth: 600,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 12
          }}>
            <Brain style={{ width: 24, height: 24, color: "#ef4444" }} />
            <span style={{ fontWeight: 600 }}>
              {isQuickQuiz ? "Quiz Rápido" : "Test de Arquetipo"}
            </span>
            <span style={{ marginLeft: "auto", color: "#71717a", fontSize: 14 }}>
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
          
          {/* Progress bar */}
          <div style={{
            maxWidth: 600,
            margin: "16px auto 0",
            height: 4,
            background: "#27272a",
            borderRadius: 2
          }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #ef4444 0%, #f59e0b 100%)",
              borderRadius: 2,
              transition: "width 0.3s ease"
            }} />
          </div>
        </div>

        {/* Question */}
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20
        }}>
          <div style={{ maxWidth: 600, width: "100%" }}>
            <h2 style={{
              fontSize: 22,
              fontWeight: 500,
              marginBottom: 32,
              lineHeight: 1.4,
              textAlign: "center"
            }}>
              {currentQuestion.text}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <button
                onClick={() => handleAnswer('A')}
                style={{
                  padding: 20,
                  background: answers[currentQuestion.id] === 'A' ? "#ef444430" : "#141416",
                  border: answers[currentQuestion.id] === 'A' ? "2px solid #ef4444" : "1px solid #27272a",
                  borderRadius: 12,
                  color: "white",
                  fontSize: 16,
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  lineHeight: 1.5
                }}
              >
                {currentQuestion.optionA.text}
              </button>

              <button
                onClick={() => handleAnswer('B')}
                style={{
                  padding: 20,
                  background: answers[currentQuestion.id] === 'B' ? "#3b82f630" : "#141416",
                  border: answers[currentQuestion.id] === 'B' ? "2px solid #3b82f6" : "1px solid #27272a",
                  borderRadius: 12,
                  color: "white",
                  fontSize: 16,
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  lineHeight: 1.5
                }}
              >
                {currentQuestion.optionB.text}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ==================== PANTALLA DE RESULTADO ====================
  if (stage === 'result' && result) {
    const { archetype, secondaryArchetype, scores } = result
    
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0a0a0b",
        color: "#fafafa",
        padding: "40px 20px"
      }}>
        <div style={{
          maxWidth: 700,
          margin: "0 auto"
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{
              width: 100,
              height: 100,
              background: `${archetype.color}30`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: 50
            }}>
              {archetype.emoji}
            </div>

            <p style={{ color: "#71717a", marginBottom: 8, fontSize: 14, textTransform: "uppercase", letterSpacing: 2 }}>
              Tu arquetipo de dating es
            </p>
            
            <h1 style={{
              fontSize: 42,
              fontWeight: "bold",
              color: archetype.color,
              marginBottom: 12
            }}>
              {archetype.name}
            </h1>
            
            <p style={{ fontSize: 20, color: "#a1a1aa", fontStyle: "italic" }}>
              "{archetype.tagline}"
            </p>
          </div>

          {/* Descripción principal */}
          <div style={{
            background: "#141416",
            border: "1px solid #27272a",
            borderRadius: 12,
            padding: 24,
            marginBottom: 16
          }}>
            <p style={{ color: "#d4d4d8", lineHeight: 1.7, fontSize: 16 }}>
              {archetype.description}
            </p>
          </div>

          {/* Punto ciego y causa raíz */}
          <div style={{
            background: `${archetype.color}15`,
            border: `1px solid ${archetype.color}40`,
            borderRadius: 12,
            padding: 24,
            marginBottom: 16
          }}>
            <div style={{ 
              fontSize: 12, 
              fontWeight: 600, 
              color: archetype.color, 
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 1
            }}>
              ⚠️ Tu punto ciego
            </div>
            <p style={{ color: "#e4e4e7", lineHeight: 1.6, marginBottom: 16 }}>
              {archetype.blindSpot}
            </p>
            <div style={{ 
              fontSize: 12, 
              fontWeight: 600, 
              color: "#71717a", 
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1
            }}>
              🎯 Causa raíz
            </div>
            <p style={{ color: "#a1a1aa", lineHeight: 1.6 }}>
              {archetype.rootCause}
            </p>
          </div>

          {/* Consejo clave */}
          <div style={{
            background: "#22c55e15",
            border: "1px solid #22c55e40",
            borderRadius: 12,
            padding: 24,
            marginBottom: 24
          }}>
            <div style={{ 
              fontSize: 12, 
              fontWeight: 600, 
              color: "#22c55e", 
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 1
            }}>
              💡 Consejo clave
            </div>
            <p style={{ color: "#d4d4d8", lineHeight: 1.6, fontSize: 16 }}>
              {archetype.advice}
            </p>
          </div>

          {/* Secciones expandibles */}
          <ExpandableSection 
            id="deepDive" 
            title="Análisis Profundo" 
            emoji="🔬" 
            color="#a78bfa"
          >
            <p style={{ color: "#d4d4d8", lineHeight: 1.8, whiteSpace: "pre-line", marginTop: 16 }}>
              {archetype.deepDive}
            </p>
          </ExpandableSection>

          <ExpandableSection 
            id="mbti" 
            title="Conexión con Myers-Briggs (MBTI)" 
            emoji="🧩" 
            color="#f472b6"
          >
            <div style={{ marginTop: 16 }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: "#71717a", marginBottom: 8, textTransform: "uppercase" }}>
                  Tipos más comunes
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {archetype.mbtiConnection.types.map(type => (
                    <span key={type} style={{
                      background: "#f472b620",
                      color: "#f472b6",
                      padding: "6px 12px",
                      borderRadius: 6,
                      fontWeight: 600,
                      fontSize: 14
                    }}>
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: "#71717a", marginBottom: 8, textTransform: "uppercase" }}>
                  Función cognitiva dominante
                </div>
                <p style={{ color: "#e4e4e7", fontWeight: 500 }}>
                  {archetype.mbtiConnection.dominantFunction}
                </p>
              </div>

              <div>
                <div style={{ fontSize: 12, color: "#71717a", marginBottom: 8, textTransform: "uppercase" }}>
                  Por qué pasa esto
                </div>
                <p style={{ color: "#a1a1aa", lineHeight: 1.7 }}>
                  {archetype.mbtiConnection.explanation}
                </p>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection 
            id="disc" 
            title="Conexión con DISC" 
            emoji="📊" 
            color="#60a5fa"
          >
            <div style={{ marginTop: 16 }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: "#71717a", marginBottom: 8, textTransform: "uppercase" }}>
                  Perfil DISC
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{
                    background: "#60a5fa20",
                    color: "#60a5fa",
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 16
                  }}>
                    {archetype.discConnection.profile}
                  </span>
                  <span style={{ color: "#71717a" }}>
                    (Primario: <strong style={{ color: "#60a5fa" }}>{archetype.discConnection.primary}</strong>, 
                    Secundario: <strong style={{ color: "#60a5fa" }}>{archetype.discConnection.secondary}</strong>)
                  </span>
                </div>
              </div>

              <div style={{ 
                background: "#0a0a0b", 
                borderRadius: 8, 
                padding: 16,
                marginBottom: 16
              }}>
                <div style={{ fontSize: 11, color: "#71717a", marginBottom: 12, textTransform: "uppercase" }}>
                  ¿Qué significa cada letra?
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                  {[
                    { letter: 'D', name: 'Dominancia', desc: 'Control, resultados, decisión' },
                    { letter: 'I', name: 'Influencia', desc: 'Social, entusiasmo, persuasión' },
                    { letter: 'S', name: 'Estabilidad', desc: 'Paciencia, lealtad, armonía' },
                    { letter: 'C', name: 'Cumplimiento', desc: 'Precisión, análisis, calidad' }
                  ].map(d => (
                    <div key={d.letter}>
                      <span style={{ 
                        color: "#60a5fa", 
                        fontWeight: 700,
                        marginRight: 8
                      }}>{d.letter}</span>
                      <span style={{ color: "#e4e4e7", fontSize: 14 }}>{d.name}</span>
                      <div style={{ color: "#71717a", fontSize: 12 }}>{d.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, color: "#71717a", marginBottom: 8, textTransform: "uppercase" }}>
                  Cómo afecta tu dating
                </div>
                <p style={{ color: "#a1a1aa", lineHeight: 1.7 }}>
                  {archetype.discConnection.explanation}
                </p>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection 
            id="patterns" 
            title="Patrones Observables" 
            emoji="🔄" 
            color="#fbbf24"
          >
            <div style={{ marginTop: 16 }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: "#71717a", marginBottom: 12, textTransform: "uppercase" }}>
                  En el chat
                </div>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {archetype.patterns.inChat.map((pattern, i) => (
                    <li key={i} style={{ color: "#d4d4d8", marginBottom: 8, lineHeight: 1.5 }}>
                      {pattern}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: "#71717a", marginBottom: 12, textTransform: "uppercase" }}>
                  En las citas
                </div>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {archetype.patterns.inDates.map((pattern, i) => (
                    <li key={i} style={{ color: "#d4d4d8", marginBottom: 8, lineHeight: 1.5 }}>
                      {pattern}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div style={{ fontSize: 12, color: "#ef4444", marginBottom: 12, textTransform: "uppercase" }}>
                  🚩 Red Flags (señales de que estás en este patrón)
                </div>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {archetype.patterns.redFlags.map((flag, i) => (
                    <li key={i} style={{ color: "#fca5a5", marginBottom: 8, lineHeight: 1.5 }}>
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection 
            id="exercises" 
            title="Ejercicios y Mantras" 
            emoji="💪" 
            color="#34d399"
          >
            <div style={{ marginTop: 16 }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: "#71717a", marginBottom: 12, textTransform: "uppercase" }}>
                  Ejercicios prácticos
                </div>
                <ol style={{ margin: 0, paddingLeft: 20 }}>
                  {archetype.exercises.map((exercise, i) => (
                    <li key={i} style={{ color: "#d4d4d8", marginBottom: 12, lineHeight: 1.6 }}>
                      {exercise}
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <div style={{ fontSize: 12, color: "#71717a", marginBottom: 12, textTransform: "uppercase" }}>
                  Mantras para repetirte
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {archetype.mantras.map((mantra, i) => (
                    <div key={i} style={{
                      background: "#34d39915",
                      border: "1px solid #34d39930",
                      borderRadius: 8,
                      padding: 12,
                      color: "#6ee7b7",
                      fontStyle: "italic"
                    }}>
                      "{mantra}"
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ExpandableSection>

          {/* Guías de Apps */}
          <ExpandableSection 
            id="apps" 
            title="Guías de Apps de Dating" 
            emoji="📱" 
            color="#ec4899"
          >
            <div style={{ marginTop: 16 }}>
              <p style={{ color: "#a1a1aa", marginBottom: 24, lineHeight: 1.6 }}>
                Cada app tiene su propia lógica y algoritmo. Entenderlos te da una ventaja enorme.
              </p>
              
              {/* Tinder */}
              <div style={{ 
                background: "#0a0a0b", 
                borderRadius: 12, 
                padding: 20,
                marginBottom: 16
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ 
                    width: 40, 
                    height: 40, 
                    background: "linear-gradient(135deg, #FE3C72 0%, #FF655B 100%)", 
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <span style={{ fontSize: 20 }}>🔥</span>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: "#FE3C72" }}>Tinder</h4>
                    <span style={{ fontSize: 12, color: "#71717a" }}>La app más masiva</span>
                  </div>
                </div>
                
                <div style={{ fontSize: 14, color: "#d4d4d8", lineHeight: 1.7 }}>
                  <p style={{ marginBottom: 12 }}>
                    <strong style={{ color: "#FE3C72" }}>El algoritmo (Elo Score):</strong> Tinder te asigna un puntaje interno basado en cuánta gente te da like, y qué tan "deseables" son esas personas. Si alguien con alto puntaje te da like, tu puntaje sube. Si das like a todos, tu puntaje baja.
                  </p>
                  <p style={{ marginBottom: 12 }}>
                    <strong style={{ color: "#FE3C72" }}>Cómo funciona el match:</strong> Te muestra perfiles en orden de probabilidad de match. Los primeros perfiles son los más probables. Si swipeás derecha a todos, el algoritmo asume que no sos selectivo y te muestra perfiles menos relevantes.
                  </p>
                  <p style={{ marginBottom: 12 }}>
                    <strong style={{ color: "#FE3C72" }}>Estrategia óptima:</strong> Sé selectivo (30-40% derecha), completá tu perfil al 100%, usá fotos donde se vea tu cara claramente, poné algo gracioso o interesante en la bio que invite a comentar.
                  </p>
                  <p>
                    <strong style={{ color: "#FE3C72" }}>Dato clave:</strong> Las primeras 48 horas de un perfil nuevo tienen "boost" gratis. Optimizá tu perfil ANTES de crear la cuenta.
                  </p>
                </div>
              </div>

              {/* Bumble */}
              <div style={{ 
                background: "#0a0a0b", 
                borderRadius: 12, 
                padding: 20,
                marginBottom: 16
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ 
                    width: 40, 
                    height: 40, 
                    background: "linear-gradient(135deg, #FFC629 0%, #F7B731 100%)", 
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <span style={{ fontSize: 20 }}>🐝</span>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: "#FFC629" }}>Bumble</h4>
                    <span style={{ fontSize: 12, color: "#71717a" }}>Ellas dan el primer paso</span>
                  </div>
                </div>
                
                <div style={{ fontSize: 14, color: "#d4d4d8", lineHeight: 1.7 }}>
                  <p style={{ marginBottom: 12 }}>
                    <strong style={{ color: "#FFC629" }}>La diferencia clave:</strong> En matches heterosexuales, la mujer tiene 24 horas para escribir primero o el match desaparece. Esto filtra muchos matches que nunca irían a ningún lado y crea menos competencia para los hombres.
                  </p>
                  <p style={{ marginBottom: 12 }}>
                    <strong style={{ color: "#FFC629" }}>El algoritmo:</strong> Similar a Tinder pero prioriza usuarios activos. Si no abrís la app por días, tu perfil baja en el stack. También considera la tasa de respuesta: si nunca respondés, te muestra menos.
                  </p>
                  <p style={{ marginBottom: 12 }}>
                    <strong style={{ color: "#FFC629" }}>Estrategia óptima:</strong> Para hombres: hacé que tu perfil tenga "ganchos" para que ella sepa qué escribirte (hobbies específicos, algo gracioso, una pregunta en la bio). Para mujeres: no escribas solo "hola" - mencioná algo de su perfil.
                  </p>
                  <p>
                    <strong style={{ color: "#FFC629" }}>Dato clave:</strong> Bumble tiene "Question Game" y "Prompts" que podés usar para diferenciarte. Los perfiles con prompts completados tienen 30% más matches.
                  </p>
                </div>
              </div>

              {/* Inner Circle */}
              <div style={{ 
                background: "#0a0a0b", 
                borderRadius: 12, 
                padding: 20
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ 
                    width: 40, 
                    height: 40, 
                    background: "linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%)", 
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <span style={{ fontSize: 20 }}>💎</span>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: "#63B3ED" }}>Inner Circle</h4>
                    <span style={{ fontSize: 12, color: "#71717a" }}>La app "exclusiva"</span>
                  </div>
                </div>
                
                <div style={{ fontSize: 14, color: "#d4d4d8", lineHeight: 1.7 }}>
                  <p style={{ marginBottom: 12 }}>
                    <strong style={{ color: "#63B3ED" }}>El modelo de exclusividad:</strong> Inner Circle tiene lista de espera y revisa perfiles manualmente (supuestamente). Verifican tu LinkedIn y redes sociales. La idea es crear un pool de usuarios más "curados" y profesionales.
                  </p>
                  <p style={{ marginBottom: 12 }}>
                    <strong style={{ color: "#63B3ED" }}>Cómo funciona:</strong> Menos usuarios pero más "comprometidos" (pagaron o esperaron). No hay swipe infinito - ves perfiles limitados. Esto fuerza a ser más selectivo y a tomarte el tiempo de leer perfiles.
                  </p>
                  <p style={{ marginBottom: 12 }}>
                    <strong style={{ color: "#63B3ED" }}>Estrategia óptima:</strong> Tu perfil profesional importa más acá. Conectá LinkedIn, poné tu trabajo real, mencioná viajes o hobbies "aspiracionales". El tono es más sofisticado que Tinder - menos memes, más conversación real.
                  </p>
                  <p>
                    <strong style={{ color: "#63B3ED" }}>Dato clave:</strong> Inner Circle organiza eventos presenciales en algunas ciudades. Ir a uno te sube el perfil en la app y te da contenido para fotos.
                  </p>
                </div>
              </div>
            </div>
          </ExpandableSection>

          {/* Arquetipo secundario */}
          {secondaryArchetype && (
            <div style={{
              background: "#141416",
              border: "1px solid #27272a",
              borderRadius: 12,
              padding: 20,
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 16
            }}>
              <span style={{ fontSize: 32 }}>{secondaryArchetype.emoji}</span>
              <div>
                <div style={{ fontSize: 12, color: "#71717a", marginBottom: 4 }}>También tenés rasgos de</div>
                <div style={{ fontWeight: 600, color: secondaryArchetype.color, fontSize: 18 }}>
                  {secondaryArchetype.name}
                </div>
                <div style={{ fontSize: 14, color: "#71717a" }}>
                  {secondaryArchetype.tagline}
                </div>
              </div>
            </div>
          )}

          {/* Botones */}
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            <button
              onClick={handleRetake}
              style={{
                flex: 1,
                padding: "16px 24px",
                background: "#27272a",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontSize: 16,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8
              }}
            >
              <RotateCcw style={{ width: 18, height: 18 }} />
              Repetir
            </button>
            
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                flex: 2,
                padding: "16px 24px",
                background: archetype.color,
                color: "white",
                border: "none",
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 500,
                cursor: saving ? "wait" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8
              }}
            >
              {saving ? "Guardando..." : "Ir al Análisis de Chats"}
              <ChevronRight style={{ width: 18, height: 18 }} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
