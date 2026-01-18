// src/app/admin/page.tsx

"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  Users,
  BarChart3,
  CreditCard,
  Activity,
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit,
  X,
  Check,
  Shield,
  Loader2,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"

interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
  credits: number
  plan: string
  role: string
  mbtiProfile: string | null
  quizCompletedAt: string | null
  createdAt: string
  _count: {
    analyses: number
  }
}

interface Stats {
  overview: {
    totalUsers: number
    usersLast7Days: number
    usersLast30Days: number
    totalAnalyses: number
    analysesLast7Days: number
    avgAnalysesPerUser: string | number
  }
  usersByPlan: { plan: string; count: number }[]
  usersByArchetype: { archetype: string; count: number }[]
  recentUsers: any[]
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users'>('dashboard')
  const [stats, setStats] = useState<Stats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editForm, setEditForm] = useState({ credits: 0, plan: 'FREE', role: 'USER' })
  const [saving, setSaving] = useState(false)

  // Verificar acceso admin
  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/')
      return
    }

    // Verificar rol admin
    fetch('/api/admin/stats')
      .then(res => {
        if (res.status === 403) {
          router.push('/')
        }
        return res.json()
      })
      .then(data => {
        if (data.overview) {
          setStats(data)
        }
        setLoading(false)
      })
      .catch(() => {
        router.push('/')
      })
  }, [session, status, router])

  // Cargar usuarios
  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers()
    }
  }, [activeTab, page, search])

  const fetchUsers = async () => {
    try {
      const res = await fetch(`/api/admin/users?page=${page}&search=${search}`)
      const data = await res.json()
      setUsers(data.users || [])
      setTotalPages(data.pagination?.pages || 1)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setEditForm({
      credits: user.credits,
      plan: user.plan,
      role: user.role
    })
  }

  const handleSave = async () => {
    if (!editingUser) return
    
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      })
      
      if (res.ok) {
        setEditingUser(null)
        fetchUsers()
      }
    } catch (error) {
      console.error('Error saving user:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.')) {
      return
    }
    
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      })
      
      if (res.ok) {
        fetchUsers()
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  if (loading || status === 'loading') {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0a0a0b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Loader2 style={{ width: 32, height: 32, color: "#ef4444", animation: "spin 1s linear infinite" }} />
      </div>
    )
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0b",
      color: "#fafafa"
    }}>
      {/* Header */}
      <header style={{
        background: "#141416",
        borderBottom: "1px solid #27272a",
        padding: "16px 24px"
      }}>
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/" style={{ color: "#71717a", display: "flex", alignItems: "center", gap: 8 }}>
              <ArrowLeft style={{ width: 20, height: 20 }} />
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Shield style={{ width: 24, height: 24, color: "#ef4444" }} />
              <h1 style={{ fontSize: 20, fontWeight: 600 }}>Panel de Administración</h1>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{
                padding: "8px 16px",
                background: activeTab === 'dashboard' ? "#ef4444" : "#27272a",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8
              }}
            >
              <BarChart3 style={{ width: 16, height: 16 }} />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('users')}
              style={{
                padding: "8px 16px",
                background: activeTab === 'users' ? "#ef4444" : "#27272a",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8
              }}
            >
              <Users style={{ width: 16, height: 16 }} />
              Usuarios
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1400, margin: "0 auto", padding: 24 }}>
        {activeTab === 'dashboard' && stats && (
          <>
            {/* Stats Cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              marginBottom: 32
            }}>
              {[
                { label: "Total Usuarios", value: stats.overview.totalUsers, icon: Users, color: "#3b82f6" },
                { label: "Nuevos (7 días)", value: stats.overview.usersLast7Days, icon: Activity, color: "#22c55e" },
                { label: "Nuevos (30 días)", value: stats.overview.usersLast30Days, icon: Activity, color: "#22c55e" },
                { label: "Total Análisis", value: stats.overview.totalAnalyses, icon: BarChart3, color: "#f59e0b" },
                { label: "Análisis (7 días)", value: stats.overview.analysesLast7Days, icon: BarChart3, color: "#f59e0b" },
                { label: "Promedio/Usuario", value: stats.overview.avgAnalysesPerUser, icon: CreditCard, color: "#8b5cf6" }
              ].map((stat, i) => (
                <div key={i} style={{
                  background: "#141416",
                  border: "1px solid #27272a",
                  borderRadius: 12,
                  padding: 20
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      background: `${stat.color}20`,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <stat.icon style={{ width: 20, height: 20, color: stat.color }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: stat.color }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 14, color: "#71717a" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {/* Usuarios por Plan */}
              <div style={{
                background: "#141416",
                border: "1px solid #27272a",
                borderRadius: 12,
                padding: 24
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Usuarios por Plan</h3>
                {stats.usersByPlan.map((p, i) => (
                  <div key={i} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom: i < stats.usersByPlan.length - 1 ? "1px solid #27272a" : "none"
                  }}>
                    <span style={{
                      padding: "4px 12px",
                      background: p.plan === 'FREE' ? "#3b82f620" : p.plan === 'PRO' ? "#22c55e20" : "#f59e0b20",
                      color: p.plan === 'FREE' ? "#3b82f6" : p.plan === 'PRO' ? "#22c55e" : "#f59e0b",
                      borderRadius: 6,
                      fontSize: 14,
                      fontWeight: 600
                    }}>
                      {p.plan}
                    </span>
                    <span style={{ fontSize: 20, fontWeight: 600 }}>{p.count}</span>
                  </div>
                ))}
              </div>

              {/* Usuarios por Arquetipo */}
              <div style={{
                background: "#141416",
                border: "1px solid #27272a",
                borderRadius: 12,
                padding: 24
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Usuarios por Arquetipo</h3>
                {stats.usersByArchetype.slice(0, 6).map((a, i) => (
                  <div key={i} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom: i < 5 ? "1px solid #27272a" : "none"
                  }}>
                    <span style={{ color: "#d4d4d8" }}>{a.archetype || 'Sin completar'}</span>
                    <span style={{ fontSize: 18, fontWeight: 600, color: "#ef4444" }}>{a.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Usuarios Recientes */}
            <div style={{
              background: "#141416",
              border: "1px solid #27272a",
              borderRadius: 12,
              padding: 24,
              marginTop: 24
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Últimos Registros</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {stats.recentUsers.map((user, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: 12,
                    background: "#0a0a0b",
                    borderRadius: 8
                  }}>
                    {user.image ? (
                      <img src={user.image} alt="" style={{ width: 40, height: 40, borderRadius: "50%" }} />
                    ) : (
                      <div style={{ width: 40, height: 40, background: "#27272a", borderRadius: "50%" }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500 }}>{user.name || 'Sin nombre'}</div>
                      <div style={{ fontSize: 14, color: "#71717a" }}>{user.email}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 14, color: "#ef4444" }}>{user.mbtiProfile || '-'}</div>
                      <div style={{ fontSize: 12, color: "#71717a" }}>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <>
            {/* Search */}
            <div style={{
              display: "flex",
              gap: 16,
              marginBottom: 24
            }}>
              <div style={{
                flex: 1,
                position: "relative"
              }}>
                <Search style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 20,
                  height: 20,
                  color: "#71717a"
                }} />
                <input
                  type="text"
                  placeholder="Buscar por email o nombre..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 44px",
                    background: "#141416",
                    border: "1px solid #27272a",
                    borderRadius: 8,
                    color: "white",
                    fontSize: 14
                  }}
                />
              </div>
            </div>

            {/* Users Table */}
            <div style={{
              background: "#141416",
              border: "1px solid #27272a",
              borderRadius: 12,
              overflow: "hidden"
            }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #27272a" }}>
                    <th style={{ padding: 16, textAlign: "left", color: "#71717a", fontWeight: 500 }}>Usuario</th>
                    <th style={{ padding: 16, textAlign: "left", color: "#71717a", fontWeight: 500 }}>Arquetipo</th>
                    <th style={{ padding: 16, textAlign: "center", color: "#71717a", fontWeight: 500 }}>Créditos</th>
                    <th style={{ padding: 16, textAlign: "center", color: "#71717a", fontWeight: 500 }}>Plan</th>
                    <th style={{ padding: 16, textAlign: "center", color: "#71717a", fontWeight: 500 }}>Rol</th>
                    <th style={{ padding: 16, textAlign: "center", color: "#71717a", fontWeight: 500 }}>Análisis</th>
                    <th style={{ padding: 16, textAlign: "center", color: "#71717a", fontWeight: 500 }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} style={{ borderBottom: "1px solid #27272a" }}>
                      <td style={{ padding: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          {user.image ? (
                            <img src={user.image} alt="" style={{ width: 36, height: 36, borderRadius: "50%" }} />
                          ) : (
                            <div style={{ width: 36, height: 36, background: "#27272a", borderRadius: "50%" }} />
                          )}
                          <div>
                            <div style={{ fontWeight: 500 }}>{user.name || 'Sin nombre'}</div>
                            <div style={{ fontSize: 12, color: "#71717a" }}>{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: 16, color: "#ef4444", fontWeight: 500 }}>
                        {user.mbtiProfile || '-'}
                      </td>
                      <td style={{ padding: 16, textAlign: "center" }}>{user.credits}</td>
                      <td style={{ padding: 16, textAlign: "center" }}>
                        <span style={{
                          padding: "4px 8px",
                          background: user.plan === 'FREE' ? "#3b82f620" : "#22c55e20",
                          color: user.plan === 'FREE' ? "#3b82f6" : "#22c55e",
                          borderRadius: 4,
                          fontSize: 12,
                          fontWeight: 600
                        }}>
                          {user.plan}
                        </span>
                      </td>
                      <td style={{ padding: 16, textAlign: "center" }}>
                        <span style={{
                          padding: "4px 8px",
                          background: user.role === 'ADMIN' ? "#ef444420" : "#27272a",
                          color: user.role === 'ADMIN' ? "#ef4444" : "#71717a",
                          borderRadius: 4,
                          fontSize: 12,
                          fontWeight: 600
                        }}>
                          {user.role}
                        </span>
                      </td>
                      <td style={{ padding: 16, textAlign: "center" }}>{user._count.analyses}</td>
                      <td style={{ padding: 16, textAlign: "center" }}>
                        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                          <button
                            onClick={() => handleEdit(user)}
                            style={{
                              padding: 8,
                              background: "#27272a",
                              border: "none",
                              borderRadius: 6,
                              cursor: "pointer",
                              color: "#71717a"
                            }}
                          >
                            <Edit style={{ width: 16, height: 16 }} />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            style={{
                              padding: 8,
                              background: "#ef444420",
                              border: "none",
                              borderRadius: 6,
                              cursor: "pointer",
                              color: "#ef4444"
                            }}
                          >
                            <Trash2 style={{ width: 16, height: 16 }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
                padding: 16,
                borderTop: "1px solid #27272a"
              }}>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    padding: 8,
                    background: "#27272a",
                    border: "none",
                    borderRadius: 6,
                    cursor: page === 1 ? "not-allowed" : "pointer",
                    color: page === 1 ? "#52525b" : "white",
                    opacity: page === 1 ? 0.5 : 1
                  }}
                >
                  <ChevronLeft style={{ width: 20, height: 20 }} />
                </button>
                <span style={{ color: "#71717a" }}>
                  Página {page} de {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{
                    padding: 8,
                    background: "#27272a",
                    border: "none",
                    borderRadius: 6,
                    cursor: page === totalPages ? "not-allowed" : "pointer",
                    color: page === totalPages ? "#52525b" : "white",
                    opacity: page === totalPages ? 0.5 : 1
                  }}
                >
                  <ChevronRight style={{ width: 20, height: 20 }} />
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Edit Modal */}
      {editingUser && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100
        }}>
          <div style={{
            background: "#141416",
            border: "1px solid #27272a",
            borderRadius: 12,
            padding: 24,
            width: 400
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600 }}>Editar Usuario</h3>
              <button
                onClick={() => setEditingUser(null)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#71717a" }}
              >
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                {editingUser.image && (
                  <img src={editingUser.image} alt="" style={{ width: 48, height: 48, borderRadius: "50%" }} />
                )}
                <div>
                  <div style={{ fontWeight: 500 }}>{editingUser.name}</div>
                  <div style={{ fontSize: 14, color: "#71717a" }}>{editingUser.email}</div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 14, color: "#71717a", marginBottom: 8 }}>
                Créditos
              </label>
              <input
                type="number"
                value={editForm.credits}
                onChange={(e) => setEditForm({ ...editForm, credits: parseInt(e.target.value) || 0 })}
                style={{
                  width: "100%",
                  padding: 12,
                  background: "#0a0a0b",
                  border: "1px solid #27272a",
                  borderRadius: 8,
                  color: "white"
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 14, color: "#71717a", marginBottom: 8 }}>
                Plan
              </label>
              <select
                value={editForm.plan}
                onChange={(e) => setEditForm({ ...editForm, plan: e.target.value })}
                style={{
                  width: "100%",
                  padding: 12,
                  background: "#0a0a0b",
                  border: "1px solid #27272a",
                  borderRadius: 8,
                  color: "white"
                }}
              >
                <option value="FREE">FREE</option>
                <option value="PRO">PRO</option>
                <option value="UNLIMITED">UNLIMITED</option>
              </select>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 14, color: "#71717a", marginBottom: 8 }}>
                Rol
              </label>
              <select
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                style={{
                  width: "100%",
                  padding: 12,
                  background: "#0a0a0b",
                  border: "1px solid #27272a",
                  borderRadius: 8,
                  color: "white"
                }}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setEditingUser(null)}
                style={{
                  flex: 1,
                  padding: 12,
                  background: "#27272a",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer"
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  flex: 1,
                  padding: 12,
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  cursor: saving ? "wait" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8
                }}
              >
                {saving ? (
                  <Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} />
                ) : (
                  <Check style={{ width: 16, height: 16 }} />
                )}
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
