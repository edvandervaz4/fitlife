"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "@/lib/types";
import { Crown, Check, X, Calendar, CreditCard } from "lucide-react";

interface SubscriptionModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export default function SubscriptionModal({ user, isOpen, onClose, onSubscribe }: SubscriptionModalProps) {
  if (!isOpen) return null;

  const daysLeft = user.subscription.trialEndsAt
    ? Math.ceil((user.subscription.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  const isTrialActive = user.subscription.status === "trial" && daysLeft > 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-3 rounded-xl">
                <Crown className="w-8 h-8" />
              </div>
              <div>
                <CardTitle className="text-3xl">FitLife Premium</CardTitle>
                <CardDescription className="text-base mt-1">
                  {isTrialActive
                    ? `Você tem ${daysLeft} dias restantes no seu período gratuito`
                    : "Desbloqueie todo o potencial do FitLife"}
                </CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Plano Gratuito */}
            <Card className="border-2 border-gray-200">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-xl">Período de Teste</CardTitle>
                <div className="text-3xl font-bold mt-2">Grátis</div>
                <p className="text-sm text-muted-foreground">14 dias de acesso completo</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Planos de treino personalizados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Plano alimentar básico</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Scanner de alimentos (5 fotos/dia)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Gráficos de progresso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-gray-400 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Scanner ilimitado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-gray-400 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Planos avançados de nutrição</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-gray-400 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Suporte prioritário</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Plano Premium */}
            <Card className="border-4 border-gradient-to-r from-yellow-500 to-orange-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 text-sm font-bold">
                RECOMENDADO
              </div>
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
                <CardTitle className="text-xl">Premium Mensal</CardTitle>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl font-bold">R$ 29,90</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <p className="text-sm text-muted-foreground">Acesso completo e ilimitado</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-sm font-semibold">Tudo do plano gratuito</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Scanner de alimentos ilimitado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Planos nutricionais avançados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Treinos personalizados por IA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Análise detalhada de progresso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Suporte prioritário 24/7</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Novos recursos em primeira mão</span>
                  </li>
                </ul>

                <Button
                  onClick={onSubscribe}
                  size="lg"
                  className="w-full mt-6 h-14 text-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Assinar Agora
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Informações Adicionais */}
          <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <Calendar className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-bold text-lg mb-2">Informações Importantes</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Cancele a qualquer momento, sem multas ou taxas adicionais</li>
                  <li>• Renovação automática mensal - você pode desativar nas configurações</li>
                  <li>• Acesso imediato a todos os recursos premium após confirmação</li>
                  <li>• Garantia de 7 dias - reembolso total se não ficar satisfeito</li>
                </ul>
              </div>
            </div>
          </div>

          {isTrialActive && (
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Você ainda pode aproveitar {daysLeft} dias grátis. A cobrança só começará após o período de teste.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
