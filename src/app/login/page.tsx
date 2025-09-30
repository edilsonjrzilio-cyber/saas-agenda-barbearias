"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, Lock, Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular autenticação
    setTimeout(() => {
      // Verificar credenciais do admin
      if (telefone === "54996329745" && senha === "91557498Jr!") {
        router.push("/admin");
      } 
      // Verificar credenciais de barbeiro (exemplo)
      else if (telefone === "54977665544" && senha === "123456") {
        router.push("/dashboard");
      }
      // Verificar credenciais de cliente (exemplo)
      else if (telefone === "54999887766" && senha === "123456") {
        router.push("/cliente");
      }
      else {
        alert("Número de celular ou senha incorretos!");
      }
      setLoading(false);
    }, 1000);
  };

  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");
    
    // Aplica a máscara (55) 99999-9999
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 2)}${numbers.slice(2)}`;
    } else if (numbers.length <= 11) {
      return `${numbers.slice(0, 2)}${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    } else {
      return `${numbers.slice(0, 2)}${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setTelefone(formatted);
  };

  return (
    <div className="min-h-screen bg-[#0C0C0D] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#3B82F6] to-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#F5F5F7] mb-2">Bem-vindo de volta</h1>
          <p className="text-[#94A3B8]">Faça login com seu número de celular</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#141416] rounded-2xl border border-[#1F2937] p-6">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F7] mb-2">
                Número de Celular
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type="tel"
                  value={telefone}
                  onChange={handlePhoneChange}
                  className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl pl-10 pr-4 py-3 text-[#F5F5F7] placeholder-[#94A3B8] focus:border-[#3B82F6] focus:outline-none transition-colors"
                  placeholder="54999887766"
                  required
                />
              </div>
              <p className="text-xs text-[#94A3B8] mt-1">
                Digite apenas os números (DDD + número)
              </p>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-[#F5F5F7] mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full bg-[#0C0C0D] border border-[#1F2937] rounded-xl pl-10 pr-12 py-3 text-[#F5F5F7] placeholder-[#94A3B8] focus:border-[#3B82F6] focus:outline-none transition-colors"
                  placeholder="Digite sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] hover:text-[#F5F5F7] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#3B82F6] to-[#D4AF37] text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Entrar</span>
                </>
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <button className="text-[#3B82F6] hover:underline text-sm">
              Esqueci minha senha
            </button>
            <div className="text-[#94A3B8] text-sm">
              Não tem uma conta?{" "}
              <button className="text-[#3B82F6] hover:underline">
                Entre em contato
              </button>
            </div>
          </div>
        </div>

        {/* Informações de Acesso */}
        <div className="mt-6 bg-[#141416] rounded-2xl border border-[#1F2937] p-4">
          <h3 className="font-medium text-[#F5F5F7] mb-2">Como acessar:</h3>
          <div className="space-y-2 text-sm text-[#94A3B8]">
            <div>• <strong>Administradores:</strong> Use o número cadastrado no sistema</div>
            <div>• <strong>Barbeiros:</strong> Use o número fornecido pelo administrador</div>
            <div>• <strong>Clientes:</strong> Use o número cadastrado nos agendamentos</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-[#94A3B8]">
          Sistema de Gerenciamento de Barbearia
          <br />
          Desenvolvido com segurança e praticidade
        </div>
      </div>
    </div>
  );
}