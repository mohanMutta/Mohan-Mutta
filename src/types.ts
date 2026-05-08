/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  ADMIN = 'ADMIN',
  TRAINER = 'TRAINER',
  MEMBER = 'MEMBER',
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  phoneNumber?: string;
  joinedAt: number;
  gymId: string;
}

export interface MemberProfile extends UserProfile {
  membershipType: string;
  membershipExpiry: number;
  assignedTrainerId?: string;
  height?: number; // in cm
  weight?: number; // in kg
  goal?: 'weight_loss' | 'muscle_gain' | 'fitness' | 'bodybuilding';
}

export interface TrainerProfile extends UserProfile {
  specialization: string[];
  experience: number; // years
  assignedMembers: string[]; // array of member UIDs
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  gymId: string;
  timestamp: number;
  checkInMethod: 'QR' | 'MANUAL';
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
  createdBy: string; // trainer or admin ID
  targetGoal?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  demoUrl?: string;
  notes?: string;
}

export interface DietPlan {
  id: string;
  name: string;
  description: string;
  meals: Meal[];
  waterTarget: number; // liters
  calorieTarget: number;
}

export interface Meal {
  time: string;
  description: string;
  calories: number;
  protein: number; // grams
  carbs: number;
  fats: number;
}

export interface ProgressMetric {
  id: string;
  userId: string;
  timestamp: number;
  weight?: number;
  bodyFat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
  };
  photoUrls?: string[];
}

export interface GymSettings {
  id: string;
  name: string;
  address: string;
  ownerId: string;
  subscriptionPlan: 'free' | 'pro' | 'enterprise';
  logoUrl?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'reminder' | 'announcement' | 'alert' | 'message';
  read: boolean;
  timestamp: number;
}
