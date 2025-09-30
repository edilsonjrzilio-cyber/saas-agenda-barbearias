// Sistema de autenticação simples
export interface User {
  id: string
  phone: string
  email?: string
  name: string
  role: 'admin' | 'barber' | 'client'
  isActive: boolean
}

// Configuração do admin principal
const ADMIN_CONFIG = {
  phone: '54996329745',
  password: '91557498Jr!',
  name: 'Admin Principal',
  role: 'admin' as const
}

// Simulação de banco de dados de usuários
const MOCK_USERS: User[] = [
  {
    id: 'admin-1',
    phone: ADMIN_CONFIG.phone,
    email: 'admin@agendabarber.com',
    name: ADMIN_CONFIG.name,
    role: ADMIN_CONFIG.role,
    isActive: true
  },
  // Outros usuários de exemplo
  {
    id: 'barber-1',
    phone: '11999887766',
    email: 'barbeiro@teste.com',
    name: 'João Barbeiro',
    role: 'barber',
    isActive: true
  },
  {
    id: 'client-1',
    phone: '11988776655',
    email: 'cliente@teste.com',
    name: 'Maria Cliente',
    role: 'client',
    isActive: true
  }
]

export class AuthService {
  // Verificar credenciais por número de celular
  static async login(phone: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Verificar se é o admin principal
      if (phone === ADMIN_CONFIG.phone && password === ADMIN_CONFIG.password) {
        const user = MOCK_USERS.find(u => u.phone === phone)
        if (user) {
          // Salvar sessão
          this.saveSession(user)
          return { success: true, user }
        }
      }

      // Verificar outros usuários (implementar lógica de hash de senha em produção)
      const user = MOCK_USERS.find(u => u.phone === phone && u.isActive)
      if (user) {
        // Em produção, verificar hash da senha
        // Por enquanto, aceitar qualquer senha para usuários de teste
        if (password === '123456' || password === ADMIN_CONFIG.password) {
          this.saveSession(user)
          return { success: true, user }
        }
      }

      return { success: false, error: 'Número ou senha incorretos' }
    } catch (error) {
      return { success: false, error: 'Erro interno do servidor' }
    }
  }

  // Salvar sessão no localStorage
  static saveSession(user: User) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(user))
      localStorage.setItem('auth_token', `token_${user.id}_${Date.now()}`)
    }
  }

  // Obter usuário da sessão
  static getCurrentUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('auth_user')
      if (userStr) {
        try {
          return JSON.parse(userStr)
        } catch {
          return null
        }
      }
    }
    return null
  }

  // Verificar se está logado
  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }

  // Verificar se é admin
  static isAdmin(): boolean {
    const user = this.getCurrentUser()
    return user?.role === 'admin'
  }

  // Logout
  static logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user')
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
  }

  // Middleware de proteção de rotas
  static requireAuth(requiredRole?: 'admin' | 'barber' | 'client') {
    const user = this.getCurrentUser()
    
    if (!user) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
      return false
    }

    if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
      if (typeof window !== 'undefined') {
        window.location.href = '/dashboard'
      }
      return false
    }

    return true
  }
}

// Hook para usar autenticação em componentes
export function useAuth() {
  const user = AuthService.getCurrentUser()
  
  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isBarber: user?.role === 'barber',
    isClient: user?.role === 'client',
    logout: AuthService.logout
  }
}