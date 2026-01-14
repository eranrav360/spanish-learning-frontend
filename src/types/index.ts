export interface Lesson {
  _id: string;
  title: string;
  description: string;
  level: number;
  icon: string;
  color: string;
  totalExercises: number;
  completed: boolean;
}

export interface Exercise {
  _id: string;
  lessonId: string;
  type: 'translation' | 'multipleChoice' | 'fillInBlank';
  question: string;
  questionSpanish?: string;
  correctAnswer: string;
  options?: string[];
  hint?: string;
}

export interface UserProgress {
  _id?: string;
  lessonId: string;
  completed: boolean;
  score: number;
  completedExercises: number;
  totalExercises: number;
  lastAccessed: Date;
}

export interface UserStats {
  totalScore: number;
  currentStreak: number;
  totalLessonsCompleted: number;
  level: number;
}

export interface ExerciseResult {
  exerciseId: string;
  correct: boolean;
  userAnswer: string;
  correctAnswer: string;
}
