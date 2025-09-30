"use client";

import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  User, 
  Settings, 
  LogOut, 
  Bell,
  MessageSquare,
  Plus,
  Send,
  X,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Star,
  History,
  CreditCard,
  HelpCircle,
  Scissors,
  Menu
} from "lucide-react";
import { useRouter } from "next/navigation";

// Dados simulados
const clienteInfo = {
  nome: "João Silva",
  telefone: "54999887766",
  email: "joao@email.com",
  endereco: "Rua das Flores, 123",
  totalCortes: 15,
  totalGasto: 450,
  proximoAgendamento: {
    data: "2024-01-20",
    hora: "14:00",
    servico: "Corte + Barba",
    barbeiro: "Carlos",
    preco: 55
  }
};

const historico = [
  {
    id: 1,
    data: "2024-01-15",
    servico: "Corte + Barba",
    barbeiro: "Carlos",
    preco: 55,
    status: "concluido"
  },
  {
    id: 2,
    data: "2024-01-10",
    servico: "Corte Masculino",
    barbeiro: "Carlos",
    preco: 35,
    status: "concluido"
  },
  {
    id: 3,
    data: "2024-01-05",
    servico: "Barba",
    barbeiro: "Carlos",
    preco: 25,
    status: "concluido"
  }
];

const notificacoes = [
  {
    id: 1,
    titulo: "Agendamento Confirmado",
    mensagem: "Seu agendamento para 20/01 às 14:00 foi confirmado",
    data: "2024-01-18 10:30",
    lida: false,
    tipo: "agendamento"
  },
  {
    id: 2,
    titulo: "Lembrete",
    mensagem: "Você tem um agendamento amanhã às 14:00",
    data: "2024-01-19 09:00",
    lida: false,
    tipo: "lembrete"
  },
  {
    id: 3,
    titulo: "Promoção",
    mensagem: "20% de desconto em serviços de barba nesta semana!",
    data: "2024-01-17 15:00",
    lida: true,
    tipo: "promocao"
  }
];

