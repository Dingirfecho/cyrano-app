// src/app/page.tsx

"use client"

import { useState, useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { 
  Brain, 
  Zap, 
  Target, 
  LogOut, 
  Loader2,
  AlertTriangle,
  CheckCircle,
  Copy,
  User,
  RefreshCw
} from "lucide-react"
import Quiz from "@/components/Quiz"
import { cyranoArchetypes, DimensionScores } from "@/lib/cyrano-archetypes"

interface AnalysisResult {
  perfil?: {
    mbti: string
    nombre: string
    disc: string
  }
  arquetipo?: {
    codigo: string
    nombre: string
    modalidad?: string
  }
  fallo?: {
    explicacion: string
    momento_critico: string
    porque: string
  }
  correcciones?: {
    calibrada: string
    edge: string
    suave: string
  }
  patron_vigilar?: string
  estado?: string
  mensaje?: string
  sugerencia_menor?: string
}

export default function Home() {
  const { data: session, status } = useSession()
  const [conversation, setConversation] = useState("")
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  
  // Quiz state
  const [checkingQuiz, setCheckingQuiz] = useState(true)
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false)
  const [userArchetype, setUserArchetype] = useState<string | null>(null)
  const [showQuickQuiz, setShowQuickQuiz] = useState(false)

  // Check if user has completed quiz
  useEffect(() => {
    if (session?.user?.id) {
      fetch('/api/quiz')
        .then(res => res.json())
        .then(data => {
          setHasCompletedQuiz(data.hasCompletedQuiz)
          setUserArchetype(data.archetype)
          setCheckingQuiz(false)
        })
        .catch(() => setCheckingQuiz(false))
    }
  }, [session])

  const handleQuizComplete = (archetype: string, scores: DimensionScores) => {
    setHasCompletedQuiz(true)
    setUserArchetype(archetype)
    setShowQuickQuiz(false)
  }

  const handleAnalyze = async () => {
    if (!conversation.trim()) {
      setError("Pegá una conversación primero")
      return
    }

    setLoading(true)
    setError("")
    setAnalysis(null)

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation, userArchetype })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Error al analizar")
      }

      setAnalysis(data.analysis)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  // Loading state
  if (status === "loading") {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0b"
      }}>
        <Loader2 style={{ width: 32, height: 32, color: "#ef4444", animation: "spin 1s linear infinite" }} />
      </div>
    )
  }

  // Not logged in - show landing
  if (!session) {
    return (
      <main style={{
        minHeight: "100vh",
        background: "#0a0a0b",
        color: "#fafafa",
        padding: "40px 20px"
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 60 }}>
            <div style={{
              width: 40,
              height: 40,
              background: "#ef4444",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Brain style={{ width: 24, height: 24, color: "white" }} />
            </div>
            <span style={{ fontSize: 24, fontWeight: "bold" }}>Cyrano</span>
          </div>

          {/* Hero */}
          <div style={{ marginBottom: 60 }}>
            <h1 style={{ fontSize: 48, fontWeight: "bold", lineHeight: 1.2, marginBottom: 24 }}>
              Tu dating no falla por lo que decís.
              <span style={{ color: "#ef4444" }}> Falla por cómo pensás.</span>
            </h1>
            
            <p style={{ fontSize: 20, color: "#a1a1aa", marginBottom: 32, maxWidth: 600 }}>
              Descubrí tu arquetipo de dating y aprendé por qué tus mensajes 
              no generan la atracción que buscás.
            </p>

            <button
              onClick={() => signIn("google")}
              style={{
                background: "#ef4444",
                color: "white",
                padding: "16px 32px",
                borderRadius: 8,
                border: "none",
                fontSize: 18,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12
              }}
            >
              <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Descubrir mi Arquetipo
            </button>

            <p style={{ fontSize: 14, color: "#71717a", marginTop: 16 }}>
              3 análisis gratis • Sin tarjeta de crédito
            </p>
          </div>

          {/* Archetypes Preview */}
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24, color: "#a1a1aa" }}>
              Los 6 Arquetipos de Dating
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {Object.values(cyranoArchetypes).map((arch) => (
                <div key={arch.id} style={{
                  background: "#141416",
                  border: "1px solid #27272a",
                  borderRadius: 12,
                  padding: 20,
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start"
                }}>
                  <span style={{ fontSize: 32 }}>{arch.emoji}</span>
                  <div>
                    <h3 style={{ fontWeight: 600, color: arch.color, marginBottom: 4 }}>
                      {arch.name}
                    </h3>
                    <p style={{ fontSize: 14, color: "#71717a" }}>
                      {arch.tagline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Checking quiz status
  if (checkingQuiz) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0b"
      }}>
        <Loader2 style={{ width: 32, height: 32, color: "#ef4444", animation: "spin 1s linear infinite" }} />
      </div>
    )
  }

  // Show quiz if not completed
  if (!hasCompletedQuiz || showQuickQuiz) {
    return <Quiz onComplete={handleQuizComplete} isQuickQuiz={showQuickQuiz} />
  }

  // Logged in with quiz completed - show app
  const archetype = userArchetype ? cyranoArchetypes[userArchetype] : null

  return (
    <main style={{
      minHeight: "100vh",
      background: "#0a0a0b",
      color: "#fafafa"
    }}>
      {/* Header */}
      <header style={{
        borderBottom: "1px solid #27272a",
        padding: "16px 20px",
        background: "#141416"
      }}>
        <div style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 32,
              height: 32,
              background: "#ef4444",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Brain style={{ width: 20, height: 20, color: "white" }} />
            </div>
            <span style={{ fontSize: 20, fontWeight: "bold" }}>Cyrano</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* User Archetype Badge */}
            {archetype && (
              <div 
                onClick={() => setShowQuickQuiz(true)}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 8, 
                  cursor: "pointer",
                  padding: "6px 12px",
                  background: "#27272a",
                  borderRadius: 6
                }}
                title="Click para recalcular tu arquetipo"
              >
                <span style={{ fontSize: 18 }}>{archetype.emoji}</span>
                <span style={{ color: archetype.color, fontWeight: 600, fontSize: 14 }}>{archetype.name}</span>
                <RefreshCw style={{ width: 14, height: 14, color: "#71717a" }} />
              </div>
            )}
            
            <span style={{ color: "#71717a" }}>
              Créditos: <strong style={{ color: "white" }}>{session.user.credits}</strong>
            </span>
            
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {session.user.image ? (
                <img 
                  src={session.user.image} 
                  alt="Avatar" 
                  style={{ width: 32, height: 32, borderRadius: "50%" }}
                />
              ) : (
                <User style={{ width: 32, height: 32, color: "#71717a" }} />
              )}
              <button
                onClick={() => signOut()}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#71717a"
                }}
              >
                <LogOut style={{ width: 20, height: 20 }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
        
        {/* User Archetype Card */}
        {archetype && (
          <div style={{
            background: `${archetype.color}10`,
            border: `1px solid ${archetype.color}30`,
            borderRadius: 12,
            padding: 20,
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 40 }}>{archetype.emoji}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 18, color: archetype.color }}>
                  {archetype.name}
                </div>
                <div style={{ fontSize: 14, color: "#a1a1aa" }}>
                  {archetype.tagline}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowQuickQuiz(true)}
              style={{
                padding: "8px 16px",
                background: "#27272a",
                color: "#a1a1aa",
                border: "none",
                borderRadius: 6,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
            >
              <RefreshCw style={{ width: 14, height: 14 }} />
              Recalcular
            </button>
          </div>
        )}

        {/* Input section */}
        <div style={{ marginBottom: 40 }}>
          <label style={{ display: "block", marginBottom: 12 }}>
            <span style={{ fontSize: 18, fontWeight: 500 }}>Pegá tu conversación</span>
            <span style={{ color: "#71717a", marginLeft: 8, fontSize: 14 }}>
              (copiá y pegá el chat que querés analizar)
            </span>
          </label>
          
          <textarea
            value={conversation}
            onChange={(e) => setConversation(e.target.value)}
            placeholder={"Yo: Hola, cómo estás?\nElla: Bien y vos?\nYo: Todo bien, qué hacés?"}
            style={{
              width: "100%",
              minHeight: 150,
              background: "#141416",
              border: "1px solid #27272a",
              borderRadius: 8,
              padding: 16,
              color: "white",
              fontSize: 14,
              fontFamily: "monospace",
              resize: "vertical",
              marginBottom: 16
            }}
          />

          {error && (
            <div style={{
              background: "#ef444420",
              border: "1px solid #ef444450",
              borderRadius: 8,
              padding: 12,
              color: "#fca5a5",
              marginBottom: 16
            }}>
              {error}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading || !conversation.trim()}
            style={{
              width: "100%",
              background: loading ? "#71717a" : "#ef4444",
              color: "white",
              padding: "16px 24px",
              borderRadius: 8,
              border: "none",
              fontSize: 16,
              fontWeight: 500,
              cursor: loading ? "wait" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: !conversation.trim() ? 0.5 : 1
            }}
          >
            {loading ? (
              <>
                <Loader2 style={{ width: 20, height: 20, animation: "spin 1s linear infinite" }} />
                Analizando...
              </>
            ) : (
              <>
                <Brain style={{ width: 20, height: 20 }} />
                Analizar Conversación
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {analysis && (
          <div style={{ animation: "fadeIn 0.5s ease-out" }}>
            {/* Success state */}
            {analysis.estado === "ok" ? (
              <div style={{
                background: "#22c55e20",
                border: "1px solid #22c55e50",
                borderRadius: 12,
                padding: 24
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <CheckCircle style={{ width: 32, height: 32, color: "#22c55e", flexShrink: 0 }} />
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 600, color: "#86efac", marginBottom: 8 }}>
                      ¡Bien ahí!
                    </h3>
                    <p style={{ color: "#d4d4d8" }}>{analysis.mensaje}</p>
                    {analysis.sugerencia_menor && (
                      <p style={{ color: "#71717a", marginTop: 8, fontSize: 14 }}>
                        💡 {analysis.sugerencia_menor}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {/* Diagnosis Header */}
                <div style={{
                  background: "#141416",
                  border: "1px solid #27272a",
                  borderRadius: 12,
                  padding: 24
                }}>
                  <h2 style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#71717a",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 20
                  }}>
                    🧬 Tu Diagnóstico
                  </h2>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                    <div>
                      <div style={{ fontSize: 12, color: "#71717a", marginBottom: 4 }}>Perfil MBTI</div>
                      <div style={{ fontSize: 28, fontWeight: "bold", color: "#ef4444" }}>
                        {analysis.perfil?.mbti}
                      </div>
                      <div style={{ fontSize: 14, color: "#a1a1aa" }}>
                        {analysis.perfil?.nombre}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: 12, color: "#71717a", marginBottom: 4 }}>Vector DISC</div>
                      <div style={{ fontSize: 16, fontWeight: 500, color: "#d4d4d8" }}>
                        {analysis.perfil?.disc}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: 12, color: "#71717a", marginBottom: 4 }}>Arquetipo</div>
                      <div style={{ fontSize: 18, fontWeight: "bold", color: "#f59e0b" }}>
                        {analysis.arquetipo?.codigo}
                      </div>
                      <div style={{ fontSize: 14, color: "#a1a1aa" }}>
                        {analysis.arquetipo?.nombre}
                        {analysis.arquetipo?.modalidad && (
                          <span style={{ color: "#71717a" }}> ({analysis.arquetipo.modalidad})</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* The Failure */}
                <div style={{
                  background: "#141416",
                  border: "1px solid #27272a",
                  borderRadius: 12,
                  padding: 24
                }}>
                  <h3 style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#71717a",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 16
                  }}>
                    ⚠️ El Fallo
                  </h3>
                  
                  <p style={{ color: "#d4d4d8", marginBottom: 20, lineHeight: 1.6 }}>
                    {analysis.fallo?.explicacion}
                  </p>

                  <div style={{
                    background: "#0a0a0b",
                    borderRadius: 8,
                    padding: 16,
                    marginBottom: 16
                  }}>
                    <div style={{ fontSize: 12, color: "#71717a", marginBottom: 8 }}>Momento crítico:</div>
                    <p style={{ color: "#fca5a5", fontFamily: "monospace", fontSize: 14 }}>
                      "{analysis.fallo?.momento_critico}"
                    </p>
                  </div>

                  <p style={{ color: "#a1a1aa", fontSize: 14 }}>
                    {analysis.fallo?.porque}
                  </p>
                </div>

                {/* Corrections */}
                <div style={{
                  background: "#141416",
                  border: "1px solid #27272a",
                  borderRadius: 12,
                  padding: 24
                }}>
                  <h3 style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#71717a",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 16
                  }}>
                    ✅ Cómo Deberías Responder
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                      { label: "CALIBRADA", color: "#22c55e", text: analysis.correcciones?.calibrada, idx: 0 },
                      { label: "CON EDGE", color: "#f59e0b", text: analysis.correcciones?.edge, idx: 1 },
                      { label: "MÁS SUAVE", color: "#3b82f6", text: analysis.correcciones?.suave, idx: 2 }
                    ].map((correction) => (
                      <div key={correction.idx} style={{
                        background: "#0a0a0b",
                        borderRadius: 8,
                        padding: 16
                      }}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 8
                        }}>
                          <span style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: correction.color,
                            textTransform: "uppercase",
                            letterSpacing: 1
                          }}>
                            {correction.label}
                          </span>
                          <button
                            onClick={() => copyToClipboard(correction.text || "", correction.idx)}
                            style={{
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              color: copiedIndex === correction.idx ? "#22c55e" : "#71717a"
                            }}
                          >
                            {copiedIndex === correction.idx ? (
                              <CheckCircle style={{ width: 16, height: 16 }} />
                            ) : (
                              <Copy style={{ width: 16, height: 16 }} />
                            )}
                          </button>
                        </div>
                        <p style={{ color: "#e4e4e7", lineHeight: 1.5 }}>{correction.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pattern to Watch */}
                <div style={{
                  background: "#ef444420",
                  border: "1px solid #ef444450",
                  borderRadius: 12,
                  padding: 24
                }}>
                  <h3 style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#fca5a5",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 12
                  }}>
                    🎯 Patrón a Vigilar
                  </h3>
                  <p style={{ color: "#fecaca", lineHeight: 1.6 }}>
                    {analysis.patron_vigilar}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
