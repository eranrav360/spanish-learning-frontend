import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import type { UserStats } from './types';
import { api } from './api/api';

function App() {
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await api.getUserStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
      // Set default stats if API fails
      setStats({
        totalScore: 0,
        currentStreak: 0,
        totalLessonsCompleted: 0,
        level: 1,
      });
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header stats={stats} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson/:lessonId" element={<Lesson />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
