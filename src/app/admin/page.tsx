"use client";

import { useState } from "react";
import { 
  Users, 
  Scissors, 
  Crown, 
  Settings, 
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Eye,
  Lock,
  User,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  MoreVertical,
  BarChart3,
  CreditCard,
  LogOut
} from "lucide-react";

// Dados simulados
const clientes = [
  {
    id: 1,
    nome: "João Silva",
    telefone: "54999887766",
    email: "joao@email.com",
    ultimoCorte: "2024-01-15",
    totalGasto: 450,
    status: "ativo"
  },
  {
    id: 2,
    nome: "Pedro Santos",
    telefone: "54988776655",
    email: "pedro@email.com",
    ultimoCorte: "2024-01-10",
    totalGasto: 320,
    status: "ativo"
  }
];

const barbeiros = [
  {
    id: 1,
    nome: "Carlos Barbeiro",
    telefone: "54977665544",
    email: "carlos@barbearia.com",
    plano: "Equipe",
    status: "ativo",
    link: "https://barbearia.com/carlos",
    senha: "********"
  },
  {
    id: 2,
    nome: "Roberto Silva",
    telefone: "54966554433",
    email: "roberto@barbearia.com",
    plano: "Individual",
    status: "ativo",
    link: "https://barbearia.com/roberto",
    senha: "********"
  }
];

const planos = [
  {
    id: 1,
    nome: "Individual",
    preco: 29.90,
    recursos: ["1 Barbeiro", "Agendamentos Ilimitados", "WhatsApp"],
    status: "ativo"
  },
  {
    id: 2,
    nome: "Equipe",
    preco: 49.90,
    recursos: ["Até 5 Barbeiros", "Relatórios Avançados", "WhatsApp", "Suporte Prioritário"],
    status: "ativo"
  },
  {
    id: 3,
    nome: "Premium",
    preco: 79.90,
    recursos: ["Barbeiros Ilimitados", "API Personalizada", "White Label", "Suporte 24/7"],
    status: "ativo"
  }
];

