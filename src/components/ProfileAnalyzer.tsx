// src/components/ProfileAnalyzer.tsx

"use client"

import { useState, useRef } from "react"
import { 
  Upload, 
  X, 
  Camera, 
  Loader2, 
  Star, 
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Target,
  Image as ImageIcon
} from "lucide-react"

interface ProfileAnalysis {
  puntuacion_general: number
  resumen: string
  fotos: {
    puntuacion: number
    diagnostico: string
    problemas: string[]
    mejoras: string[]
  }
  bio: {
    puntuacion: number
    diagnostico: string
    problemas: string[]
    mejoras: string[]
    ejemplo_bio: string
  }
  prompts: {
    puntuacion: number
    diagnostico: string
    problemas: string[]
    mejoras: string[]
  }
  estrategia_arquetipo: {
    como_tu_arquetipo_afecta: string
    trampa_a_evitar: string
    consejo_personalizado: string
  }
  plan_de_accion: {
    prioridad: number
    accion: string
    porque: string
    como: string
  }[]
  veredicto_final: string
  raw_response?: string
}

const APPS = [
  { id: 'tinder', name: 'Tinder', color: '#FE3C72', emoji: '🔥' },
  { id: 'bumble', name: 'Bumble', color: '#FFC629', emoji: '🐝' },
  { id: 'hinge', name: 'Hinge', color: '#5C5C5C', emoji: '💜' },
  { id: 'inner_circle', name: 'Inner Circle', color: '#1E3A5F', emoji: '💎' },
  { id: 'happn', name: 'Happn', color: '#F76D6D', emoji: '📍' },
  { id: 'otra', name: 'Otra app', color: '#71717a', emoji: '📱' }
]

