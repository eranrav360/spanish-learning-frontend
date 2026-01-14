import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Lesson, UserProgress } from '../types';
import { api } from '../api/api';
import LessonCard from '../components/LessonCard';

const Home: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [lessonsData, progressData] = await Promise.all([
        api.getLessons(),
        api.getUserProgress(),
      ]);

      setLessons(lessonsData);

      const progressMap = new Map<string, number>();
      progressData.forEach((p: UserProgress) => {
        progressMap.set(p.lessonId, p.completedExercises);
      });
      setProgress(progressMap);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonClick = (lessonId: string, level: number) => {
    // Check if previous lessons are completed (simple progression)
    const previousLessons = lessons.filter((l) => l.level < level);
    const allPreviousCompleted = previousLessons.every((l) =>
      l.completed || (progress.get(l._id) || 0) >= l.totalExercises
    );

    if (allPreviousCompleted || level === 1) {
      navigate(`/lesson/${lessonId}`);
    }
  };

  const isLessonLocked = (level: number): boolean => {
    if (level === 1) return false;
    const previousLessons = lessons.filter((l) => l.level < level);
    return !previousLessons.every((l) =>
      l.completed || (progress.get(l._id) || 0) >= l.totalExercises
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🇪🇸</div>
          <p className="text-xl text-gray-600">טוען שיעורים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          השיעורים שלך
        </h2>
        <p className="text-gray-600">בחר שיעור כדי להתחיל ללמוד</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson._id}
            lesson={lesson}
            progress={progress.get(lesson._id) || 0}
            onClick={() => handleLessonClick(lesson._id, lesson.level)}
            isLocked={isLessonLocked(lesson.level)}
          />
        ))}
      </div>

      {/* Motivational Section */}
      <div className="mt-12 card text-center bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="text-5xl mb-4">🎯</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          המשך ללמוד כל יום!
        </h3>
        <p className="text-gray-600">
          תרגול קבוע הוא המפתח להצלחה בלימוד שפה חדשה
        </p>
      </div>
    </div>
  );
};

export default Home;
