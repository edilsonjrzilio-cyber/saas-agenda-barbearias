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
  X,
  Search,
  MoreVertical,
  Paperclip,
  Smile,
  Mic
} from "lucide-react";

export default function WhatsAppPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "João Silva",
      phone: "54999887766",
      lastMessage: "Oi, gostaria de agendar um horário",
      time: "14:30",
      unread: 2,
      avatar: "J",
      messages: [
        {
          id: 1,
          text: "Oi, boa tarde!",
          time: "14:25",
          sender: "client",
          status: "read"
        },
        {
          id: 2,
          text: "Gostaria de agendar um horário para corte + barba",
          time: "14:30",
          sender: "client",
          status: "read"
        }
      ]
    },
    {
      id: 2,
      name: "Pedro Santos",
      phone: "54988776655",
      lastMessage: "Obrigado pelo atendimento!",
      time: "13:15",
      unread: 0,
      avatar: "P",
      messages: [
        {
          id: 1,
          text: "Olá! Que horas vocês abrem amanhã?",
          time: "13:10",
          sender: "client",
          status: "read"
        },
        {
          id: 2,
          text: "Abrimos às 8h da manhã. Posso agendar um horário para você?",
          time: "13:12",
          sender: "barber",
          status: "read"
        },
        {
          id: 3,
          text: "Obrigado pelo atendimento!",
          time: "13:15",
          sender: "client",
          status: "read"
        }
      ]
    },
    {
      id: 3,
      name: "Carlos Mendes",
      phone: "54977554433",
      lastMessage: "Pode ser às 16h?",
      time: "12:45",
      unread: 1,
      avatar: "C",
      messages: [
        {
          id: 1,
          text: "Oi, preciso remarcar meu horário de hoje",
          time: "12:40",
          sender: "client",
          status: "read"
        },
        {
          id: 2,
          text: "Pode ser às 16h?",
          time: "12:45",
          sender: "client",
          status: "delivered"
        }
      ]
    }
  ]);

  // Simular processo de conexão
  const handleConnect = () => {
    setIsConnecting(true);
    setConnectionStatus("connecting");
    
    // Simular geração de QR Code
    setTimeout(() => {
      setQrCode("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ3aGl0ZSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjEycHgiIGZpbGw9ImJsYWNrIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UVIgQ09ERTwvdGV4dD4KPC9zdmc+");
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
      setSelectedChat(null);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      sender: "barber",
      status: "sent"
    };

    // Atualizar conversa selecionada
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedChat.id) {
        return {
          ...conv,
          messages: [...conv.messages, message],
          lastMessage: newMessage,
          time: message.time
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    
    // Atualizar chat selecionado
    const updatedSelectedChat = updatedConversations.find(conv => conv.id === selectedChat.id);
    setSelectedChat(updatedSelectedChat);
    
    setNewMessage("");
  };

  const handleSelectChat = (conversation) => {
    setSelectedChat(conversation);
    
    // Marcar mensagens como lidas
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversation.id) {
        return { ...conv, unread: 0 };
      }
      return conv;
    });
    setConversations(updatedConversations);
  };

  const getMessageStatus = (status) => {
    switch (status) {
      case "sent":
        return "✓";
      case "delivered":
        return "✓✓";
      case "read":
        return "✓✓";
      default:
        return "";
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.phone.includes(searchTerm)
  );

  const renderConnectionStatus = () => {
    switch (connectionStatus) {
      case "disconnected":
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-[#EF4444]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <WifiOff className="w-12 h-12 text-[#EF4444]" />
              </div>
              <h3 className="text-xl font-bold mb-2">WhatsApp Desconectado</h3>
              <p className="text-[#94A3B8] mb-6 max-w-md">
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
          </div>
        );

      case "connecting":
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-[#F59E0B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-12 h-12 text-[#F59E0B] animate-spin" />
              </div>
              <h3 className="text-xl font-bold mb-2">Preparando Conexão</h3>
              <p className="text-[#94A3B8]">
                Gerando QR Code para conexão...
              </p>
            </div>
          </div>
        );

      case "waiting_scan":
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center py-12">
              <div className="w-48 h-48 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center border">
                {qrCode ? (
                  <img src={qrCode} alt="QR Code" className="w-40 h-40" />
                ) : (
                  <QrCode className="w-20 h-20 text-[#94A3B8]" />
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">Escaneie o QR Code</h3>
              <div className="text-[#94A3B8] space-y-2 max-w-md mx-auto text-sm">
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
          </div>
        );

      case "connected":
        return (
          <div className="flex-1 flex h-full">
            {/* Lista de Conversas */}
            <div className="w-1/3 bg-[#141416] border-r border-[#1F2937] flex flex-col">
              {/* Header da Lista */}
              <div className="p-4 border-b border-[#1F2937]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Conversas</h4>
                  <button className="p-1 text-[#94A3B8] hover:text-white transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Busca */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="text"
                    placeholder="Buscar conversas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl pl-10 pr-4 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Lista de Conversas */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => handleSelectChat(conversation)}
                    className={`w-full p-4 text-left hover:bg-[#1F2937] transition-colors border-b border-[#1F2937]/50 ${
                      selectedChat?.id === conversation.id ? 'bg-[#1F2937]' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-[#3B82F6] rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {conversation.avatar}
                          </span>
                        </div>
                        {conversation.unread > 0 && (
                          <div className="absolute -top-1 -right-1 bg-[#25D366] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unread}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-sm truncate">{conversation.name}</div>
                          <div className="text-xs text-[#94A3B8]">{conversation.time}</div>
                        </div>
                        <div className="text-xs text-[#94A3B8] truncate mt-1">
                          {conversation.lastMessage}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Área do Chat */}
            <div className="flex-1 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Header do Chat */}
                  <div className="bg-[#141416] border-b border-[#1F2937] p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#3B82F6] rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {selectedChat.avatar}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{selectedChat.name}</div>
                          <div className="text-sm text-[#94A3B8]">{selectedChat.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-[#94A3B8] hover:text-white transition-colors">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-[#94A3B8] hover:text-white transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mensagens */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#0C0C0D]">
                    {selectedChat.messages.map((message) => (
                      <div key={message.id} className={`flex ${message.sender === 'barber' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.sender === 'barber' 
                            ? 'bg-[#25D366] text-white' 
                            : 'bg-[#1F2937] text-white'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          <div className="flex items-center justify-end space-x-1 mt-1">
                            <span className="text-xs opacity-70">{message.time}</span>
                            {message.sender === 'barber' && (
                              <span className={`text-xs ${message.status === 'read' ? 'text-blue-300' : 'text-white'}`}>
                                {getMessageStatus(message.status)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input de Mensagem */}
                  <div className="bg-[#141416] border-t border-[#1F2937] p-4">
                    <div className="flex items-center space-x-3">
                      <button className="p-2 text-[#94A3B8] hover:text-white transition-colors">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl px-4 py-2 pr-10"
                          placeholder="Digite sua mensagem..."
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] hover:text-white transition-colors">
                          <Smile className="w-4 h-4" />
                        </button>
                      </div>
                      {newMessage.trim() ? (
                        <button
                          onClick={handleSendMessage}
                          className="bg-[#25D366] text-white p-2 rounded-xl hover:opacity-90 transition-opacity"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      ) : (
                        <button className="p-2 text-[#94A3B8] hover:text-white transition-colors">
                          <Mic className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-[#0C0C0D]">
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
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0C0D] text-[#F5F5F7] flex flex-col">
      {/* Header */}
      <div className="bg-[#141416] border-b border-[#1F2937] p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">WhatsApp Business</h1>
            <p className="text-[#94A3B8]">Gerencie suas conversas e automatize mensagens</p>
          </div>
          
          {isConnected && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-[#25D366]/10 text-[#25D366] px-3 py-1 rounded-lg">
                <Wifi className="w-4 h-4" />
                <span className="text-sm">Conectado</span>
              </div>
              <button
                onClick={handleDisconnect}
                className="bg-[#EF4444] text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity text-sm"
              >
                Desconectar
              </button>
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
        <div className="p-4 md:p-6 border-b border-[#1F2937]">
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
                  <p className="text-2xl font-bold">{conversations.length}</p>
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
      <div className="flex-1 flex flex-col">
        {renderConnectionStatus()}
      </div>

      {/* Features Info */}
      {!isConnected && (
        <div className="p-4 md:p-6 border-t border-[#1F2937]">
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