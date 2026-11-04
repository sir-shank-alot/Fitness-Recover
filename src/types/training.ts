export interface Exercise {
  id: string;
  athleteId: 'arwel' | 'helen' | 'both';
  name: string;
  targetInjury: string;
  category: 'Rehab Isometric' | 'Strength & Kinetic Chain' | 'Mobility & Control' | 'Foot & Ankle' | 'Core & Spine';
  phase: 1 | 2 | 3; // Phase 1: Weeks 1-2 (Acute & Isometric), Phase 2: Weeks 3-6 (Kinetic Restoration), Phase 3: Weeks 7-10+ (Runner Resilient)
  day: 'Day A' | 'Day B' | 'Day C' | 'Daily Mobility';
  sets: string;
  reps: string;
  tempo: string;
  rest: string;
  equipment: string;
  videoTitle: string;
  videoUrl: string;
  youtubeId?: string;
  keyCues: string[];
  clinicalRationale: string;
  safetyCaution: string;
  isGripFree?: boolean; // For Helen's wrist/finger inflammation
  jointImpactLevel: 'Low' | 'Zero' | 'Moderate';
}

export interface AthleteProfile {
  id: 'arwel' | 'helen';
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  weightKg: number;
  race: string;
  injuries: {
    title: string;
    clinicalName: string;
    description: string;
    gaitImpact: string;
    rehabStrategy: string;
    bannedMovements: string[];
  }[];
  focusAreas: string[];
  equipmentRecommended: string[];
}

export interface WorkoutLogEntry {
  id: string;
  date: string;
  athleteId: 'arwel' | 'helen';
  sessionName: string;
  prePainScore: number; // 0-10
  postPainScore: number; // 0-10
  exercisesCompleted: string[];
  notes: string;
}