const tickets = [
  {
    id: 1,
    tipo: "cliente",
    nome: "João Silva",
    assunto: "Problema no agendamento",
    mensagem: "Não consigo agendar pelo WhatsApp",
    data: "2024-01-15 14:30",
    status: "aberto"
  },
  {
    id: 2,
    tipo: "barbeiro",
    nome: "Carlos Barbeiro",
    assunto: "WhatsApp desconectado",
    mensagem: "O WhatsApp desconectou e não consigo reconectar",
    data: "2024-01-15 10:15",
    status: "resolvido"
  }
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Funções para Clientes
  const handleClientAction = (action: string, cliente?: any) => {
    switch (action) {
      case "edit":
        setSelectedItem(cliente);
        setModalType("editClient");
        setShowModal(true);
        break;
      case "delete":
        if (confirm(`Deseja realmente excluir o cliente ${cliente.nome}?`)) {
          alert("Cliente excluído com sucesso!");
        }
        break;
      case "view":
        alert(`Visualizando perfil de ${cliente.nome}`);
        break;
    }
  };

  // Funções para Barbeiros
  const handleBarberAction = (action: string, barbeiro?: any) => {
    switch (action) {
      case "create":
        setSelectedItem(null);
        setModalType("createBarber");
        setShowModal(true);
        break;
      case "edit":
        setSelectedItem(barbeiro);
        setModalType("editBarber");
        setShowModal(true);
        break;
      case "changePassword":
        setSelectedItem(barbeiro);
        setModalType("changePassword");
        setShowModal(true);
        break;
      case "delete":
        if (confirm(`Deseja realmente excluir o barbeiro ${barbeiro.nome}?`)) {
          alert("Barbeiro excluído com sucesso!");
        }
        break;
    }
  };

  // Funções para Planos
  const handlePlanAction = (action: string, plano?: any) => {
    switch (action) {
      case "create":
        setSelectedItem(null);
        setModalType("createPlan");
        setShowModal(true);
        break;
      case "edit":
        setSelectedItem(plano);
        setModalType("editPlan");
        setShowModal(true);
        break;
      case "delete":
        if (confirm(`Deseja realmente excluir o plano ${plano.nome}?`)) {
          alert("Plano excluído com sucesso!");
        }
        break;
    }
  };

  // Função para Tickets
  const handleTicketAction = (action: string, ticket: any) => {
    switch (action) {
      case "resolve":
        alert(`Ticket #${ticket.id} marcado como resolvido!`);
        break;
      case "view":
        alert(`Visualizando ticket completo: ${ticket.mensagem}`);
        break;
    }
  };

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6 w-full max-w-md mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">
              {modalType === "createBarber" && "Criar Barbeiro"}
              {modalType === "editBarber" && "Editar Barbeiro"}
              {modalType === "editClient" && "Editar Cliente"}
              {modalType === "changePassword" && "Alterar Senha"}
              {modalType === "createPlan" && "Criar Plano"}
              {modalType === "editPlan" && "Editar Plano"}
            </h3>
            <button 
              onClick={() => setShowModal(false)}
              className="text-[#94A3B8] hover:text-white"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {(modalType === "createBarber" || modalType === "editBarber") && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Nome</label>
                  <input
                    type="text"
                    defaultValue={selectedItem?.nome || ""}
                    className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
                    placeholder="Nome do barbeiro"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefone</label>
                  <input
                    type="tel"
                    defaultValue={selectedItem?.telefone || ""}
                    className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
                    placeholder="54999887766"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={selectedItem?.email || ""}
                    className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
                    placeholder="barbeiro@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Senha</label>
                  <input
                    type="password"
                    className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
                    placeholder="Nova senha"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Plano</label>
                  <select 
                    defaultValue={selectedItem?.plano || "Individual"}
                    className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
                  >
                    <option value="Individual">Individual</option>
                    <option value="Equipe">Equipe</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
              </>
            )}

            {modalType === "editClient" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Nome</label>
                  <input
                    type="text"
                    defaultValue={selectedItem?.nome || ""}
                    className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefone</label>
                  <input
                    type="tel"
                    defaultValue={selectedItem?.telefone || ""}
                    className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={selectedItem?.email || ""}
                    className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
                  />
                </div>
              </>
            )}

            {modalType === "changePassword" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Nova Senha</label>
                  <input
                    type="password"
                    className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
                    placeholder="Digite a nova senha"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirmar Senha</label>
                  <input
                    type="password"
                    className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
                    placeholder="Confirme a nova senha"
                  />
                </div>
              </>
            )}

            {(modalType === "createPlan" || modalType === "editPlan") && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Nome do Plano</label>
                  <input
                    type="text"
                    defaultValue={selectedItem?.nome || ""}
                    className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
                    placeholder="Nome do plano"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={selectedItem?.preco || ""}
                    className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2"
                    placeholder="29.90"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Recursos</label>
                  <textarea
                    defaultValue={selectedItem?.recursos?.join(", ") || ""}
                    className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-3 py-2 h-20"
                    placeholder="Recurso 1, Recurso 2, Recurso 3"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => {
                alert("Salvo com sucesso!");
                setShowModal(false);
              }}
              className="flex-1 bg-[#3B82F6] text-white py-2 rounded-xl hover:opacity-90 transition-opacity"
            >
              Salvar
            </button>
            <button
              onClick={() => setShowModal(false)}
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
    <div className="min-h-screen bg-[#0C0C0D] text-[#F5F5F7] flex">
      {/* Sidebar - Design Original */}
      <div className="w-64 bg-[#1e293b] text-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">AgendaBarber</h1>
              <p className="text-sm text-gray-300">Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "dashboard" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("barbeiros")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "barbeiros" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            <Scissors className="w-5 h-5" />
            <span>Barbeiros</span>
          </button>

          <button
            onClick={() => setActiveTab("clientes")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "clientes" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Clientes</span>
          </button>

          <button
            onClick={() => setActiveTab("planos")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "planos" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            <Crown className="w-5 h-5" />
            <span>Planos</span>
          </button>

          <button
            onClick={() => setActiveTab("transacoes")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "transacoes" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span>Transações</span>
          </button>

          <button
            onClick={() => setActiveTab("tickets")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "tickets" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Tickets</span>
          </button>

          <button
            onClick={() => setActiveTab("configuracoes")}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "configuracoes" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Configurações</span>
          </button>
        </nav>

        {/* Bottom Links */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          <button
            onClick={() => window.open("/dashboard", "_blank")}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-yellow-400 hover:bg-gray-700 transition-colors"
          >
            <Scissors className="w-5 h-5" />
            <span>Meu Painel Barbeiro</span>
          </button>

          <button
            onClick={() => window.open("/cliente", "_blank")}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-blue-400 hover:bg-gray-700 transition-colors"
          >
            <User className="w-5 h-5" />
            <span>Visão do Cliente</span>
          </button>

          <button
            onClick={() => window.location.href = "/barbeiro/logout"}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-400 hover:bg-gray-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-[#141416] border-b border-[#1F2937] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "clientes" && "Gerenciar Clientes"}
                {activeTab === "barbeiros" && "Gerenciar Barbeiros"}
                {activeTab === "planos" && "Gerenciar Planos"}
                {activeTab === "transacoes" && "Transações"}
                {activeTab === "tickets" && "Tickets de Suporte"}
                {activeTab === "configuracoes" && "Configurações"}
              </h1>
              <p className="text-[#94A3B8]">
                {activeTab === "dashboard" && "Visão geral do sistema"}
                {activeTab === "clientes" && "Gerencie todos os clientes"}
                {activeTab === "barbeiros" && "Gerencie todos os barbeiros"}
                {activeTab === "planos" && "Gerencie os planos disponíveis"}
                {activeTab === "transacoes" && "Histórico de transações"}
                {activeTab === "tickets" && "Suporte aos usuários"}
                {activeTab === "configuracoes" && "Configurações do sistema"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#0C0C0D] border border-[#1F2937] rounded-xl pl-10 pr-4 py-2 w-64"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#94A3B8] text-sm">Total Barbeiros</p>
                    <p className="text-2xl font-bold">{barbeiros.length}</p>
                  </div>
                  <Scissors className="w-8 h-8 text-[#D4AF37]" />
                </div>
              </div>

              <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#94A3B8] text-sm">Total Clientes</p>
                    <p className="text-2xl font-bold">{clientes.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-[#3B82F6]" />
                </div>
              </div>

              <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#94A3B8] text-sm">Planos Ativos</p>
                    <p className="text-2xl font-bold">{planos.length}</p>
                  </div>
                  <Crown className="w-8 h-8 text-[#D4AF37]" />
                </div>
              </div>

              <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#94A3B8] text-sm">Tickets Abertos</p>
                    <p className="text-2xl font-bold">{tickets.filter(t => t.status === "aberto").length}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-[#EF4444]" />
                </div>
              </div>
            </div>
          )}

          {/* Clientes Tab */}
          {activeTab === "clientes" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-3">
                  <button className="bg-[#1F2937] text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-[#141416] rounded-2xl border border-[#1F2937] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#1F2937]">
                      <tr>
                        <th className="text-left p-4">Cliente</th>
                        <th className="text-left p-4">Contato</th>
                        <th className="text-left p-4">Último Corte</th>
                        <th className="text-left p-4">Total Gasto</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientes.map((cliente) => (
                        <tr key={cliente.id} className="border-b border-[#1F2937] hover:bg-[#1F2937]/50">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-[#3B82F6] rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="font-medium">{cliente.nome}</div>
                                <div className="text-sm text-[#94A3B8]">ID: {cliente.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-[#94A3B8]" />
                                <span className="text-sm">{cliente.telefone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-[#94A3B8]" />
                                <span className="text-sm">{cliente.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-[#94A3B8]" />
                              <span className="text-sm">{cliente.ultimoCorte}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                              <span className="font-medium text-[#D4AF37]">R$ {cliente.totalGasto}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-lg text-xs ${
                              cliente.status === "ativo" 
                                ? "bg-[#10B981]/10 text-[#10B981]" 
                                : "bg-[#EF4444]/10 text-[#EF4444]"
                            }`}>
                              {cliente.status === "ativo" ? "Ativo" : "Inativo"}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleClientAction("view", cliente)}
                                className="p-2 text-[#3B82F6] hover:bg-[#3B82F6]/10 rounded-lg transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleClientAction("edit", cliente)}
                                className="p-2 text-[#F59E0B] hover:bg-[#F59E0B]/10 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleClientAction("delete", cliente)}
                                className="p-2 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Barbeiros Tab */}
          {activeTab === "barbeiros" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => handleBarberAction("create")}
                  className="bg-[#3B82F6] text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Barbeiro</span>
                </button>
              </div>

              <div className="bg-[#141416] rounded-2xl border border-[#1F2937] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#1F2937]">
                      <tr>
                        <th className="text-left p-4">Barbeiro</th>
                        <th className="text-left p-4">Contato</th>
                        <th className="text-left p-4">Plano</th>
                        <th className="text-left p-4">Link</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {barbeiros.map((barbeiro) => (
                        <tr key={barbeiro.id} className="border-b border-[#1F2937] hover:bg-[#1F2937]/50">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center">
                                <Scissors className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="font-medium">{barbeiro.nome}</div>
                                <div className="text-sm text-[#94A3B8]">ID: {barbeiro.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-[#94A3B8]" />
                                <span className="text-sm">{barbeiro.telefone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-[#94A3B8]" />
                                <span className="text-sm">{barbeiro.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Crown className="w-4 h-4 text-[#D4AF37]" />
                              <span className="font-medium">{barbeiro.plano}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <a 
                              href={barbeiro.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[#3B82F6] hover:underline text-sm"
                            >
                              {barbeiro.link}
                            </a>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-lg text-xs ${
                              barbeiro.status === "ativo" 
                                ? "bg-[#10B981]/10 text-[#10B981]" 
                                : "bg-[#EF4444]/10 text-[#EF4444]"
                            }`}>
                              {barbeiro.status === "ativo" ? "Ativo" : "Inativo"}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleBarberAction("edit", barbeiro)}
                                className="p-2 text-[#F59E0B] hover:bg-[#F59E0B]/10 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleBarberAction("changePassword", barbeiro)}
                                className="p-2 text-[#3B82F6] hover:bg-[#3B82F6]/10 rounded-lg transition-colors"
                              >
                                <Lock className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleBarberAction("delete", barbeiro)}
                                className="p-2 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Planos Tab */}
          {activeTab === "planos" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => handlePlanAction("create")}
                  className="bg-[#3B82F6] text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Plano</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {planos.map((plano) => (
                  <div key={plano.id} className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Crown className="w-6 h-6 text-[#D4AF37]" />
                        <h3 className="text-lg font-bold">{plano.nome}</h3>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-xs ${
                        plano.status === "ativo" 
                          ? "bg-[#10B981]/10 text-[#10B981]" 
                          : "bg-[#EF4444]/10 text-[#EF4444]"
                      }`}>
                        {plano.status === "ativo" ? "Ativo" : "Inativo"}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="text-3xl font-bold text-[#D4AF37] mb-2">
                        R$ {plano.preco.toFixed(2)}
                        <span className="text-sm text-[#94A3B8] font-normal">/mês</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {plano.recursos.map((recurso, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-[#10B981]" />
                          <span className="text-sm">{recurso}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePlanAction("edit", plano)}
                        className="flex-1 bg-[#3B82F6] text-white py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={() => handlePlanAction("delete", plano)}
                        className="bg-[#EF4444] text-white p-2 rounded-xl hover:opacity-90 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transações Tab */}
          {activeTab === "transacoes" && (
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Transações</h3>
              <p className="text-[#94A3B8]">Histórico de transações será exibido aqui</p>
            </div>
          )}

          {/* Tickets Tab */}
          {activeTab === "tickets" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-3">
                  <span className="bg-[#EF4444]/10 text-[#EF4444] px-3 py-1 rounded-lg text-sm">
                    {tickets.filter(t => t.status === "aberto").length} Abertos
                  </span>
                  <span className="bg-[#10B981]/10 text-[#10B981] px-3 py-1 rounded-lg text-sm">
                    {tickets.filter(t => t.status === "resolvido").length} Resolvidos
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          ticket.tipo === "cliente" ? "bg-[#3B82F6]" : "bg-[#D4AF37]"
                        }`}>
                          {ticket.tipo === "cliente" ? (
                            <User className="w-5 h-5 text-white" />
                          ) : (
                            <Scissors className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{ticket.nome}</div>
                          <div className="text-sm text-[#94A3B8] capitalize">{ticket.tipo}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-lg text-xs ${
                          ticket.status === "aberto" 
                            ? "bg-[#EF4444]/10 text-[#EF4444]" 
                            : "bg-[#10B981]/10 text-[#10B981]"
                        }`}>
                          {ticket.status === "aberto" ? "Aberto" : "Resolvido"}
                        </span>
                        <span className="text-sm text-[#94A3B8]">{ticket.data}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">{ticket.assunto}</h4>
                      <p className="text-[#94A3B8] text-sm">{ticket.mensagem}</p>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleTicketAction("view", ticket)}
                        className="bg-[#3B82F6] text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Ver Detalhes</span>
                      </button>
                      {ticket.status === "aberto" && (
                        <button
                          onClick={() => handleTicketAction("resolve", ticket)}
                          className="bg-[#10B981] text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Resolver</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Configurações Tab */}
          {activeTab === "configuracoes" && (
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Configurações</h3>
              <p className="text-[#94A3B8]">Configurações do sistema serão exibidas aqui</p>
            </div>
          )}
        </div>
      </div>

      {renderModal()}
    </div>
  );
}