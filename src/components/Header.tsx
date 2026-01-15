import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { UserStats } from '../types';

interface HeaderProps {
  stats: UserStats | null;
}

const Header: React.FC<HeaderProps> = ({ stats }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            {/* Dashboard Button */}
            <button
              onClick={() => navigate(isDashboard ? '/' : '/dashboard')}
              className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-xl hover:bg-purple-100 transition-all"
            >
              <span className="text-2xl">{isDashboard ? '📚' : '📊'}</span>
              <div className="text-sm font-semibold text-purple-600">
                {isDashboard ? 'שיעורים' : 'דשבורד'}
              </div>
            </button>
            {/* Streak */}
            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl">
              <span className="text-2xl">🔥</span>
              <div>
                <div className="text-sm text-gray-600">רצף</div>
                <div className="text-xl font-bold text-orange-500">
                  {stats?.currentStreak || 0} ימים
                </div>
              </div>
            </div>

            {/* Score */}
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl">
              <span className="text-2xl">⭐</span>
              <div>
                <div className="text-sm text-gray-600">ניקוד</div>
                <div className="text-xl font-bold text-yellow-600">
                  {stats?.totalScore || 0}
                </div>
              </div>
            </div>

            {/* Level */}
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl">
              <span className="text-2xl">🏆</span>
              <div>
                <div className="text-sm text-gray-600">רמה</div>
                <div className="text-xl font-bold text-blue-600">
                  {stats?.level || 1}
                </div>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-800">
                ספרדית בקלות
              </h1>
              <p className="text-sm text-gray-500">למד ספרדית בדרך המהנה</p>
            </div>
            <div className="text-5xl">🇪🇸</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
