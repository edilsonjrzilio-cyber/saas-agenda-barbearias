"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Home, 
  Calendar, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  User,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

interface BarberNavigationProps {
  children: React.ReactNode;
}

export default function BarberNavigation({ children }: BarberNavigationProps) {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigationItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Calendar, label: "Agenda", path: "/agenda" },
    { icon: Users, label: "Clientes", path: "/clientes" },
    { icon: MessageSquare, label: "WhatsApp", path: "/whatsapp" },
    { icon: BarChart3, label: "Relatórios", path: "/relatorios" },
    { icon: Settings, label: "Configurações", path: "/configuracoes" }
  ];

  const notifications = [
    {
      id: 1,
      title: "Novo agendamento",
      message: "João Silva agendou para hoje às 14:00",
      time: "5 min atrás",
      read: false
    },
    {
      id: 2,
      title: "Lembrete",
      message: "Você tem 3 agendamentos hoje",
      time: "1 hora atrás",
      read: false
    }
  ];

  const handleLogout = () => {
    if (confirm("Deseja realmente sair?")) {
      router.push("/login");
    }
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setShowMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#0C0C0D] text-[#F5F5F7]">
      {/* Header */}
      <div className="bg-[#141416] border-b border-[#1F2937] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-[#94A3B8] hover:text-white transition-colors"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div>
              <div className="text-sm text-[#94A3B8] mb-1">🏪 Barbearia Exemplo</div>
              <h1 className="text-xl font-bold">Painel do Barbeiro</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notificações */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-[#94A3B8] hover:text-white transition-colors"
              >
                <Bell className="w-5 h-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#EF4444] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-[#141416] border border-[#1F2937] rounded-2xl shadow-xl z-50">
                  <div className="p-4 border-b border-[#1F2937]">
                    <h3 className="font-bold">Notificações</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`p-4 border-b border-[#1F2937] hover:bg-[#1F2937]/50 ${!notif.read ? 'bg-[#3B82F6]/5' : ''}`}>
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${!notif.read ? 'bg-[#3B82F6]' : 'bg-[#94A3B8]'}`}></div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{notif.title}</div>
                            <div className="text-sm text-[#94A3B8] mt-1">{notif.message}</div>
                            <div className="text-xs text-[#94A3B8] mt-2">{notif.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Menu do Usuário */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 hover:bg-[#1F2937] rounded-xl transition-colors"
              >
                <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium hidden sm:block">Carlos Barbeiro</span>
                <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#141416] border border-[#1F2937] rounded-2xl shadow-xl z-50">
                  <button
                    onClick={() => {
                      handleNavigation("/perfil");
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-[#1F2937] transition-colors text-left"
                  >
                    <User className="w-4 h-4" />
                    <span>Meu Perfil</span>
                  </button>
                  <button
                    onClick={() => {
                      handleNavigation("/configuracoes");
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-[#1F2937] transition-colors text-left"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Configurações</span>
                  </button>
                  <div className="border-t border-[#1F2937]">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 p-3 hover:bg-[#1F2937] transition-colors text-left text-[#EF4444]"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sair</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-[#141416] border-b border-[#1F2937]">
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 px-6">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className="flex items-center space-x-2 py-4 border-b-2 border-transparent text-[#94A3B8] hover:text-[#F5F5F7] hover:border-[#3B82F6] transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden bg-[#141416] border-t border-[#1F2937]">
            <div className="space-y-1 p-4">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="w-full flex items-center space-x-3 p-3 text-[#94A3B8] hover:text-[#F5F5F7] hover:bg-[#1F2937] rounded-xl transition-colors text-left"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Overlay para fechar dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </div>
  );
}