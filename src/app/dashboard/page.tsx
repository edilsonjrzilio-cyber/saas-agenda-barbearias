// Dashboard do Barbeiro - Painel Principal
"use client";

import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Users, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  MessageCircle,
  BarChart3,
  DollarSign,
  UserCheck,
  UserX,
  Crown,
  Timer,
  Eye,
  HelpCircle,
  Send,
  X,
  Wifi,
  WifiOff,
  Star,
  User,
  Scissors
} from "lucide-react";
import BarberNavigation from "@/components/barber-navigation";
import { useRouter } from "next/navigation";

// Dados simulados
const todayStats = {
  appointments: 12,
  completed: 8,
  noShows: 2,
  revenue: 680,
  occupancy: 75
};

const todayAppointments = [
  {
    id: 1,
    time: "09:00",
    client: "João Silva",
    service: "Corte + Barba",
    duration: 45,
    price: 55,
    status: "completed",
    barber: "Carlos"
  },
  {
    id: 2,
    time: "10:00",
    client: "Pedro Santos",
    service: "Corte Masculino",
    duration: 30,
    price: 35,
    status: "completed",
    barber: "Carlos"
  },
  {
    id: 3,
    time: "11:00",
    client: "Rafael Costa",
    service: "Barba",
    duration: 20,
    price: 25,
    status: "no-show",
    barber: "Carlos"
  },
  {
    id: 4,
    time: "14:00",
    client: "Lucas Oliveira",
    service: "Corte + Barba",
    duration: 45,
    price: 55,
    status: "confirmed",
    barber: "Carlos"
  },
  {
    id: 5,
    time: "15:00",
    client: "André Lima",
    service: "Relaxamento",
    duration: 60,
    price: 45,
    status: "pending",
    barber: "Carlos"
  }
];

const upcomingAppointments = [
  {
    id: 6,
    time: "16:00",
    client: "Marcos Ferreira",
    service: "Corte Masculino",
    duration: 30,
    price: 35,
    status: "confirmed",
    barber: "Carlos"
  },
  {
    id: 7,
    time: "16:30",
    client: "Gabriel Rocha",
    service: "Sobrancelha",
    duration: 15,
    price: 15,
    status: "pending",
    barber: "Carlos"
  }
];

