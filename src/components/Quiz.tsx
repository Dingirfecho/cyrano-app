// src/components/Quiz.tsx

"use client"

import { useState } from "react"
import { quizQuestions, calculateArchetype, cyranoArchetypes, quickQuizIds, CyranoArchetype, DimensionScores } from "@/lib/cyrano-archetypes"
import { Brain, ChevronRight, Check, RotateCcw, ChevronDown, ChevronUp } from "lucide-react"

interface QuizProps {
  onComplete: (archetype: string, scores: DimensionScores) => void
  isQuickQuiz?: boolean
}

export default function Quiz({ onComplete, isQuickQuiz = false }: QuizProps) {
  const questions = isQuickQuiz 
    ? quizQuestions.filter(q => quickQuizIds.includes(q.id))
    : quizQuestions

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({})
  const [showResult, setShowResult] = useState(false)
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
    exercises: false
  })

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex) / questions.length) * 100

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleAnswer = (answer: 'A' | 'B') => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer }
    setAnswers(newAnswers)

    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300)
    } else {
      const calculated = calculateArchetype(newAnswers)
      setResult(calculated)
      setShowResult(true)
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
          scores: result.scores
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
    setShowResult(false)
    setResult(null)
    setExpandedSections({
      deepDive: false,
      mbti: false,
      disc: false,
      patterns: false,
      exercises: false
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

  // Mostrar resultado
  if (showResult && result) {
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
              Repetir Quiz
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
              {saving ? "Guardando..." : "Continuar al Análisis"}
              <ChevronRight style={{ width: 18, height: 18 }} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Mostrar pregunta
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
            {isQuickQuiz ? "Quiz Rápido" : "Descubrí tu Arquetipo"}
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
            background: "#ef4444",
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
