// src/components/Quiz.tsx

"use client"

import { useState } from "react"
import { quizQuestions, calculateArchetype, cyranoArchetypes, quickQuizIds, CyranoArchetype, DimensionScores } from "@/lib/cyrano-archetypes"
import { Brain, ChevronRight, Check, RotateCcw } from "lucide-react"

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

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex) / questions.length) * 100

  const handleAnswer = (answer: 'A' | 'B') => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer }
    setAnswers(newAnswers)

    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300)
    } else {
      // Quiz completado - calcular con todas las respuestas incluyendo la última
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
  }

  // Mostrar resultado
  if (showResult && result) {
    const { archetype, secondaryArchetype, scores } = result
    
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
        <div style={{
          maxWidth: 500,
          width: "100%"
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              width: 80,
              height: 80,
              background: `${archetype.color}30`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: 40
            }}>
              {archetype.emoji}
            </div>

            <p style={{ color: "#71717a", marginBottom: 8 }}>Tu arquetipo de dating es</p>
            
            <h1 style={{
              fontSize: 36,
              fontWeight: "bold",
              color: archetype.color,
              marginBottom: 8
            }}>
              {archetype.name}
            </h1>
            
            <p style={{ fontSize: 18, color: "#a1a1aa", fontStyle: "italic" }}>
              "{archetype.tagline}"
            </p>
          </div>

          {/* Description Card */}
          <div style={{
            background: "#141416",
            border: "1px solid #27272a",
            borderRadius: 12,
            padding: 24,
            marginBottom: 16
          }}>
            <p style={{ color: "#d4d4d8", lineHeight: 1.6 }}>
              {archetype.description}
            </p>
          </div>

          {/* Weakness Card */}
          <div style={{
            background: `${archetype.color}15`,
            border: `1px solid ${archetype.color}40`,
            borderRadius: 12,
            padding: 20,
            marginBottom: 16
          }}>
            <div style={{ 
              fontSize: 12, 
              fontWeight: 600, 
              color: archetype.color, 
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1
            }}>
              ⚠️ Tu punto ciego
            </div>
            <p style={{ color: "#e4e4e7" }}>
              {archetype.weakness}
            </p>
          </div>

          {/* Pattern Card */}
          <div style={{
            background: "#141416",
            border: "1px solid #27272a",
            borderRadius: 12,
            padding: 20,
            marginBottom: 16
          }}>
            <div style={{ 
              fontSize: 12, 
              fontWeight: 600, 
              color: "#71717a", 
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1
            }}>
              🔄 Patrón típico
            </div>
            <p style={{ color: "#a1a1aa" }}>
              {archetype.pattern}
            </p>
          </div>

          {/* Advice Card */}
          <div style={{
            background: "#22c55e15",
            border: "1px solid #22c55e40",
            borderRadius: 12,
            padding: 20,
            marginBottom: 24
          }}>
            <div style={{ 
              fontSize: 12, 
              fontWeight: 600, 
              color: "#22c55e", 
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1
            }}>
              💡 Consejo clave
            </div>
            <p style={{ color: "#d4d4d8" }}>
              {archetype.advice}
            </p>
          </div>

          {/* Secondary archetype */}
          {secondaryArchetype && (
            <div style={{
              background: "#141416",
              border: "1px solid #27272a",
              borderRadius: 12,
              padding: 16,
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 12
            }}>
              <span style={{ fontSize: 24 }}>{secondaryArchetype.emoji}</span>
              <div>
                <div style={{ fontSize: 12, color: "#71717a" }}>También tenés rasgos de</div>
                <div style={{ fontWeight: 600, color: secondaryArchetype.color }}>
                  {secondaryArchetype.name}
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: "flex", gap: 12 }}>
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
              {saving ? "Guardando..." : "Continuar"}
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
