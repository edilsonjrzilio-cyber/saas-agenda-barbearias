"use client";

import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Download,
  Filter,
  Eye,
  Scissors,
  Star,
  Target,
  ArrowUp,
  ArrowDown
} from "lucide-react";

// Dados simulados para relatórios
const monthlyData = [
  { month: "Jan", revenue: 2400, appointments: 45, clients: 38 },
  { month: "Fev", revenue: 2800, appointments: 52, clients: 42 },
  { month: "Mar", revenue: 3200, appointments: 58, clients: 48 },
  { month: "Abr", revenue: 2900, appointments: 54, clients: 45 },
  { month: "Mai", revenue: 3500, appointments: 62, clients: 52 },
  { month: "Jun", revenue: 3800, appointments: 68, clients: 58 }
];

const topServices = [
  { name: "Corte + Barba", count: 145, revenue: 7975, percentage: 35 },
  { name: "Corte Masculino", count: 98, revenue: 3430, percentage: 24 },
  { name: "Barba", count: 76, revenue: 1900, percentage: 18 },
  { name: "Sobrancelha", count: 54, revenue: 810, percentage: 13 },
  { name: "Relaxamento", count: 42, revenue: 1890, percentage: 10 }
];

const clientStats = [
  { type: "Novos Clientes", count: 28, change: 12, trend: "up" },
  { type: "Clientes Recorrentes", count: 156, change: 8, trend: "up" },
  { type: "Taxa de Retorno", count: 85, change: -3, trend: "down", unit: "%" },
  { type: "Ticket Médio", count: 45, change: 5, trend: "up", unit: "R$" }
];

