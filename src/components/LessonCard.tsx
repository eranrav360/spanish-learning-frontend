import React from 'react';
import { Lesson } from '../types';

interface LessonCardProps {
  lesson: Lesson;
  progress: number;
  onClick: () => void;
  isLocked?: boolean;
}

const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  progress,
  onClick,
  isLocked = false,
}) => {
  const progressPercentage = (progress / lesson.totalExercises) * 100;

  return (
    <div
      onClick={!isLocked ? onClick : undefined}
      className={`lesson-card ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{
        background: isLocked
          ? '#e5e7eb'
          : `linear-gradient(135deg, ${lesson.color}15 0%, ${lesson.color}30 100%)`,
      }}
    >
      {/* Lock Icon */}
      {isLocked && (
        <div className="absolute top-4 left-4 text-4xl">🔒</div>
      )}

      {/* Completion Badge */}
      {lesson.completed && (
        <div className="absolute top-4 left-4 bg-primary text-white rounded-full p-2 shadow-lg">
          <span className="text-2xl">✓</span>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-5xl">{lesson.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {lesson.title}
              </h3>
              <p className="text-sm text-gray-600">{lesson.description}</p>
            </div>
          </div>
          <div className="text-sm font-semibold text-gray-500">
            רמה {lesson.level}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">התקדמות</span>
            <span className="text-sm font-bold text-gray-700">
              {progress} / {lesson.totalExercises}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progressPercentage}%`,
                backgroundColor: lesson.color,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
