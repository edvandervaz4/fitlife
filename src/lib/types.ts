export type Gender = "male" | "female" | "other";
export type FitnessGoal = "muscle" | "fat-loss" | "maintenance";
export type SubscriptionStatus = "trial" | "active" | "expired" | "none";

export interface UserProfile {
  name: string;
  email: string;
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  goal: FitnessGoal;
  subscription: {
    status: SubscriptionStatus;
    trialEndsAt?: Date;
    nextBillingDate?: Date;
    plan: "monthly" | "none";
  };
}

export interface FoodAnalysis {
  id: string;
  imageUrl: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: Date;
}
