import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Lesson } from '../types';
import { api } from '../api/api';

const Study: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLesson();
  }, [lessonId]);

  const loadLesson = async () => {
    try {
      if (!lessonId) return;
      const lessons = await api.getLessons();
      const currentLesson = lessons.find(l => l._id === lessonId);
      setLesson(currentLesson || null);
    } catch (error) {
      console.error('Error loading lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">📚</div>
          <p className="text-xl text-gray-600">טוען חומר לימוד...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600">שיעור לא נמצא</p>
          <button onClick={() => navigate('/')} className="btn-primary mt-4">
            חזור לשיעורים
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="text-gray-600 hover:text-gray-800 font-semibold mb-4 flex items-center gap-2"
        >
          ← חזור לשיעורים
        </button>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{lesson.icon}</span>
            <div>
              <h1 className="text-4xl font-bold">{lesson.title}</h1>
              <p className="text-blue-100 mt-2">{lesson.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              רמה {lesson.level}
            </span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              {lesson.totalExercises} תרגילים
            </span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              {lesson.vocabulary.length} מילים
            </span>
          </div>
        </div>
      </div>

      {/* Grammar Notes */}
      {lesson.grammarNotes && (
        <div className="bg-yellow-50 border-r-4 border-yellow-400 p-6 mb-8 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-3xl">💡</span>
            <div>
              <h2 className="text-xl font-bold text-yellow-800 mb-2">הערת דקדוק חשובה</h2>
              <p className="text-yellow-700">{lesson.grammarNotes}</p>
            </div>
          </div>
        </div>
      )}

      {/* Vocabulary Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span>📚</span>
          <span>אוצר מילים</span>
        </h2>

        <div className="grid gap-4">
          {lesson.vocabulary.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-l from-blue-50 to-purple-50 rounded-xl p-5 border-2 border-blue-200 hover:border-blue-400 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-blue-600">
                    {item.spanish}
                  </span>
                  <span className="text-gray-400 text-2xl">→</span>
                  <span className="text-2xl text-gray-700 font-semibold">
                    {item.hebrew}
                  </span>
                </div>
                <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
                  {index + 1} / {lesson.vocabulary.length}
                </span>
              </div>
              {item.example && (
                <div className="bg-white border-r-4 border-green-400 rounded-lg p-3">
                  <p className="text-gray-700 flex items-center gap-2">
                    <span className="text-green-600 font-bold text-sm">דוגמה:</span>
                    <span className="italic text-lg">{item.example}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Start Lesson Button */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-8 text-white text-center shadow-lg">
        <h3 className="text-2xl font-bold mb-3">מוכן להתחיל?</h3>
        <p className="mb-6 text-green-50">
          עכשיו שלמדת את המילים, הגיע הזמן לתרגל!
        </p>
        <button
          onClick={() => navigate(`/lesson/${lessonId}`)}
          className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-xl hover:bg-green-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          התחל תרגול 🚀
        </button>
      </div>
    </div>
  );
};

export default Study;