export default function ClientPanel() {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Estados do ticket
  const [ticketAssunto, setTicketAssunto] = useState("");
  const [ticketMensagem, setTicketMensagem] = useState("");
  const [ticketTipo, setTicketTipo] = useState("problema");

  const handleLogout = () => {
    if (confirm("Deseja realmente sair?")) {
      router.push("/login");
    }
  };

  const handleSendTicket = () => {
    if (!ticketAssunto.trim() || !ticketMensagem.trim()) {
      alert("Por favor, preencha todos os campos do ticket.");
      return;
    }

    // Simular envio do ticket
    alert("Ticket enviado com sucesso! Nossa equipe entrará em contato em breve.");
    setTicketAssunto("");
    setTicketMensagem("");
    setShowTicketModal(false);
  };

  const handleSaveConfig = () => {
    alert("Configurações salvas com sucesso!");
    setShowConfigModal(false);
  };

  const renderTicketModal = () => {
    if (!showTicketModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Abrir Ticket de Suporte</h3>
            <button 
              onClick={() => setShowTicketModal(false)}
              className="text-[#94A3B8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo do Problema</label>
              <select 
                value={ticketTipo}
                onChange={(e) => setTicketTipo(e.target.value)}
                className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
              >
                <option value="problema">Problema Técnico</option>
                <option value="agendamento">Problema com Agendamento</option>
                <option value="pagamento">Problema com Pagamento</option>
                <option value="sugestao">Sugestão</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Assunto</label>
              <input
                type="text"
                value={ticketAssunto}
                onChange={(e) => setTicketAssunto(e.target.value)}
                className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
                placeholder="Descreva brevemente o problema"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Descrição Detalhada</label>
              <textarea
                value={ticketMensagem}
                onChange={(e) => setTicketMensagem(e.target.value)}
                className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2 h-24 resize-none"
                placeholder="Descreva o problema em detalhes..."
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleSendTicket}
              className="flex-1 bg-[#3B82F6] text-white py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Ticket</span>
            </button>
            <button
              onClick={() => setShowTicketModal(false)}
              className="flex-1 bg-[#1F2937] text-white py-2 rounded-xl hover:opacity-90 transition-opacity"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderConfigModal = () => {
    if (!showConfigModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Configurações</h3>
            <button 
              onClick={() => setShowConfigModal(false)}
              className="text-[#94A3B8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome</label>
              <input
                type="text"
                defaultValue={clienteInfo.nome}
                className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <input
                type="tel"
                defaultValue={clienteInfo.telefone}
                className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                defaultValue={clienteInfo.email}
                className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Endereço</label>
              <input
                type="text"
                defaultValue={clienteInfo.endereco}
                className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
              />
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Notificações</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Lembretes de agendamento</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Promoções e ofertas</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Confirmações via WhatsApp</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleSaveConfig}
              className="flex-1 bg-[#3B82F6] text-white py-2 rounded-xl hover:opacity-90 transition-opacity"
            >
              Salvar
            </button>
            <button
              onClick={() => setShowConfigModal(false)}
              className="flex-1 bg-[#1F2937] text-white py-2 rounded-xl hover:opacity-90 transition-opacity"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
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
              <h1 className="text-xl font-bold">Painel do Cliente</h1>
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
                {notificacoes.filter(n => !n.lida).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#EF4444] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notificacoes.filter(n => !n.lida).length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-[#141416] border border-[#1F2937] rounded-2xl shadow-xl z-50">
                  <div className="p-4 border-b border-[#1F2937]">
                    <h3 className="font-bold">Notificações</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notificacoes.map((notif) => (
                      <div key={notif.id} className={`p-4 border-b border-[#1F2937] hover:bg-[#1F2937]/50 ${!notif.lida ? 'bg-[#3B82F6]/5' : ''}`}>
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${!notif.lida ? 'bg-[#3B82F6]' : 'bg-[#94A3B8]'}`}></div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{notif.titulo}</div>
                            <div className="text-sm text-[#94A3B8] mt-1">{notif.mensagem}</div>
                            <div className="text-xs text-[#94A3B8] mt-2">{notif.data}</div>
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
                <div className="w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium hidden sm:block">{clienteInfo.nome}</span>
                <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#141416] border border-[#1F2937] rounded-2xl shadow-xl z-50">
                  <button
                    onClick={() => {
                      setShowConfigModal(true);
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-[#1F2937] transition-colors text-left"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Configurações</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowTicketModal(true);
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-[#1F2937] transition-colors text-left"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Suporte</span>
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
          {[
            { id: "dashboard", label: "Dashboard", icon: Calendar },
            { id: "historico", label: "Histórico", icon: History },
            { id: "perfil", label: "Perfil", icon: User }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-[#3B82F6] text-[#3B82F6]"
                  : "border-transparent text-[#94A3B8] hover:text-[#F5F5F7]"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden bg-[#141416] border-t border-[#1F2937]">
            <div className="space-y-1 p-4">
              {[
                { id: "dashboard", label: "Dashboard", icon: Calendar },
                { id: "historico", label: "Histórico", icon: History },
                { id: "perfil", label: "Perfil", icon: User }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors text-left ${
                    activeTab === tab.id
                      ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                      : "text-[#94A3B8] hover:text-[#F5F5F7] hover:bg-[#1F2937]"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#141416] p-4 rounded-2xl border border-[#1F2937]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#94A3B8] text-sm">Total de Cortes</p>
                    <p className="text-2xl font-bold">{clienteInfo.totalCortes}</p>
                  </div>
                  <Scissors className="w-8 h-8 text-[#3B82F6]" />
                </div>
              </div>

              <div className="bg-[#141416] p-4 rounded-2xl border border-[#1F2937]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#94A3B8] text-sm">Total Gasto</p>
                    <p className="text-2xl font-bold text-[#D4AF37]">R$ {clienteInfo.totalGasto}</p>
                  </div>
                  <CreditCard className="w-8 h-8 text-[#D4AF37]" />
                </div>
              </div>

              <div className="bg-[#141416] p-4 rounded-2xl border border-[#1F2937]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#94A3B8] text-sm">Próximo Agendamento</p>
                    <p className="text-lg font-bold">{clienteInfo.proximoAgendamento.data}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-[#10B981]" />
                </div>
              </div>

              <div className="bg-[#141416] p-4 rounded-2xl border border-[#1F2937]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#94A3B8] text-sm">Avaliação Média</p>
                    <p className="text-2xl font-bold flex items-center">
                      4.8 <Star className="w-5 h-5 text-[#F59E0B] ml-1" />
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-[#F59E0B]" />
                </div>
              </div>
            </div>

            {/* Próximo Agendamento */}
            <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6">
              <h2 className="text-xl font-bold mb-4">Próximo Agendamento</h2>
              <div className="bg-[#0C0C0D] rounded-xl p-4 border border-[#1F2937]">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#3B82F6] rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{clienteInfo.proximoAgendamento.servico}</div>
                      <div className="text-sm text-[#94A3B8]">
                        {clienteInfo.proximoAgendamento.data} às {clienteInfo.proximoAgendamento.hora}
                      </div>
                      <div className="text-sm text-[#94A3B8]">
                        Barbeiro: {clienteInfo.proximoAgendamento.barbeiro}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#D4AF37]">
                      R$ {clienteInfo.proximoAgendamento.preco}
                    </div>
                    <div className="text-sm text-[#10B981]">Confirmado</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6">
              <h2 className="text-xl font-bold mb-4">Ações Rápidas</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="bg-[#3B82F6] text-white p-4 rounded-xl hover:opacity-90 transition-opacity flex flex-col items-center space-y-2">
                  <Plus className="w-6 h-6" />
                  <span className="text-sm">Novo Agendamento</span>
                </button>
                <button className="bg-[#25D366] text-white p-4 rounded-xl hover:opacity-90 transition-opacity flex flex-col items-center space-y-2">
                  <MessageSquare className="w-6 h-6" />
                  <span className="text-sm">WhatsApp</span>
                </button>
                <button 
                  onClick={() => setShowTicketModal(true)}
                  className="bg-[#F59E0B] text-white p-4 rounded-xl hover:opacity-90 transition-opacity flex flex-col items-center space-y-2"
                >
                  <HelpCircle className="w-6 h-6" />
                  <span className="text-sm">Suporte</span>
                </button>
                <button className="bg-[#8B5CF6] text-white p-4 rounded-xl hover:opacity-90 transition-opacity flex flex-col items-center space-y-2">
                  <Star className="w-6 h-6" />
                  <span className="text-sm">Avaliar</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Histórico Tab */}
        {activeTab === "historico" && (
          <div>
            <h2 className="text-xl font-bold mb-6">Histórico de Serviços</h2>
            <div className="space-y-4">
              {historico.map((item) => (
                <div key={item.id} className="bg-[#141416] rounded-2xl border border-[#1F2937] p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-[#10B981] rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{item.servico}</div>
                        <div className="text-sm text-[#94A3B8]">
                          {item.data} - Barbeiro: {item.barbeiro}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#D4AF37]">R$ {item.preco}</div>
                      <div className="text-sm text-[#10B981]">Concluído</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Perfil Tab */}
        {activeTab === "perfil" && (
          <div>
            <h2 className="text-xl font-bold mb-6">Meu Perfil</h2>
            <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
                <div className="w-20 h-20 bg-[#3B82F6] rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{clienteInfo.nome}</h3>
                  <p className="text-[#94A3B8]">Cliente desde Janeiro 2024</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-[#94A3B8]" />
                    <div>
                      <div className="text-sm text-[#94A3B8]">Telefone</div>
                      <div className="font-medium">{clienteInfo.telefone}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-[#94A3B8]" />
                    <div>
                      <div className="text-sm text-[#94A3B8]">Email</div>
                      <div className="font-medium">{clienteInfo.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-[#94A3B8]" />
                    <div>
                      <div className="text-sm text-[#94A3B8]">Endereço</div>
                      <div className="font-medium">{clienteInfo.endereco}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#0C0C0D] rounded-xl p-4 border border-[#1F2937]">
                    <div className="text-sm text-[#94A3B8] mb-1">Total de Cortes</div>
                    <div className="text-2xl font-bold">{clienteInfo.totalCortes}</div>
                  </div>

                  <div className="bg-[#0C0C0D] rounded-xl p-4 border border-[#1F2937]">
                    <div className="text-sm text-[#94A3B8] mb-1">Total Investido</div>
                    <div className="text-2xl font-bold text-[#D4AF37]">R$ {clienteInfo.totalGasto}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowConfigModal(true)}
                  className="bg-[#3B82F6] text-white px-6 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Editar Perfil</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {renderTicketModal()}
      {renderConfigModal()}

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