import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Exercise } from '../types';
import { api } from '../api/api';
import ExerciseCard from '../components/ExerciseCard';
import { compareSpanishText } from '../utils/normalizeSpanish';

const Lesson: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    loadExercises();
  }, [lessonId]);

  const loadExercises = async () => {
    try {
      if (!lessonId) return;
      const data = await api.getExercises(lessonId);
      setExercises(data);
    } catch (error) {
      console.error('Error loading exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer: string) => {
    const currentExercise = exercises[currentIndex];
    // Use accent-insensitive comparison for Spanish text
    const correct = compareSpanishText(answer, currentExercise.correctAnswer);

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (currentIndex < exercises.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowResult(false);
      } else {
        finishLesson(correct);
      }
    }, 2000);
  };

  const finishLesson = async (lastCorrect: boolean) => {
    const finalScore = lastCorrect ? score + 10 : score;
    setCompleted(true);

    try {
      if (lessonId) {
        await api.saveProgress({
          lessonId,
          completed: true,
          score: finalScore,
          completedExercises: exercises.length,
          totalExercises: exercises.length,
          lastAccessed: new Date(),
        });
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">📚</div>
          <p className="text-xl text-gray-600">טוען תרגילים...</p>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card max-w-2xl mx-auto text-center">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            כל הכבוד!
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            סיימת את השיעור בהצלחה!
          </p>
          <div className="bg-yellow-50 rounded-2xl p-6 mb-6">
            <div className="text-5xl mb-2">⭐</div>
            <p className="text-3xl font-bold text-yellow-600">{score} נקודות</p>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              חזור לשיעורים
            </button>
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary"
            >
              תרגל שוב
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600">אין תרגילים זמינים</p>
          <button onClick={() => navigate('/')} className="btn-primary mt-4">
            חזור לשיעורים
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 font-semibold"
          >
            ← חזור
          </button>
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold text-gray-700">
              ⭐ {score}
            </div>
            <div className="text-lg font-semibold text-gray-700">
              {currentIndex + 1} / {exercises.length}
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{
              width: `${((currentIndex + 1) / exercises.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Exercise */}
      <ExerciseCard
        exercise={exercises[currentIndex]}
        onAnswer={handleAnswer}
        showResult={showResult}
        isCorrect={isCorrect}
      />
    </div>
  );
};

export default Lesson;