export default function RelatoriosPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [activeTab, setActiveTab] = useState("overview");

  const handleExportReport = () => {
    alert("Relatório exportado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-[#0C0C0D] text-[#F5F5F7]">
      {/* Header */}
      <div className="bg-[#141416] border-b border-[#1F2937] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Relatórios</h1>
            <p className="text-[#94A3B8]">Análise detalhada do seu negócio</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-4 py-2"
            >
              <option value="1month">Último mês</option>
              <option value="3months">Últimos 3 meses</option>
              <option value="6months">Últimos 6 meses</option>
              <option value="1year">Último ano</option>
            </select>
            
            <button
              onClick={handleExportReport}
              className="bg-[#3B82F6] text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#141416] border-b border-[#1F2937]">
        <div className="flex space-x-8 px-6">
          {[
            { id: "overview", label: "Visão Geral", icon: BarChart3 },
            { id: "financial", label: "Financeiro", icon: DollarSign },
            { id: "clients", label: "Clientes", icon: Users },
            { id: "services", label: "Serviços", icon: Scissors }
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
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#141416] p-6 rounded-2xl border border-[#1F2937]">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div className="flex items-center space-x-1 text-[#10B981] text-sm">
                    <ArrowUp className="w-4 h-4" />
                    <span>+12%</span>
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">R$ 18.700</div>
                <div className="text-sm text-[#94A3B8]">Faturamento Total</div>
              </div>

              <div className="bg-[#141416] p-6 rounded-2xl border border-[#1F2937]">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                  <div className="flex items-center space-x-1 text-[#10B981] text-sm">
                    <ArrowUp className="w-4 h-4" />
                    <span>+8%</span>
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">339</div>
                <div className="text-sm text-[#94A3B8]">Agendamentos</div>
              </div>

              <div className="bg-[#141416] p-6 rounded-2xl border border-[#1F2937]">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <div className="flex items-center space-x-1 text-[#10B981] text-sm">
                    <ArrowUp className="w-4 h-4" />
                    <span>+15%</span>
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">283</div>
                <div className="text-sm text-[#94A3B8]">Clientes Únicos</div>
              </div>

              <div className="bg-[#141416] p-6 rounded-2xl border border-[#1F2937]">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                  <div className="flex items-center space-x-1 text-[#10B981] text-sm">
                    <ArrowUp className="w-4 h-4" />
                    <span>+0.2</span>
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">4.8</div>
                <div className="text-sm text-[#94A3B8]">Avaliação Média</div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6">
              <h3 className="text-lg font-bold mb-6">Evolução Mensal</h3>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={data.month} className="flex items-center space-x-4">
                    <div className="w-12 text-sm text-[#94A3B8]">{data.month}</div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Faturamento</span>
                        <span className="text-sm font-medium text-[#D4AF37]">R$ {data.revenue}</span>
                      </div>
                      <div className="w-full bg-[#1F2937] rounded-full h-2">
                        <div 
                          className="bg-[#D4AF37] h-2 rounded-full" 
                          style={{ width: `${(data.revenue / 4000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Financial Tab */}
        {activeTab === "financial" && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6">
                <h3 className="text-lg font-bold mb-4">Receita por Mês</h3>
                <div className="space-y-4">
                  {monthlyData.map((data) => (
                    <div key={data.month} className="flex items-center justify-between">
                      <span className="text-[#94A3B8]">{data.month}</span>
                      <span className="font-bold text-[#D4AF37]">R$ {data.revenue}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6">
                <h3 className="text-lg font-bold mb-4">Análise Financeira</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Receita Total</span>
                    <span className="font-bold text-[#10B981]">R$ 18.700</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Ticket Médio</span>
                    <span className="font-bold">R$ 55</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Melhor Mês</span>
                    <span className="font-bold text-[#3B82F6]">Junho</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Crescimento</span>
                    <span className="font-bold text-[#10B981]">+58%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clients Tab */}
        {activeTab === "clients" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {clientStats.map((stat) => (
                <div key={stat.type} className="bg-[#141416] p-6 rounded-2xl border border-[#1F2937]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#94A3B8]">{stat.type}</span>
                    <div className={`flex items-center space-x-1 text-sm ${
                      stat.trend === 'up' ? 'text-[#10B981]' : 'text-[#EF4444]'
                    }`}>
                      {stat.trend === 'up' ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      )}
                      <span>{Math.abs(stat.change)}{stat.unit || ''}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold">
                    {stat.unit === 'R$' ? 'R$ ' : ''}{stat.count}{stat.unit === '%' ? '%' : ''}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6">
              <h3 className="text-lg font-bold mb-4">Análise de Clientes</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Distribuição por Frequência</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#94A3B8]">Clientes Frequentes (5+ visitas)</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#94A3B8]">Clientes Regulares (2-4 visitas)</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#94A3B8]">Clientes Novos (1 visita)</span>
                      <span className="font-medium">20%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Horários Preferidos</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#94A3B8]">Manhã (8h-12h)</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#94A3B8]">Tarde (12h-18h)</span>
                      <span className="font-medium">55%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#94A3B8]">Noite (18h-22h)</span>
                      <span className="font-medium">20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6">
              <h3 className="text-lg font-bold mb-6">Serviços Mais Populares</h3>
              <div className="space-y-4">
                {topServices.map((service, index) => (
                  <div key={service.name} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{service.name}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-[#94A3B8]">{service.count} vezes</span>
                          <span className="font-bold text-[#D4AF37]">R$ {service.revenue}</span>
                        </div>
                      </div>
                      <div className="w-full bg-[#1F2937] rounded-full h-2">
                        <div 
                          className="bg-[#3B82F6] h-2 rounded-full" 
                          style={{ width: `${service.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6">
                <h3 className="text-lg font-bold mb-4">Performance dos Serviços</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Serviço mais rentável</span>
                    <span className="font-medium">Corte + Barba</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Maior demanda</span>
                    <span className="font-medium">Corte + Barba</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Melhor avaliação</span>
                    <span className="font-medium">Relaxamento</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Tempo médio</span>
                    <span className="font-medium">42 min</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6">
                <h3 className="text-lg font-bold mb-4">Oportunidades</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-5 h-5 text-[#10B981]" />
                      <span className="font-medium text-[#10B981]">Crescimento</span>
                    </div>
                    <p className="text-sm text-[#94A3B8]">
                      Serviços de barba têm alta demanda. Considere promoções especiais.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-5 h-5 text-[#F59E0B]" />
                      <span className="font-medium text-[#F59E0B]">Otimização</span>
                    </div>
                    <p className="text-sm text-[#94A3B8]">
                      Horários de 14h-16h têm baixa ocupação. Ofereça descontos neste período.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}