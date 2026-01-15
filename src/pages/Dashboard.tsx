import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserStats, UserProgress, Achievement } from '../types';
import { api } from '../api/api';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsData, progressData] = await Promise.all([
        api.getUserStats(),
        api.getUserProgress(),
      ]);
      setStats(statsData);
      calculateAchievements(statsData, progressData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAchievements = (stats: UserStats, progress: UserProgress[]) => {
    const completedLessons = stats.totalLessonsCompleted;
    const totalScore = stats.totalScore;
    const streak = stats.currentStreak;

    const allAchievements: Achievement[] = [
      {
        id: 'first-lesson',
        title: 'התחלה חדשה',
        description: 'השלם את השיעור הראשון',
        icon: '🎯',
        unlocked: completedLessons >= 1,
      },
      {
        id: 'five-lessons',
        title: 'למדן מתמיד',
        description: 'השלם 5 שיעורים',
        icon: '📚',
        unlocked: completedLessons >= 5,
        progress: completedLessons,
        target: 5,
      },
      {
        id: 'ten-lessons',
        title: 'מומחה בהתהוות',
        description: 'השלם 10 שיעורים',
        icon: '🎓',
        unlocked: completedLessons >= 10,
        progress: completedLessons,
        target: 10,
      },
      {
        id: 'all-lessons',
        title: 'מאסטר ספרדית',
        description: 'השלם את כל 15 השיעורים',
        icon: '👑',
        unlocked: completedLessons >= 15,
        progress: completedLessons,
        target: 15,
      },
      {
        id: 'streak-3',
        title: 'רצף ראשון',
        description: 'למד 3 ימים ברצף',
        icon: '🔥',
        unlocked: streak >= 3,
        progress: streak,
        target: 3,
      },
      {
        id: 'streak-7',
        title: 'שבוע מושלם',
        description: 'למד 7 ימים ברצף',
        icon: '⭐',
        unlocked: streak >= 7,
        progress: streak,
        target: 7,
      },
      {
        id: 'streak-30',
        title: 'מחויבות ברזל',
        description: 'למד 30 ימים ברצף',
        icon: '💪',
        unlocked: streak >= 30,
        progress: streak,
        target: 30,
      },
      {
        id: 'score-500',
        title: 'צובר נקודות',
        description: 'צבור 500 נקודות',
        icon: '💯',
        unlocked: totalScore >= 500,
        progress: totalScore,
        target: 500,
      },
      {
        id: 'score-1000',
        title: 'מלך הניקוד',
        description: 'צבור 1000 נקודות',
        icon: '🏆',
        unlocked: totalScore >= 1000,
        progress: totalScore,
        target: 1000,
      },
      {
        id: 'perfect-score',
        title: 'מושלם!',
        description: 'קבל ציון 100% בשיעור',
        icon: '✨',
        unlocked: progress.some(
          (p) => p.completedExercises === p.totalExercises && p.score === p.totalExercises * 10
        ),
      },
    ];

    setAchievements(allAchievements);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">📊</div>
          <p className="text-xl text-gray-600">טוען נתונים...</p>
        </div>
      </div>
    );
  }

  const unlockedAchievements = achievements.filter((a) => a.unlocked);
  const lockedAchievements = achievements.filter((a) => !a.unlocked);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800">הדשבורד שלי</h1>
        <button
          onClick={() => navigate('/')}
          className="text-gray-600 hover:text-gray-800 font-semibold"
        >
          חזור לשיעורים ←
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <div className="text-5xl mb-2">🔥</div>
          <p className="text-3xl font-bold text-orange-600">{stats?.currentStreak || 0}</p>
          <p className="text-gray-600 mt-1">רצף ימים</p>
        </div>
        <div className="card text-center">
          <div className="text-5xl mb-2">⭐</div>
          <p className="text-3xl font-bold text-yellow-600">{stats?.totalScore || 0}</p>
          <p className="text-gray-600 mt-1">סך נקודות</p>
        </div>
        <div className="card text-center">
          <div className="text-5xl mb-2">📚</div>
          <p className="text-3xl font-bold text-blue-600">{stats?.totalLessonsCompleted || 0}</p>
          <p className="text-gray-600 mt-1">שיעורים הושלמו</p>
        </div>
        <div className="card text-center">
          <div className="text-5xl mb-2">📊</div>
          <p className="text-3xl font-bold text-green-600">{stats?.level || 1}</p>
          <p className="text-gray-600 mt-1">רמה נוכחית</p>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          🏆 הישגים ({unlockedAchievements.length}/{achievements.length})
        </h2>

        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">הושגו</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {unlockedAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="card bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-800 mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      {achievement.progress !== undefined && achievement.target && (
                        <div className="mt-2">
                          <div className="text-xs text-gray-500 mb-1">
                            {achievement.progress} / {achievement.target}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-500 h-2 rounded-full transition-all"
                              style={{
                                width: `${Math.min(
                                  (achievement.progress / achievement.target) * 100,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Locked Achievements */}
        {lockedAchievements.length > 0 && (
          <>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">טרם הושגו</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lockedAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="card bg-gray-100 opacity-70 border-2 border-gray-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-5xl grayscale">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-600 mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                      {achievement.progress !== undefined && achievement.target && (
                        <div className="mt-2">
                          <div className="text-xs text-gray-500 mb-1">
                            {achievement.progress} / {achievement.target}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gray-400 h-2 rounded-full transition-all"
                              style={{
                                width: `${Math.min(
                                  (achievement.progress || 0) / achievement.target * 100,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Progress Chart */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">התקדמות כללית</h2>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-semibold">שיעורים שהושלמו</span>
              <span className="text-gray-600">
                {stats?.totalLessonsCompleted || 0} / 15
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-primary h-4 rounded-full transition-all"
                style={{
                  width: `${((stats?.totalLessonsCompleted || 0) / 15) * 100}%`,
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-semibold">התקדמות לרמה הבאה</span>
              <span className="text-gray-600">
                רמה {stats?.level || 1}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full transition-all"
                style={{
                  width: `${((stats?.totalScore || 0) % 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