export default function BarberDashboard() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showClientView, setShowClientView] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);
  
  // Estados do ticket
  const [ticketAssunto, setTicketAssunto] = useState("");
  const [ticketMensagem, setTicketMensagem] = useState("");
  const [ticketTipo, setTicketTipo] = useState("problema");

  // Estados do novo agendamento
  const [newAppointment, setNewAppointment] = useState({
    client: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    price: ""
  });

  // Calcular dias restantes do plano (exemplo: expira em 15 dias)
  const planExpiryDate = new Date();
  planExpiryDate.setDate(planExpiryDate.getDate() + 15);
  const daysRemaining = Math.ceil((planExpiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  // Funções das ações rápidas
  const handleNewAppointment = () => {
    setShowNewAppointmentModal(true);
  };

  const handleSaveNewAppointment = () => {
    if (!newAppointment.client || !newAppointment.phone || !newAppointment.service || !newAppointment.date || !newAppointment.time) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    alert("Agendamento criado com sucesso!");
    setNewAppointment({
      client: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      price: ""
    });
    setShowNewAppointmentModal(false);
  };

  const handleSendReminders = () => {
    if (!whatsappConnected) {
      alert("WhatsApp não está conectado. Conecte primeiro para enviar lembretes.");
      setShowWhatsappModal(true);
      return;
    }
    alert("Enviando lembretes via WhatsApp...");
    // Em produção: implementar envio de lembretes
  };

  const handleViewReports = () => {
    router.push('/relatorios');
  };

  const handleSettings = () => {
    router.push('/personalizacao');
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

  const handleConnectWhatsApp = () => {
    // Simular processo de conexão do WhatsApp
    alert("Escaneie o QR Code com seu WhatsApp para conectar...");
    setTimeout(() => {
      setWhatsappConnected(true);
      setShowWhatsappModal(false);
      alert("WhatsApp conectado com sucesso!");
    }, 2000);
  };

  const handleDisconnectWhatsApp = () => {
    if (confirm("Deseja realmente desconectar o WhatsApp?")) {
      setWhatsappConnected(false);
      alert("WhatsApp desconectado!");
    }
  };

  const handleChangePlan = () => {
    setShowPlanModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-[#10B981] bg-[#10B981]/10";
      case "confirmed":
        return "text-[#3B82F6] bg-[#3B82F6]/10";
      case "pending":
        return "text-[#F59E0B] bg-[#F59E0B]/10";
      case "no-show":
        return "text-[#EF4444] bg-[#EF4444]/10";
      default:
        return "text-[#94A3B8] bg-[#94A3B8]/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "confirmed":
        return <Clock className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "no-show":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído";
      case "confirmed":
        return "Confirmado";
      case "pending":
        return "Pendente";
      case "no-show":
        return "Faltou";
      default:
        return "Agendado";
    }
  };

  const renderNewAppointmentModal = () => {
    if (!showNewAppointmentModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Novo Agendamento Manual</h3>
            <button 
              onClick={() => setShowNewAppointmentModal(false)}
              className="text-[#94A3B8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome do Cliente *</label>
              <input
                type="text"
                value={newAppointment.client}
                onChange={(e) => setNewAppointment({...newAppointment, client: e.target.value})}
                className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
                placeholder="Nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Telefone *</label>
              <input
                type="tel"
                value={newAppointment.phone}
                onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})}
                className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
                placeholder="54999887766"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Serviço *</label>
              <select 
                value={newAppointment.service}
                onChange={(e) => setNewAppointment({...newAppointment, service: e.target.value})}
                className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
              >
                <option value="">Selecione o serviço</option>
                <option value="Corte Masculino">Corte Masculino - R$ 35</option>
                <option value="Corte + Barba">Corte + Barba - R$ 55</option>
                <option value="Barba">Barba - R$ 25</option>
                <option value="Sobrancelha">Sobrancelha - R$ 15</option>
                <option value="Relaxamento">Relaxamento - R$ 45</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-2">Data *</label>
                <input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Horário *</label>
                <input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Observações</label>
              <textarea
                className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2 h-20 resize-none"
                placeholder="Observações adicionais (opcional)"
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleSaveNewAppointment}
              className="flex-1 bg-[#3B82F6] text-white py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Agendar</span>
            </button>
            <button
              onClick={() => setShowNewAppointmentModal(false)}
              className="flex-1 bg-[#1F2937] text-white py-2 rounded-xl hover:opacity-90 transition-opacity"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
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
                <option value="whatsapp">Problema com WhatsApp</option>
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

  const renderWhatsAppModal = () => {
    if (!showWhatsappModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Conectar WhatsApp</h3>
            <button 
              onClick={() => setShowWhatsappModal(false)}
              className="text-[#94A3B8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center space-y-4">
            <div className="w-32 h-32 bg-white rounded-xl mx-auto flex items-center justify-center">
              <div className="text-black text-xs">QR CODE</div>
            </div>
            <p className="text-[#94A3B8] text-sm">
              Escaneie este QR Code com seu WhatsApp para conectar
            </p>
            <div className="space-y-2">
              <p className="text-xs text-[#94A3B8]">Como conectar:</p>
              <p className="text-xs text-[#94A3B8]">1. Abra o WhatsApp no seu celular</p>
              <p className="text-xs text-[#94A3B8]">2. Toque em ⋮ &gt; Dispositivos conectados</p>
              <p className="text-xs text-[#94A3B8]">3. Toque em "Conectar um dispositivo"</p>
              <p className="text-xs text-[#94A3B8]">4. Escaneie este QR Code</p>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleConnectWhatsApp}
              className="flex-1 bg-[#25D366] text-white py-2 rounded-xl hover:opacity-90 transition-opacity"
            >
              Conectar
            </button>
            <button
              onClick={() => setShowWhatsappModal(false)}
              className="flex-1 bg-[#1F2937] text-white py-2 rounded-xl hover:opacity-90 transition-opacity"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPlanModal = () => {
    if (!showPlanModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Gerenciar Plano</h3>
            <button 
              onClick={() => setShowPlanModal(false)}
              className="text-[#94A3B8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-[#0C0C0D] rounded-xl p-4 border border-[#1F2937]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Plano Atual</span>
                <Crown className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div className="text-lg font-bold text-[#D4AF37]">Equipe</div>
              <div className="text-sm text-[#94A3B8]">R$ 49,90/mês</div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Escolher Novo Plano</label>
              <select className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2">
                <option value="individual">Individual - R$ 29,90/mês</option>
                <option value="equipe" selected>Equipe - R$ 49,90/mês</option>
                <option value="premium">Premium - R$ 79,90/mês</option>
              </select>
            </div>

            <div className="bg-[#0C0C0D] rounded-xl p-4 border border-[#1F2937]">
              <div className="text-sm text-[#94A3B8] mb-2">Próxima cobrança</div>
              <div className="font-medium">15 de Dezembro de 2024</div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => {
                alert("Plano alterado com sucesso!");
                setShowPlanModal(false);
              }}
              className="flex-1 bg-[#3B82F6] text-white py-2 rounded-xl hover:opacity-90 transition-opacity"
            >
              Alterar Plano
            </button>
            <button
              onClick={() => setShowPlanModal(false)}
              className="flex-1 bg-[#1F2937] text-white py-2 rounded-xl hover:opacity-90 transition-opacity"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderClientView = () => {
    if (!showClientView) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Visão do Cliente</h3>
            <button 
              onClick={() => setShowClientView(false)}
              className="text-[#94A3B8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-[#0C0C0D] rounded-xl p-4 border border-[#1F2937]">
              <h4 className="font-medium mb-2">Como os clientes veem seu perfil:</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Carlos Barbeiro</div>
                    <div className="text-sm text-[#94A3B8]">Especialista em cortes masculinos</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-[#141416] p-3 rounded-xl">
                    <div className="text-sm text-[#94A3B8]">Avaliação</div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-[#F59E0B] fill-current" />
                      <span className="font-medium">4.8</span>
                    </div>
                  </div>
                  <div className="bg-[#141416] p-3 rounded-xl">
                    <div className="text-sm text-[#94A3B8]">Clientes</div>
                    <div className="font-medium">127</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Serviços Disponíveis:</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Corte Masculino</span>
                      <span className="text-[#D4AF37]">R$ 35</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Corte + Barba</span>
                      <span className="text-[#D4AF37]">R$ 55</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Barba</span>
                      <span className="text-[#D4AF37]">R$ 25</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Horários Disponíveis:</div>
                  <div className="grid grid-cols-4 gap-2">
                    {["09:00", "10:00", "11:00", "14:00"].map((time) => (
                      <div key={time} className="bg-[#3B82F6] text-white text-xs p-2 rounded text-center">
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setShowClientView(false)}
              className="w-full bg-[#3B82F6] text-white py-2 rounded-xl hover:opacity-90 transition-opacity"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <BarberNavigation>
      <div className="p-4 md:p-6">
        {/* Header com Tag do Plano */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-xl md:text-2xl font-bold mb-2">Dashboard</h1>
              <p className="text-[#94A3B8]">Visão geral do seu dia</p>
            </div>
            
            {/* Tag do Plano */}
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#3B82F6] p-4 rounded-2xl text-white">
              <div className="flex items-center space-x-2 mb-1">
                <Crown className="w-5 h-5" />
                <span className="font-bold">Plano Equipe</span>
              </div>
              <div className="flex items-center space-x-1 text-sm opacity-90">
                <Timer className="w-4 h-4" />
                <span>{daysRemaining} dias restantes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="bg-[#141416] p-3 md:p-4 rounded-2xl border border-[#1F2937]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#94A3B8] text-xs md:text-sm">Agendamentos</p>
                <p className="text-xl md:text-2xl font-bold">{todayStats.appointments}</p>
              </div>
              <Calendar className="w-6 md:w-8 h-6 md:h-8 text-[#3B82F6]" />
            </div>
          </div>

          <div className="bg-[#141416] p-3 md:p-4 rounded-2xl border border-[#1F2937]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#94A3B8] text-xs md:text-sm">Concluídos</p>
                <p className="text-xl md:text-2xl font-bold text-[#10B981]">{todayStats.completed}</p>
              </div>
              <CheckCircle className="w-6 md:w-8 h-6 md:h-8 text-[#10B981]" />
            </div>
          </div>

          <div className="bg-[#141416] p-3 md:p-4 rounded-2xl border border-[#1F2937]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#94A3B8] text-xs md:text-sm">No-shows</p>
                <p className="text-xl md:text-2xl font-bold text-[#EF4444]">{todayStats.noShows}</p>
              </div>
              <UserX className="w-6 md:w-8 h-6 md:h-8 text-[#EF4444]" />
            </div>
          </div>

          <div className="bg-[#141416] p-3 md:p-4 rounded-2xl border border-[#1F2937]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#94A3B8] text-xs md:text-sm">Faturamento</p>
                <p className="text-xl md:text-2xl font-bold text-[#D4AF37]">R$ {todayStats.revenue}</p>
              </div>
              <DollarSign className="w-6 md:w-8 h-6 md:h-8 text-[#D4AF37]" />
            </div>
          </div>

          <div className="bg-[#141416] p-3 md:p-4 rounded-2xl border border-[#1F2937]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#94A3B8] text-xs md:text-sm">Ocupação</p>
                <p className="text-xl md:text-2xl font-bold">{todayStats.occupancy}%</p>
              </div>
              <BarChart3 className="w-6 md:w-8 h-6 md:h-8 text-[#3B82F6]" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Agenda do Dia */}
          <div className="lg:col-span-2">
            <div className="bg-[#141416] rounded-2xl border border-[#1F2937]">
              <div className="p-4 md:p-6 border-b border-[#1F2937]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                  <h2 className="text-lg md:text-xl font-bold">Agenda do Dia</h2>
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2 text-sm"
                    />
                    <button 
                      onClick={handleNewAppointment}
                      className="bg-[#3B82F6] text-white p-2 rounded-xl hover:opacity-90 transition-opacity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6">
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-[#0C0C0D] rounded-xl border border-[#1F2937] hover:border-[#94A3B8] transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-lg font-bold">{appointment.time}</div>
                          <div className="text-xs text-[#94A3B8]">{appointment.duration}min</div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="font-medium">{appointment.client}</div>
                          <div className="text-sm text-[#94A3B8]">{appointment.service}</div>
                          <div className="text-sm text-[#D4AF37]">R$ {appointment.price}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          <span className="hidden sm:inline">{getStatusText(appointment.status)}</span>
                        </div>
                        
                        <button className="p-1 text-[#94A3B8] hover:text-[#F5F5F7] transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status do WhatsApp */}
            <div className="bg-[#141416] rounded-2xl border border-[#1F2937]">
              <div className="p-4 border-b border-[#1F2937]">
                <h3 className="font-bold">WhatsApp</h3>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {whatsappConnected ? (
                      <Wifi className="w-5 h-5 text-[#25D366]" />
                    ) : (
                      <WifiOff className="w-5 h-5 text-[#EF4444]" />
                    )}
                    <span className={`text-sm ${whatsappConnected ? 'text-[#25D366]' : 'text-[#EF4444]'}`}>
                      {whatsappConnected ? "Conectado" : "Desconectado"}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {!whatsappConnected ? (
                    <button
                      onClick={() => setShowWhatsappModal(true)}
                      className="w-full bg-[#25D366] text-white py-2 rounded-xl hover:opacity-90 transition-opacity text-sm"
                    >
                      Conectar WhatsApp
                    </button>
                  ) : (
                    <button
                      onClick={handleDisconnectWhatsApp}
                      className="w-full bg-[#EF4444] text-white py-2 rounded-xl hover:opacity-90 transition-opacity text-sm"
                    >
                      Desconectar
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Próximos Agendamentos */}
            <div className="bg-[#141416] rounded-2xl border border-[#1F2937]">
              <div className="p-4 border-b border-[#1F2937]">
                <h3 className="font-bold">Próximos</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{appointment.client}</div>
                        <div className="text-xs text-[#94A3B8]">{appointment.time} - {appointment.service}</div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${appointment.status === 'confirmed' ? 'bg-[#3B82F6]' : 'bg-[#F59E0B]'}`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-[#141416] rounded-2xl border border-[#1F2937]">
              <div className="p-4 border-b border-[#1F2937]">
                <h3 className="font-bold">Ações Rápidas</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <button 
                    onClick={handleNewAppointment}
                    className="w-full flex items-center space-x-3 p-3 bg-[#0C0C0D] rounded-xl hover:bg-[#1F2937] transition-colors"
                  >
                    <Plus className="w-5 h-5 text-[#3B82F6]" />
                    <span className="text-sm">Novo Agendamento</span>
                  </button>
                  
                  <button 
                    onClick={handleSendReminders}
                    className="w-full flex items-center space-x-3 p-3 bg-[#0C0C0D] rounded-xl hover:bg-[#1F2937] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    <span className="text-sm">Enviar Lembretes</span>
                  </button>
                  
                  <button 
                    onClick={handleViewReports}
                    className="w-full flex items-center space-x-3 p-3 bg-[#0C0C0D] rounded-xl hover:bg-[#1F2937] transition-colors"
                  >
                    <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-sm">Ver Relatórios</span>
                  </button>
                  
                  <button 
                    onClick={() => setShowClientView(true)}
                    className="w-full flex items-center space-x-3 p-3 bg-[#0C0C0D] rounded-xl hover:bg-[#1F2937] transition-colors"
                  >
                    <Eye className="w-5 h-5 text-[#8B5CF6]" />
                    <span className="text-sm">Visão do Cliente</span>
                  </button>
                  
                  <button 
                    onClick={() => setShowTicketModal(true)}
                    className="w-full flex items-center space-x-3 p-3 bg-[#0C0C0D] rounded-xl hover:bg-[#1F2937] transition-colors"
                  >
                    <HelpCircle className="w-5 h-5 text-[#F59E0B]" />
                    <span className="text-sm">Suporte</span>
                  </button>
                  
                  <button 
                    onClick={handleSettings}
                    className="w-full flex items-center space-x-3 p-3 bg-[#0C0C0D] rounded-xl hover:bg-[#1F2937] transition-colors"
                  >
                    <Settings className="w-5 h-5 text-[#94A3B8]" />
                    <span className="text-sm">Configurações</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Status da Assinatura */}
            <div className="bg-[#141416] rounded-2xl border border-[#1F2937]">
              <div className="p-4 border-b border-[#1F2937]">
                <h3 className="font-bold">Assinatura</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#94A3B8]">Plano</span>
                    <span className="text-sm font-medium flex items-center">
                      <Crown className="w-4 h-4 text-[#D4AF37] mr-1" />
                      Equipe
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#94A3B8]">Status</span>
                    <span className="text-sm text-[#10B981] flex items-center">
                      <div className="w-2 h-2 bg-[#10B981] rounded-full mr-2"></div>
                      Ativo
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#94A3B8]">Expira em</span>
                    <span className="text-sm flex items-center">
                      <Timer className="w-4 h-4 text-[#F59E0B] mr-1" />
                      {daysRemaining} dias
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#94A3B8]">Próxima cobrança</span>
                    <span className="text-sm">15/12/2024</span>
                  </div>
                  <button 
                    onClick={handleChangePlan}
                    className="w-full bg-[#3B82F6] text-white py-2 rounded-xl text-sm hover:opacity-90 transition-opacity"
                  >
                    Gerenciar Plano
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {renderNewAppointmentModal()}
      {renderTicketModal()}
      {renderWhatsAppModal()}
      {renderPlanModal()}
      {renderClientView()}
    </BarberNavigation>
  );
}