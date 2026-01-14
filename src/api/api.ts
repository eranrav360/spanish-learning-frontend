import { Lesson, Exercise, UserProgress, UserStats } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  async getLessons(): Promise<Lesson[]> {
    const response = await fetch(`${API_URL}/lessons`);
    if (!response.ok) throw new Error('Failed to fetch lessons');
    return response.json();
  },

  async getExercises(lessonId: string): Promise<Exercise[]> {
    const response = await fetch(`${API_URL}/exercises/${lessonId}`);
    if (!response.ok) throw new Error('Failed to fetch exercises');
    return response.json();
  },

  async saveProgress(progress: UserProgress): Promise<void> {
    const response = await fetch(`${API_URL}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(progress),
    });
    if (!response.ok) throw new Error('Failed to save progress');
  },

  async getUserStats(): Promise<UserStats> {
    const response = await fetch(`${API_URL}/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  async getUserProgress(): Promise<UserProgress[]> {
    const response = await fetch(`${API_URL}/progress`);
    if (!response.ok) throw new Error('Failed to fetch progress');
    return response.json();
  },
};
