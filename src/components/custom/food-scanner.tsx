"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FoodAnalysis } from "@/lib/types";
import { Camera, Loader2, CheckCircle, X } from "lucide-react";

interface FoodScannerProps {
  onFoodAnalyzed: (food: FoodAnalysis) => void;
}

export default function FoodScanner({ onFoodAnalyzed }: FoodScannerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [result, setResult] = useState<FoodAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulação de análise de IA (em produção, seria uma API real)
  const analyzeFoodImage = async (imageUrl: string): Promise<FoodAnalysis> => {
    // Simula delay de processamento
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Dados simulados de análise
    const foods = [
      { name: "Frango Grelhado com Arroz", calories: 450, protein: 45, carbs: 52, fat: 8 },
      { name: "Salada Caesar", calories: 320, protein: 12, carbs: 18, fat: 24 },
      { name: "Pizza Margherita", calories: 680, protein: 28, carbs: 78, fat: 28 },
      { name: "Hambúrguer com Batata", calories: 850, protein: 35, carbs: 92, fat: 42 },
      { name: "Sushi Variado", calories: 380, protein: 22, carbs: 58, fat: 6 },
      { name: "Macarrão à Bolonhesa", calories: 520, protein: 24, carbs: 68, fat: 16 },
      { name: "Omelete com Legumes", calories: 280, protein: 18, carbs: 12, fat: 18 },
    ];

    const randomFood = foods[Math.floor(Math.random() * foods.length)];

    return {
      id: Date.now().toString(),
      imageUrl,
      foodName: randomFood.name,
      calories: randomFood.calories,
      protein: randomFood.protein,
      carbs: randomFood.carbs,
      fat: randomFood.fat,
      timestamp: new Date(),
    };
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Criar preview da imagem
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageUrl = e.target?.result as string;
      setPreviewImage(imageUrl);
      setIsAnalyzing(true);

      try {
        const analysis = await analyzeFoodImage(imageUrl);
        setResult(analysis);
      } catch (error) {
        console.error("Erro ao analisar imagem:", error);
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    if (result) {
      onFoodAnalyzed(result);
      handleClose();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setPreviewImage(null);
    setResult(null);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 z-50"
      >
        <Camera className="w-8 h-8" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Camera className="w-6 h-6 text-orange-600" />
              Scanner de Alimentos
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {!previewImage ? (
            <div className="space-y-4">
              <div className="border-4 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-orange-400 transition-colors">
                <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">Tire uma foto da sua refeição</h3>
                <p className="text-muted-foreground mb-6">
                  Nossa IA analisará automaticamente as calorias e nutrientes
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="food-image"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Abrir Câmera
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={previewImage}
                  alt="Comida fotografada"
                  className="w-full h-64 object-cover"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-3" />
                      <p className="text-lg font-semibold">Analisando sua refeição...</p>
                      <p className="text-sm text-gray-300 mt-1">Identificando alimentos e nutrientes</p>
                    </div>
                  </div>
                )}
              </div>

              {result && !isAnalyzing && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-200">
                    <div className="flex items-start gap-3 mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{result.foodName}</h3>
                        <p className="text-sm text-muted-foreground">Análise concluída com sucesso</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                        <div className="text-3xl font-bold text-orange-600">{result.calories}</div>
                        <div className="text-xs text-muted-foreground mt-1">Calorias</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                        <div className="text-3xl font-bold text-blue-600">{result.protein}g</div>
                        <div className="text-xs text-muted-foreground mt-1">Proteínas</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                        <div className="text-3xl font-bold text-green-600">{result.carbs}g</div>
                        <div className="text-xs text-muted-foreground mt-1">Carboidratos</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                        <div className="text-3xl font-bold text-purple-600">{result.fat}g</div>
                        <div className="text-xs text-muted-foreground mt-1">Gorduras</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setPreviewImage(null);
                        setResult(null);
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Tirar Outra Foto
                    </Button>
                    <Button
                      onClick={handleConfirm}
                      className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Adicionar ao Diário
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
