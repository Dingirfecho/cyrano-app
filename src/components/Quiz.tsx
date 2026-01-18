// src/components/Quiz.tsx

"use client"

import { useState } from "react"
import { quizQuestions, calculateMBTI, mbtiDescriptions, quickQuizIds } from "@/lib/quiz-questions"
import { Brain, ChevronRight, Check, RotateCcw } from "lucide-react"

interface QuizProps {
  onComplete: (profile: string, scores: { E: number, S: number, T: number, J: number }) => void
  isQuickQuiz?: boolean
}

export default function Quiz({ onComplete, isQuickQuiz = false }: QuizProps) {
  const questions = isQuickQuiz 
    ? quizQuestions.filter(q => quickQuizIds.includes(q.id))
    : quizQuestions

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({})
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<{ profile: string, scores: { E: number, S: number, T: number, J: number } } | null>(null)
  const [saving, setSaving] = useState(false)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex) / questions.length) * 100

  const handleAnswer = (answer: 'A' | 'B') => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer }
    setAnswers(newAnswers)

    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300)
    } else {
      // Quiz completado
      const calculated = calculateMBTI(newAnswers)
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
        body: JSON.stringify(result)
      })
      
      if (res.ok) {
        onComplete(result.profile, result.scores)
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
    const description = mbtiDescriptions[result.profile]
    
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
          width: "100%",
          textAlign: "center"
        }}>
          <div style={{
            width: 80,
            height: 80,
            background: "#22c55e20",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px"
          }}>
            <Check style={{ width: 40, height: 40, color: "#22c55e" }} />
          </div>

          <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 8 }}>
            Tu perfil es
          </h1>
          
          <div style={{
            fontSize: 64,
            fontWeight: "bold",
            color: "#ef4444",
            marginBottom: 8
          }}>
            {result.profile}
          </div>
          
          <div style={{ fontSize: 24, color: "#a1a1aa", marginBottom: 24 }}>
            {description?.name}
          </div>

          {/* Scores */}
          <div style={{
            background: "#141416",
            border: "1px solid #27272a",
            borderRadius: 12,
            padding: 24,
            marginBottom: 24,
            textAlign: "left"
          }}>
            <div style={{ fontSize: 12, color: "#71717a", marginBottom: 16, textTransform: "uppercase" }}>
              Tus dimensiones
            </div>
            
            {[
              { label: 'Extroversión', value: result.scores.E, left: 'I', right: 'E' },
              { label: 'Sensorial', value: result.scores.S, left: 'N', right: 'S' },
              { label: 'Pensamiento', value: result.scores.T, left: 'F', right: 'T' },
              { label: 'Juicio', value: result.scores.J, left: 'P', right: 'J' }
            ].map((dim, i) => (
              <div key={i} style={{ marginBottom: i < 3 ? 16 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 4 }}>
                  <span style={{ color: "#71717a" }}>{dim.left}</span>
                  <span style={{ color: "#a1a1aa" }}>{dim.label}</span>
                  <span style={{ color: "#71717a" }}>{dim.right}</span>
                </div>
                <div style={{
                  height: 8,
                  background: "#27272a",
                  borderRadius: 4,
                  overflow: "hidden"
                }}>
                  <div style={{
                    height: "100%",
                    width: `${dim.value}%`,
                    background: dim.value > 50 ? "#ef4444" : "#3b82f6",
                    borderRadius: 4,
                    transition: "width 0.5s ease"
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Weakness warning */}
          <div style={{
            background: "#f59e0b20",
            border: "1px solid #f59e0b50",
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            textAlign: "left"
          }}>
            <div style={{ fontSize: 12, color: "#fbbf24", marginBottom: 8, fontWeight: 600 }}>
              ⚠️ TU TALÓN DE AQUILES EN DATING
            </div>
            <p style={{ color: "#fef3c7" }}>
              {description?.weakness}
            </p>
          </div>

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
                background: "#ef4444",
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
              {saving ? "Guardando..." : "Continuar al análisis"}
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
            {isQuickQuiz ? "Quiz Rápido" : "Descubrí tu Perfil"}
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
            fontSize: 24,
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
                padding: 24,
                background: answers[currentQuestion.id] === 'A' ? "#ef444430" : "#141416",
                border: answers[currentQuestion.id] === 'A' ? "2px solid #ef4444" : "1px solid #27272a",
                borderRadius: 12,
                color: "white",
                fontSize: 16,
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ 
                display: "inline-block",
                width: 28,
                height: 28,
                background: "#27272a",
                borderRadius: "50%",
                textAlign: "center",
                lineHeight: "28px",
                marginRight: 12,
                fontSize: 14,
                fontWeight: 600
              }}>
                A
              </span>
              {currentQuestion.optionA.text}
            </button>

            <button
              onClick={() => handleAnswer('B')}
              style={{
                padding: 24,
                background: answers[currentQuestion.id] === 'B' ? "#3b82f630" : "#141416",
                border: answers[currentQuestion.id] === 'B' ? "2px solid #3b82f6" : "1px solid #27272a",
                borderRadius: 12,
                color: "white",
                fontSize: 16,
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ 
                display: "inline-block",
                width: 28,
                height: 28,
                background: "#27272a",
                borderRadius: "50%",
                textAlign: "center",
                lineHeight: "28px",
                marginRight: 12,
                fontSize: 14,
                fontWeight: 600
              }}>
                B
              </span>
              {currentQuestion.optionB.text}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
