"use client";

import { useState, useEffect } from "react";
import { 
  MessageCircle, 
  Wifi, 
  WifiOff, 
  QrCode, 
  Phone, 
  Send, 
  Users, 
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Smartphone,
  Monitor,
  RefreshCw,
  X
} from "lucide-react";

export default function WhatsAppPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "João Silva",
      phone: "54999887766",
      message: "Oi, gostaria de agendar um horário",
      time: "14:30",
      status: "received"
    },
    {
      id: 2,
      from: "Pedro Santos",
      phone: "54988776655",
      message: "Obrigado pelo atendimento!",
      time: "13:15",
      status: "received"
    }
  ]);

  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Simular processo de conexão
  const handleConnect = () => {
    setIsConnecting(true);
    setConnectionStatus("connecting");
    
    // Simular geração de QR Code
    setTimeout(() => {
      setQrCode("https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=whatsapp-web-connection");
      setConnectionStatus("waiting_scan");
    }, 1000);

    // Simular conexão bem-sucedida
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      setConnectionStatus("connected");
      setQrCode("");
    }, 8000);
  };

  const handleDisconnect = () => {
    if (confirm("Deseja realmente desconectar o WhatsApp?")) {
      setIsConnected(false);
      setConnectionStatus("disconnected");
      setQrCode("");
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message = {
      id: Date.now(),
      from: "Você",
      phone: "54977665544",
      message: newMessage,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      status: "sent"
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const renderConnectionStatus = () => {
    switch (connectionStatus) {
      case "disconnected":
        return (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-[#EF4444]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <WifiOff className="w-12 h-12 text-[#EF4444]" />
            </div>
            <h3 className="text-xl font-bold mb-2">WhatsApp Desconectado</h3>
            <p className="text-[#94A3B8] mb-6">
              Conecte seu WhatsApp para enviar mensagens automáticas e gerenciar conversas
            </p>
            <button
              onClick={handleConnect}
              className="bg-[#25D366] text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center space-x-2 mx-auto"
            >
              <Smartphone className="w-5 h-5" />
              <span>Conectar WhatsApp</span>
            </button>
          </div>
        );

      case "connecting":
        return (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-[#F59E0B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="w-12 h-12 text-[#F59E0B] animate-spin" />
            </div>
            <h3 className="text-xl font-bold mb-2">Preparando Conexão</h3>
            <p className="text-[#94A3B8]">
              Gerando QR Code para conexão...
            </p>
          </div>
        );

      case "waiting_scan":
        return (
          <div className="text-center py-12">
            <div className="w-48 h-48 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center">
              {qrCode ? (
                <img src={qrCode} alt="QR Code" className="w-40 h-40" />
              ) : (
                <QrCode className="w-20 h-20 text-[#94A3B8]" />
              )}
            </div>
            <h3 className="text-xl font-bold mb-2">Escaneie o QR Code</h3>
            <div className="text-[#94A3B8] space-y-2 max-w-md mx-auto">
              <p>1. Abra o WhatsApp no seu celular</p>
              <p>2. Toque em <strong>Menu</strong> ou <strong>Configurações</strong></p>
              <p>3. Toque em <strong>Dispositivos conectados</strong></p>
              <p>4. Toque em <strong>Conectar um dispositivo</strong></p>
              <p>5. Aponte seu celular para esta tela para capturar o código</p>
            </div>
            <button
              onClick={() => setConnectionStatus("disconnected")}
              className="mt-6 text-[#94A3B8] hover:text-white transition-colors"
            >
              Cancelar
            </button>
          </div>
        );

      case "connected":
        return (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="bg-[#141416] border-b border-[#1F2937] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">WhatsApp Conectado</h3>
                    <div className="flex items-center space-x-2 text-sm text-[#25D366]">
                      <Wifi className="w-4 h-4" />
                      <span>Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="bg-[#EF4444] text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity text-sm"
                >
                  Desconectar
                </button>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="flex-1 flex">
              {/* Conversas */}
              <div className="w-1/3 bg-[#141416] border-r border-[#1F2937]">
                <div className="p-4 border-b border-[#1F2937]">
                  <h4 className="font-medium">Conversas</h4>
                </div>
                <div className="space-y-1">
                  {messages.map((msg) => (
                    <button
                      key={msg.id}
                      onClick={() => setSelectedChat(msg)}
                      className={`w-full p-4 text-left hover:bg-[#1F2937] transition-colors ${
                        selectedChat?.id === msg.id ? 'bg-[#1F2937]' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#3B82F6] rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {msg.from.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{msg.from}</div>
                          <div className="text-xs text-[#94A3B8] truncate">
                            {msg.message}
                          </div>
                        </div>
                        <div className="text-xs text-[#94A3B8]">{msg.time}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {selectedChat ? (
                  <>
                    {/* Chat Header */}
                    <div className="bg-[#141416] border-b border-[#1F2937] p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#3B82F6] rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {selectedChat.from.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{selectedChat.from}</div>
                          <div className="text-sm text-[#94A3B8]">{selectedChat.phone}</div>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                      <div className={`flex ${selectedChat.status === 'sent' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                          selectedChat.status === 'sent' 
                            ? 'bg-[#25D366] text-white' 
                            : 'bg-[#1F2937] text-white'
                        }`}>
                          <p className="text-sm">{selectedChat.message}</p>
                          <p className="text-xs opacity-70 mt-1">{selectedChat.time}</p>
                        </div>
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="bg-[#141416] border-t border-[#1F2937] p-4">
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="flex-1 bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-4 py-2"
                          placeholder="Digite sua mensagem..."
                        />
                        <button
                          onClick={handleSendMessage}
                          className="bg-[#25D366] text-white p-2 rounded-xl hover:opacity-90 transition-opacity"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageCircle className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
                      <h4 className="font-medium mb-2">Selecione uma conversa</h4>
                      <p className="text-[#94A3B8] text-sm">
                        Escolha uma conversa para começar a responder
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0C0D] text-[#F5F5F7]">
      {/* Header */}
      <div className="bg-[#141416] border-b border-[#1F2937] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">WhatsApp Business</h1>
            <p className="text-[#94A3B8]">Gerencie suas conversas e automatize mensagens</p>
          </div>
          
          {isConnected && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-[#25D366]/10 text-[#25D366] px-3 py-1 rounded-lg">
                <Wifi className="w-4 h-4" />
                <span className="text-sm">Conectado</span>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="p-2 text-[#94A3B8] hover:text-white transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      {isConnected && (
        <div className="p-6 border-b border-[#1F2937]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#141416] p-4 rounded-2xl border border-[#1F2937]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#94A3B8] text-sm">Mensagens Hoje</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <MessageCircle className="w-8 h-8 text-[#25D366]" />
              </div>
            </div>

            <div className="bg-[#141416] p-4 rounded-2xl border border-[#1F2937]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#94A3B8] text-sm">Conversas Ativas</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <Users className="w-8 h-8 text-[#3B82F6]" />
              </div>
            </div>

            <div className="bg-[#141416] p-4 rounded-2xl border border-[#1F2937]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#94A3B8] text-sm">Tempo Resposta</p>
                  <p className="text-2xl font-bold">2min</p>
                </div>
                <Clock className="w-8 h-8 text-[#F59E0B]" />
              </div>
            </div>

            <div className="bg-[#141416] p-4 rounded-2xl border border-[#1F2937]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#94A3B8] text-sm">Taxa Resposta</p>
                  <p className="text-2xl font-bold">95%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-[#10B981]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        {renderConnectionStatus()}
      </div>

      {/* Features Info */}
      {!isConnected && (
        <div className="p-6 border-t border-[#1F2937]">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#25D366]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <h4 className="font-medium mb-2">Mensagens Automáticas</h4>
              <p className="text-sm text-[#94A3B8]">
                Envie lembretes de agendamento e confirmações automaticamente
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-[#3B82F6]" />
              </div>
              <h4 className="font-medium mb-2">Gestão de Clientes</h4>
              <p className="text-sm text-[#94A3B8]">
                Mantenha conversas organizadas e histórico de mensagens
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Settings className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h4 className="font-medium mb-2">Configurações Avançadas</h4>
              <p className="text-sm text-[#94A3B8]">
                Personalize mensagens e configure respostas automáticas
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}