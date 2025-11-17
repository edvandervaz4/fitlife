"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dumbbell, 
  Apple, 
  Droplets, 
  TrendingUp, 
  Target, 
  Flame,
  Plus,
  Minus,
  Activity,
  Weight,
  Calendar,
  ChevronRight,
  Crown,
  Camera
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { UserProfile, FoodAnalysis } from "@/lib/types";
import Onboarding from "@/components/custom/onboarding";
import FoodScanner from "@/components/custom/food-scanner";
import SubscriptionModal from "@/components/custom/subscription-modal";

export default function FitLife() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [waterIntake, setWaterIntake] = useState(1200);
  const [caloriesConsumed, setCaloriesConsumed] = useState(1450);
  const [foodHistory, setFoodHistory] = useState<FoodAnalysis[]>([]);

  const waterGoal = 2500;
  const caloriesGoal = user?.goal === "muscle" ? 2800 : user?.goal === "fat-loss" ? 2000 : 2300;

  // Verificar se precisa mostrar modal de assinatura
  useEffect(() => {
    if (user && user.subscription.status === "trial") {
      const daysLeft = user.subscription.trialEndsAt
        ? Math.ceil((user.subscription.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : 0;
      
      if (daysLeft <= 3) {
        // Mostrar modal quando faltarem 3 dias ou menos
        const timer = setTimeout(() => setShowSubscriptionModal(true), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [user]);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUser(profile);
  };

  const handleFoodAnalyzed = (food: FoodAnalysis) => {
    setFoodHistory([food, ...foodHistory]);
    setCaloriesConsumed(caloriesConsumed + food.calories);
  };

  const handleSubscribe = () => {
    if (user) {
      setUser({
        ...user,
        subscription: {
          status: "active",
          plan: "monthly",
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
      setShowSubscriptionModal(false);
    }
  };

  // Se usuário não fez onboarding, mostrar tela de cadastro
  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Dados de progresso
  const weightData = [
    { day: "Seg", weight: user.weight + 2 },
    { day: "Ter", weight: user.weight + 1.5 },
    { day: "Qua", weight: user.weight + 1 },
    { day: "Qui", weight: user.weight + 0.8 },
    { day: "Sex", weight: user.weight + 0.5 },
    { day: "Sáb", weight: user.weight + 0.2 },
    { day: "Dom", weight: user.weight },
  ];

  const caloriesData = [
    { day: "Seg", consumed: 2100, burned: 2400 },
    { day: "Ter", consumed: 2300, burned: 2500 },
    { day: "Qua", consumed: 1900, burned: 2300 },
    { day: "Qui", consumed: 2200, burned: 2600 },
    { day: "Sex", consumed: 2400, burned: 2700 },
    { day: "Sáb", consumed: 2000, burned: 2200 },
    { day: "Dom", consumed: 1800, burned: 2100 },
  ];

  // Plano de treino
  const workoutPlan = [
    {
      day: "Segunda",
      focus: "Peito e Tríceps",
      exercises: [
        { name: "Supino Reto", sets: "4x12", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop" },
        { name: "Supino Inclinado", sets: "3x12", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop" },
        { name: "Crucifixo", sets: "3x15", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop" },
        { name: "Tríceps Pulley", sets: "3x15", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop" },
      ],
    },
    {
      day: "Terça",
      focus: "Costas e Bíceps",
      exercises: [
        { name: "Barra Fixa", sets: "4x10", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop" },
        { name: "Remada Curvada", sets: "4x12", image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=300&fit=crop" },
        { name: "Rosca Direta", sets: "3x12", image: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=400&h=300&fit=crop" },
        { name: "Rosca Martelo", sets: "3x12", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop" },
      ],
    },
    {
      day: "Quarta",
      focus: "Pernas",
      exercises: [
        { name: "Agachamento", sets: "4x15", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop" },
        { name: "Leg Press", sets: "4x12", image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=300&fit=crop" },
        { name: "Cadeira Extensora", sets: "3x15", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop" },
        { name: "Mesa Flexora", sets: "3x15", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop" },
      ],
    },
  ];

  // Plano alimentar
  const mealPlan = user.goal === "muscle" 
    ? [
        { meal: "Café da Manhã", time: "07:00", calories: 650, items: ["4 ovos mexidos", "2 fatias de pão integral", "Abacate", "Suco de laranja"] },
        { meal: "Lanche da Manhã", time: "10:00", calories: 300, items: ["Whey protein", "Banana", "Aveia"] },
        { meal: "Almoço", time: "12:30", calories: 800, items: ["200g frango grelhado", "Arroz integral", "Feijão", "Salada verde"] },
        { meal: "Lanche da Tarde", time: "16:00", calories: 350, items: ["Batata doce", "Atum", "Castanhas"] },
        { meal: "Jantar", time: "19:30", calories: 700, items: ["200g carne vermelha", "Batata", "Brócolis", "Cenoura"] },
      ]
    : [
        { meal: "Café da Manhã", time: "07:00", calories: 400, items: ["2 ovos mexidos", "1 fatia de pão integral", "Café sem açúcar"] },
        { meal: "Lanche da Manhã", time: "10:00", calories: 150, items: ["Iogurte natural", "Frutas vermelhas"] },
        { meal: "Almoço", time: "12:30", calories: 550, items: ["150g frango grelhado", "Salada verde", "Legumes"] },
        { meal: "Lanche da Tarde", time: "16:00", calories: 200, items: ["Whey protein", "Amêndoas"] },
        { meal: "Jantar", time: "19:30", calories: 500, items: ["150g peixe", "Salada", "Abobrinha"] },
      ];

  const daysLeft = user.subscription.trialEndsAt
    ? Math.ceil((user.subscription.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <Dumbbell className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">FitLife</h1>
                <p className="text-blue-100 text-sm">Olá, {user.name}!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user.subscription.status === "trial" && (
                <Button
                  onClick={() => setShowSubscriptionModal(true)}
                  variant="secondary"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  {daysLeft} dias grátis
                </Button>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium">Hoje</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Banner de Trial */}
        {user.subscription.status === "trial" && daysLeft <= 7 && (
          <Card className="mb-6 border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="w-8 h-8 text-yellow-600" />
                  <div>
                    <h3 className="font-bold text-lg">
                      Seu período gratuito termina em {daysLeft} dias
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Assine agora e continue aproveitando todos os recursos premium
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowSubscriptionModal(true)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                >
                  Ver Planos
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cards de Resumo Diário */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Calorias */}
          <Card className="border-l-4 border-l-orange-500 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  Calorias
                </span>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {caloriesConsumed}/{caloriesGoal}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress 
                value={(caloriesConsumed / caloriesGoal) * 100} 
                className="h-3 mb-3"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCaloriesConsumed(Math.max(0, caloriesConsumed - 100))}
                  className="flex-1"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCaloriesConsumed(caloriesConsumed + 100)}
                  className="flex-1"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hidratação */}
          <Card className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  Hidratação
                </span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {waterIntake}ml
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress 
                value={(waterIntake / waterGoal) * 100} 
                className="h-3 mb-3"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setWaterIntake(Math.max(0, waterIntake - 250))}
                  className="flex-1"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setWaterIntake(waterIntake + 250)}
                  className="flex-1"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Peso Atual */}
          <Card className="border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span className="flex items-center gap-2">
                  <Weight className="w-5 h-5 text-green-500" />
                  Peso Atual
                </span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {user.weight}kg
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Label htmlFor="weight" className="text-sm">Atualizar:</Label>
                <Input
                  id="weight"
                  type="number"
                  value={user.weight}
                  onChange={(e) => setUser({ ...user, weight: Number(e.target.value) })}
                  className="w-24"
                  step="0.1"
                />
                <span className="text-sm text-muted-foreground">kg</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Principais */}
        <Tabs defaultValue="workout" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-14 bg-white shadow-md">
            <TabsTrigger value="workout" className="text-base data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Dumbbell className="w-5 h-5 mr-2" />
              Treino
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="text-base data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Apple className="w-5 h-5 mr-2" />
              Alimentação
            </TabsTrigger>
            <TabsTrigger value="food-diary" className="text-base data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              <Camera className="w-5 h-5 mr-2" />
              Diário
            </TabsTrigger>
            <TabsTrigger value="progress" className="text-base data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <TrendingUp className="w-5 h-5 mr-2" />
              Progresso
            </TabsTrigger>
          </TabsList>

          {/* Plano de Treino */}
          <TabsContent value="workout" className="space-y-6">
            {workoutPlan.map((day, idx) => (
              <Card key={idx} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl">{day.day}</span>
                    <Badge className="bg-blue-600">{day.focus}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {day.exercises.map((exercise, exerciseIdx) => (
                      <div
                        key={exerciseIdx}
                        className="flex gap-4 p-4 border-2 border-gray-100 rounded-xl hover:border-blue-300 transition-all hover:shadow-md"
                      >
                        <img
                          src={exercise.image}
                          alt={exercise.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{exercise.name}</h4>
                          <Badge variant="outline" className="text-blue-600 border-blue-600">
                            {exercise.sets}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Plano Alimentar */}
          <TabsContent value="nutrition" className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl">Plano Alimentar - {user.goal === "muscle" ? "Ganho de Massa" : "Perda de Gordura"}</span>
                  <Badge className="bg-green-600">
                    Meta: {caloriesGoal} kcal/dia
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {mealPlan.map((meal, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-5 border-2 border-gray-100 rounded-xl hover:border-green-300 transition-all hover:shadow-md"
                    >
                      <div className="bg-gradient-to-br from-green-500 to-blue-500 text-white p-3 rounded-xl min-w-[80px] text-center">
                        <div className="text-xs font-medium mb-1">Horário</div>
                        <div className="text-lg font-bold">{meal.time}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-lg">{meal.meal}</h4>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                            {meal.calories} kcal
                          </Badge>
                        </div>
                        <ul className="space-y-1">
                          {meal.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <ChevronRight className="w-4 h-4 text-green-600" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Diário de Alimentos */}
          <TabsContent value="food-diary" className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl">Histórico de Refeições</span>
                  <Badge className="bg-orange-600">
                    {foodHistory.length} registros
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {foodHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">Nenhuma refeição registrada</h3>
                    <p className="text-muted-foreground mb-6">
                      Use o botão de câmera para escanear suas refeições
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {foodHistory.map((food) => (
                      <div
                        key={food.id}
                        className="flex gap-4 p-4 border-2 border-gray-100 rounded-xl hover:border-orange-300 transition-all"
                      >
                        <img
                          src={food.imageUrl}
                          alt={food.foodName}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-lg">{food.foodName}</h4>
                            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                              {food.calories} kcal
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Proteínas:</span>
                              <span className="font-semibold ml-1">{food.protein}g</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Carboidratos:</span>
                              <span className="font-semibold ml-1">{food.carbs}g</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Gorduras:</span>
                              <span className="font-semibold ml-1">{food.fat}g</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(food.timestamp).toLocaleString("pt-BR")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gráficos de Progresso */}
          <TabsContent value="progress" className="space-y-6">
            {/* Evolução de Peso */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Activity className="w-6 h-6 text-purple-600" />
                  Evolução de Peso (7 dias)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="day" stroke="#666" />
                    <YAxis stroke="#666" domain={[user.weight - 1, user.weight + 3]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '2px solid #3b82f6',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Balanço Calórico */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-green-50">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Flame className="w-6 h-6 text-orange-600" />
                  Balanço Calórico Semanal
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={caloriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="day" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '2px solid #10b981',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="consumed" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="burned" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span className="text-sm">Consumidas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 rounded"></div>
                    <span className="text-sm">Queimadas</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estatísticas Gerais */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg border-l-4 border-l-blue-600">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">-2.0kg</div>
                    <div className="text-sm text-muted-foreground">Perda na Semana</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-l-4 border-l-green-600">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">5/7</div>
                    <div className="text-sm text-muted-foreground">Treinos Completos</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-l-4 border-l-purple-600">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">92%</div>
                    <div className="text-sm text-muted-foreground">Meta de Calorias</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Food Scanner (botão flutuante) */}
      <FoodScanner onFoodAnalyzed={handleFoodAnalyzed} />

      {/* Modal de Assinatura */}
      <SubscriptionModal
        user={user}
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
}
