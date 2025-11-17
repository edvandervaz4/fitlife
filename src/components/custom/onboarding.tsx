"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserProfile, Gender, FitnessGoal } from "@/lib/types";
import { User, Ruler, Weight, Calendar, Target, Mail, Dumbbell, Flame, Heart } from "lucide-react";

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    weight: "",
    height: "",
    age: "",
    gender: "male" as Gender,
    goal: "muscle" as FitnessGoal,
  });

  const handleSubmit = () => {
    const profile: UserProfile = {
      name: formData.name,
      email: formData.email,
      weight: Number(formData.weight),
      height: Number(formData.height),
      age: Number(formData.age),
      gender: formData.gender,
      goal: formData.goal,
      subscription: {
        status: "trial",
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 dias
        plan: "none",
      },
    };
    onComplete(profile);
  };

  // Tela inicial (Welcome Screen)
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex flex-col items-center justify-between p-6 relative overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 flex flex-col items-center justify-center text-center z-10 max-w-md w-full">
          {/* Logo/Ícone principal */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-full blur-2xl opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-br from-blue-600 to-green-600 p-8 rounded-3xl shadow-2xl">
              <Dumbbell className="w-20 h-20 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Título */}
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            FitLife
          </h1>
          
          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-gray-300 mb-3 font-light">
            Transforme seu corpo
          </p>
          <p className="text-base text-gray-400 mb-12 max-w-sm">
            Treinos personalizados, nutrição inteligente e acompanhamento completo
          </p>

          {/* Features rápidas */}
          <div className="grid grid-cols-3 gap-6 mb-12 w-full">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                <Dumbbell className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-xs text-gray-400 font-medium">Treinos</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                <Flame className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-xs text-gray-400 font-medium">Nutrição</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                <Heart className="w-6 h-6 text-red-400" />
              </div>
              <span className="text-xs text-gray-400 font-medium">Saúde</span>
            </div>
          </div>

          {/* Botão principal */}
          <Button
            onClick={() => setStep(1)}
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-2xl shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:scale-105"
          >
            Começar Agora
          </Button>

          {/* Trial badge */}
          <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>14 dias grátis • Sem cartão de crédito</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 z-10 mt-8">
          Ao continuar, você concorda com nossos Termos e Política de Privacidade
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-green-500 to-blue-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-green-50">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-2xl">
              <User className="w-12 h-12" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Bem-vindo ao FitLife!
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {step === 1 ? "Vamos começar com suas informações básicas" : "Agora, conte-nos sobre seus objetivos"}
          </CardDescription>
          <div className="flex justify-center gap-2 mt-4">
            <div className={`h-2 w-20 rounded-full ${step >= 1 ? "bg-blue-600" : "bg-gray-200"}`} />
            <div className={`h-2 w-20 rounded-full ${step >= 2 ? "bg-green-600" : "bg-gray-200"}`} />
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-base">
                  <User className="w-4 h-4 text-blue-600" />
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-base">
                  <Mail className="w-4 h-4 text-blue-600" />
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="flex items-center gap-2 text-base">
                    <Weight className="w-4 h-4 text-green-600" />
                    Peso (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="75"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height" className="flex items-center gap-2 text-base">
                    <Ruler className="w-4 h-4 text-green-600" />
                    Altura (cm)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="flex items-center gap-2 text-base">
                    <Calendar className="w-4 h-4 text-green-600" />
                    Idade
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="h-12 text-base"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Sexo</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value as Gender })}
                  className="grid grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem value="male" id="male" className="peer sr-only" />
                    <Label
                      htmlFor="male"
                      className="flex items-center justify-center rounded-lg border-2 border-gray-200 p-4 hover:bg-blue-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer transition-all"
                    >
                      Masculino
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="female" id="female" className="peer sr-only" />
                    <Label
                      htmlFor="female"
                      className="flex items-center justify-center rounded-lg border-2 border-gray-200 p-4 hover:bg-blue-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer transition-all"
                    >
                      Feminino
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="other" id="other" className="peer sr-only" />
                    <Label
                      htmlFor="other"
                      className="flex items-center justify-center rounded-lg border-2 border-gray-200 p-4 hover:bg-blue-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer transition-all"
                    >
                      Outro
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.email || !formData.weight || !formData.height || !formData.age}
                className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                Continuar
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-base font-semibold">
                  <Target className="w-5 h-5 text-blue-600" />
                  Qual é o seu objetivo principal?
                </Label>
                <RadioGroup
                  value={formData.goal}
                  onValueChange={(value) => setFormData({ ...formData, goal: value as FitnessGoal })}
                  className="space-y-3"
                >
                  <div>
                    <RadioGroupItem value="muscle" id="muscle" className="peer sr-only" />
                    <Label
                      htmlFor="muscle"
                      className="flex items-start gap-4 rounded-xl border-2 border-gray-200 p-5 hover:bg-blue-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer transition-all"
                    >
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Weight className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">Ganho de Massa Muscular</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Aumentar músculos e força com treinos intensos e dieta hipercalórica
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="fat-loss" id="fat-loss" className="peer sr-only" />
                    <Label
                      htmlFor="fat-loss"
                      className="flex items-start gap-4 rounded-xl border-2 border-gray-200 p-5 hover:bg-green-50 peer-data-[state=checked]:border-green-600 peer-data-[state=checked]:bg-green-50 cursor-pointer transition-all"
                    >
                      <div className="bg-green-100 p-3 rounded-lg">
                        <Target className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">Perda de Gordura</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Reduzir gordura corporal com déficit calórico e treinos estratégicos
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="maintenance" id="maintenance" className="peer sr-only" />
                    <Label
                      htmlFor="maintenance"
                      className="flex items-start gap-4 rounded-xl border-2 border-gray-200 p-5 hover:bg-purple-50 peer-data-[state=checked]:border-purple-600 peer-data-[state=checked]:bg-purple-50 cursor-pointer transition-all"
                    >
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <User className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">Manutenção e Saúde</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Manter peso atual, melhorar condicionamento e qualidade de vida
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-200">
                <div className="flex items-start gap-3">
                  <div className="bg-green-600 text-white p-2 rounded-lg">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-green-800 mb-1">
                      🎉 14 Dias Grátis para Começar!
                    </div>
                    <div className="text-sm text-green-700">
                      Experimente todos os recursos premium sem compromisso. Após o período de teste, apenas R$ 29,90/mês.
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 h-12 text-base"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 h-12 text-base bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  Começar Jornada
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