export default function ProfileAnalyzer() {
  const [selectedApp, setSelectedApp] = useState<string>('')
  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<ProfileAnalysis | null>(null)
  const [error, setError] = useState('')
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    fotos: true,
    bio: true,
    prompts: false,
    arquetipo: false,
    plan: true
  })
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + images.length > 5) {
      setError('Máximo 5 imágenes')
      return
    }

    const validFiles = files.filter(f => f.type.startsWith('image/'))
    setImages(prev => [...prev, ...validFiles])
    
    // Crear previews
    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviews(prev => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
    
    setError('')
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleAnalyze = async () => {
    if (!selectedApp) {
      setError('Seleccioná una app')
      return
    }
    if (images.length === 0) {
      setError('Subí al menos una imagen')
      return
    }

    setLoading(true)
    setError('')
    setAnalysis(null)

    try {
      const formData = new FormData()
      formData.append('app', selectedApp)
      images.forEach(img => formData.append('images', img))

      const res = await fetch('/api/analyze-profile', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al analizar')
      }

      setAnalysis(data.analysis)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedApp('')
    setImages([])
    setPreviews([])
    setAnalysis(null)
    setError('')
  }

  const ScoreBar = ({ score, label }: { score: number, label: string }) => {
    const color = score >= 7 ? '#22c55e' : score >= 5 ? '#f59e0b' : '#ef4444'
    return (
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 14, color: '#a1a1aa' }}>{label}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color }}>{score}/10</span>
        </div>
        <div style={{ height: 8, background: '#27272a', borderRadius: 4 }}>
          <div style={{
            height: '100%',
            width: `${score * 10}%`,
            background: color,
            borderRadius: 4,
            transition: 'width 0.5s ease'
          }} />
        </div>
      </div>
    )
  }

  const ExpandableCard = ({ 
    id, 
    title, 
    emoji,
    score,
    children 
  }: { 
    id: string
    title: string
    emoji: string
    score?: number
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
          <span style={{ fontWeight: 600 }}>{title}</span>
          {score !== undefined && (
            <span style={{
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 600,
              background: score >= 7 ? '#22c55e20' : score >= 5 ? '#f59e0b20' : '#ef444420',
              color: score >= 7 ? '#22c55e' : score >= 5 ? '#f59e0b' : '#ef4444'
            }}>
              {score}/10
            </span>
          )}
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

  // Si hay análisis, mostrar resultados
  if (analysis) {
    const scoreColor = analysis.puntuacion_general >= 7 ? '#22c55e' : 
                       analysis.puntuacion_general >= 5 ? '#f59e0b' : '#ef4444'

    return (
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Header con puntuación */}
        <div style={{
          background: '#141416',
          border: '1px solid #27272a',
          borderRadius: 16,
          padding: 32,
          marginBottom: 24,
          textAlign: 'center'
        }}>
          <div style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: `${scoreColor}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            border: `3px solid ${scoreColor}`
          }}>
            <span style={{ fontSize: 36, fontWeight: 700, color: scoreColor }}>
              {analysis.puntuacion_general}
            </span>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>
            Puntuación General
          </h2>
          <p style={{ color: '#a1a1aa', fontSize: 16, lineHeight: 1.6 }}>
            {analysis.resumen}
          </p>
        </div>

        {/* Barras de puntuación rápida */}
        <div style={{
          background: '#141416',
          border: '1px solid #27272a',
          borderRadius: 12,
          padding: 24,
          marginBottom: 24
        }}>
          <ScoreBar score={analysis.fotos?.puntuacion || 0} label="Fotos" />
          <ScoreBar score={analysis.bio?.puntuacion || 0} label="Bio" />
          <ScoreBar score={analysis.prompts?.puntuacion || 0} label="Prompts" />
        </div>

        {/* Sección Fotos */}
        {analysis.fotos && (
          <ExpandableCard id="fotos" title="Análisis de Fotos" emoji="📸" score={analysis.fotos.puntuacion}>
            <div style={{ marginTop: 16 }}>
              <p style={{ color: '#d4d4d8', lineHeight: 1.7, marginBottom: 16 }}>
                {analysis.fotos.diagnostico}
              </p>
              
              {analysis.fotos.problemas?.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: '#ef4444', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <AlertTriangle style={{ width: 14, height: 14 }} />
                    Problemas detectados
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {analysis.fotos.problemas.map((p, i) => (
                      <li key={i} style={{ color: '#fca5a5', marginBottom: 6 }}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.fotos.mejoras?.length > 0 && (
                <div>
                  <div style={{ fontSize: 12, color: '#22c55e', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle style={{ width: 14, height: 14 }} />
                    Cómo mejorarlo
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {analysis.fotos.mejoras.map((m, i) => (
                      <li key={i} style={{ color: '#86efac', marginBottom: 6 }}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ExpandableCard>
        )}

        {/* Sección Bio */}
        {analysis.bio && (
          <ExpandableCard id="bio" title="Análisis de Bio" emoji="✍️" score={analysis.bio.puntuacion}>
            <div style={{ marginTop: 16 }}>
              <p style={{ color: '#d4d4d8', lineHeight: 1.7, marginBottom: 16 }}>
                {analysis.bio.diagnostico}
              </p>
              
              {analysis.bio.problemas?.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: '#ef4444', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <AlertTriangle style={{ width: 14, height: 14 }} />
                    Problemas detectados
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {analysis.bio.problemas.map((p, i) => (
                      <li key={i} style={{ color: '#fca5a5', marginBottom: 6 }}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.bio.mejoras?.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: '#22c55e', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle style={{ width: 14, height: 14 }} />
                    Cómo mejorarlo
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {analysis.bio.mejoras.map((m, i) => (
                      <li key={i} style={{ color: '#86efac', marginBottom: 6 }}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.bio.ejemplo_bio && (
                <div style={{
                  background: '#0a0a0b',
                  border: '1px solid #3b82f6',
                  borderRadius: 8,
                  padding: 16
                }}>
                  <div style={{ fontSize: 12, color: '#3b82f6', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Lightbulb style={{ width: 14, height: 14 }} />
                    Bio sugerida para vos
                  </div>
                  <p style={{ color: '#e4e4e7', fontStyle: 'italic', lineHeight: 1.6 }}>
                    "{analysis.bio.ejemplo_bio}"
                  </p>
                </div>
              )}
            </div>
          </ExpandableCard>
        )}

        {/* Sección Prompts */}
        {analysis.prompts && (
          <ExpandableCard id="prompts" title="Análisis de Prompts" emoji="💬" score={analysis.prompts.puntuacion}>
            <div style={{ marginTop: 16 }}>
              <p style={{ color: '#d4d4d8', lineHeight: 1.7, marginBottom: 16 }}>
                {analysis.prompts.diagnostico}
              </p>
              
              {analysis.prompts.problemas?.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: '#ef4444', textTransform: 'uppercase', marginBottom: 8 }}>
                    Problemas detectados
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {analysis.prompts.problemas.map((p, i) => (
                      <li key={i} style={{ color: '#fca5a5', marginBottom: 6 }}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.prompts.mejoras?.length > 0 && (
                <div>
                  <div style={{ fontSize: 12, color: '#22c55e', textTransform: 'uppercase', marginBottom: 8 }}>
                    Cómo mejorarlo
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {analysis.prompts.mejoras.map((m, i) => (
                      <li key={i} style={{ color: '#86efac', marginBottom: 6 }}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ExpandableCard>
        )}

        {/* Sección Arquetipo */}
        {analysis.estrategia_arquetipo && (
          <ExpandableCard id="arquetipo" title="Análisis según tu Arquetipo" emoji="🎯">
            <div style={{ marginTop: 16 }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: '#a78bfa', textTransform: 'uppercase', marginBottom: 8 }}>
                  Cómo tu arquetipo afecta tu perfil
                </div>
                <p style={{ color: '#d4d4d8', lineHeight: 1.7 }}>
                  {analysis.estrategia_arquetipo.como_tu_arquetipo_afecta}
                </p>
              </div>

              <div style={{
                background: '#ef444420',
                border: '1px solid #ef444450',
                borderRadius: 8,
                padding: 16,
                marginBottom: 16
              }}>
                <div style={{ fontSize: 12, color: '#ef4444', textTransform: 'uppercase', marginBottom: 8 }}>
                  ⚠️ Trampa a evitar
                </div>
                <p style={{ color: '#fca5a5', lineHeight: 1.6 }}>
                  {analysis.estrategia_arquetipo.trampa_a_evitar}
                </p>
              </div>

              <div style={{
                background: '#22c55e20',
                border: '1px solid #22c55e50',
                borderRadius: 8,
                padding: 16
              }}>
                <div style={{ fontSize: 12, color: '#22c55e', textTransform: 'uppercase', marginBottom: 8 }}>
                  💡 Consejo personalizado
                </div>
                <p style={{ color: '#86efac', lineHeight: 1.6 }}>
                  {analysis.estrategia_arquetipo.consejo_personalizado}
                </p>
              </div>
            </div>
          </ExpandableCard>
        )}

        {/* Plan de Acción */}
        {analysis.plan_de_accion && analysis.plan_de_accion.length > 0 && (
          <ExpandableCard id="plan" title="Plan de Acción" emoji="📋">
            <div style={{ marginTop: 16 }}>
              {analysis.plan_de_accion.map((item, i) => (
                <div key={i} style={{
                  background: '#0a0a0b',
                  borderRadius: 8,
                  padding: 16,
                  marginBottom: 12,
                  borderLeft: `3px solid ${i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : '#22c55e'}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : '#22c55e',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 700
                    }}>
                      {item.prioridad}
                    </span>
                    <span style={{ fontWeight: 600, color: '#e4e4e7' }}>{item.accion}</span>
                  </div>
                  <p style={{ color: '#a1a1aa', fontSize: 14, marginBottom: 8 }}>
                    <strong>Por qué:</strong> {item.porque}
                  </p>
                  <p style={{ color: '#71717a', fontSize: 14 }}>
                    <strong>Cómo:</strong> {item.como}
                  </p>
                </div>
              ))}
            </div>
          </ExpandableCard>
        )}

        {/* Veredicto Final */}
        {analysis.veredicto_final && (
          <div style={{
            background: 'linear-gradient(135deg, #141416 0%, #1a1a1c 100%)',
            border: '1px solid #27272a',
            borderRadius: 12,
            padding: 24,
            marginBottom: 24
          }}>
            <div style={{ fontSize: 12, color: '#71717a', textTransform: 'uppercase', marginBottom: 12 }}>
              📝 Veredicto Final
            </div>
            <p style={{ color: '#d4d4d8', lineHeight: 1.8, fontSize: 16 }}>
              {analysis.veredicto_final}
            </p>
          </div>
        )}

        {/* Botón para nuevo análisis */}
        <button
          onClick={handleReset}
          style={{
            width: '100%',
            padding: '16px 24px',
            background: '#27272a',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontSize: 16,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
        >
          <Camera style={{ width: 20, height: 20 }} />
          Analizar otro perfil
        </button>
      </div>
    )
  }

  // Formulario de upload
  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          width: 80,
          height: 80,
          background: '#ec489920',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <Camera style={{ width: 40, height: 40, color: '#ec4899' }} />
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
          Análisis de Perfil
        </h2>
        <p style={{ color: '#71717a', lineHeight: 1.6 }}>
          Subí screenshots de tu perfil y recibí un análisis detallado con 
          recomendaciones personalizadas según tu arquetipo.
        </p>
      </div>

      {/* Selector de app */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', fontSize: 14, color: '#a1a1aa', marginBottom: 12 }}>
          ¿Qué app querés analizar?
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {APPS.map(app => (
            <button
              key={app.id}
              onClick={() => setSelectedApp(app.id)}
              style={{
                padding: '16px 12px',
                background: selectedApp === app.id ? `${app.color}20` : '#141416',
                border: selectedApp === app.id ? `2px solid ${app.color}` : '1px solid #27272a',
                borderRadius: 10,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 4 }}>{app.emoji}</div>
              <div style={{ 
                fontSize: 13, 
                color: selectedApp === app.id ? app.color : '#a1a1aa',
                fontWeight: selectedApp === app.id ? 600 : 400
              }}>
                {app.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Upload zone */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', fontSize: 14, color: '#a1a1aa', marginBottom: 12 }}>
          Screenshots de tu perfil (máx. 5)
        </label>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {previews.length === 0 ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: '2px dashed #27272a',
              borderRadius: 12,
              padding: 40,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = '#ef4444'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = '#27272a'}
          >
            <Upload style={{ width: 40, height: 40, color: '#71717a', margin: '0 auto 12px' }} />
            <p style={{ color: '#a1a1aa', marginBottom: 4 }}>
              Click para subir imágenes
            </p>
            <p style={{ color: '#52525b', fontSize: 13 }}>
              PNG, JPG hasta 5MB cada una
            </p>
          </div>
        ) : (
          <div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
              gap: 12,
              marginBottom: 12
            }}>
              {previews.map((preview, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <img
                    src={preview}
                    alt={`Preview ${i + 1}`}
                    style={{
                      width: '100%',
                      height: 100,
                      objectFit: 'cover',
                      borderRadius: 8,
                      border: '1px solid #27272a'
                    }}
                  />
                  <button
                    onClick={() => removeImage(i)}
                    style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: '#ef4444',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <X style={{ width: 14, height: 14, color: 'white' }} />
                  </button>
                </div>
              ))}
              
              {previews.length < 5 && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    height: 100,
                    border: '2px dashed #27272a',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <ImageIcon style={{ width: 24, height: 24, color: '#52525b' }} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: '#ef444420',
          border: '1px solid #ef444450',
          borderRadius: 8,
          padding: 12,
          color: '#fca5a5',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <AlertTriangle style={{ width: 16, height: 16 }} />
          {error}
        </div>
      )}

      {/* Tips */}
      <div style={{
        background: '#141416',
        border: '1px solid #27272a',
        borderRadius: 12,
        padding: 20,
        marginBottom: 24
      }}>
        <div style={{ fontSize: 12, color: '#71717a', textTransform: 'uppercase', marginBottom: 12 }}>
          💡 Tips para mejores resultados
        </div>
        <ul style={{ margin: 0, paddingLeft: 20, color: '#a1a1aa', fontSize: 14 }}>
          <li style={{ marginBottom: 6 }}>Incluí todas las fotos de tu perfil</li>
          <li style={{ marginBottom: 6 }}>Capturá la bio completa</li>
          <li style={{ marginBottom: 6 }}>Si tenés prompts o respuestas, incluílas</li>
          <li>Asegurate de que el texto se lea claramente</li>
        </ul>
      </div>

      {/* Botón de análisis */}
      <button
        onClick={handleAnalyze}
        disabled={loading || !selectedApp || images.length === 0}
        style={{
          width: '100%',
          padding: '18px 24px',
          background: loading || !selectedApp || images.length === 0 
            ? '#27272a' 
            : 'linear-gradient(135deg, #ec4899 0%, #ef4444 100%)',
          color: loading || !selectedApp || images.length === 0 ? '#71717a' : 'white',
          border: 'none',
          borderRadius: 12,
          fontSize: 18,
          fontWeight: 600,
          cursor: loading || !selectedApp || images.length === 0 ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12
        }}
      >
        {loading ? (
          <>
            <Loader2 style={{ width: 20, height: 20, animation: 'spin 1s linear infinite' }} />
            Analizando tu perfil...
          </>
        ) : (
          <>
            <Target style={{ width: 20, height: 20 }} />
            Analizar Perfil (1 crédito)
          </>
        )}
      </button>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
