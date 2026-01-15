import React, { useState, useEffect } from 'react';
import type { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
  showResult: boolean;
  isCorrect: boolean;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onAnswer,
  showResult,
  isCorrect,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [inputAnswer, setInputAnswer] = useState<string>('');

  // Play sound effect
  useEffect(() => {
    if (showResult) {
      playSound(isCorrect);
    }
  }, [showResult, isCorrect]);

  const playSound = (correct: boolean) => {
    // Using Web Audio API to generate simple tones
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (correct) {
      // Success sound: happy ascending notes
      const now = audioContext.currentTime;
      oscillator.frequency.setValueAtTime(523.25, now); // C5
      oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, now + 0.2); // G5
      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      oscillator.start(now);
      oscillator.stop(now + 0.4);
    } else {
      // Error sound: descending note
      const now = audioContext.currentTime;
      oscillator.frequency.setValueAtTime(392.00, now); // G4
      oscillator.frequency.setValueAtTime(293.66, now + 0.15); // D4
      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      oscillator.start(now);
      oscillator.stop(now + 0.3);
    }
  };

  const handleSubmit = () => {
    const answer =
      exercise.type === 'multipleChoice' ? selectedAnswer : inputAnswer;
    if (answer.trim()) {
      onAnswer(answer);
    }
  };

  const renderExerciseContent = () => {
    switch (exercise.type) {
      case 'multipleChoice':
        return (
          <div className="space-y-3">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {exercise.question}
              </h3>
              {exercise.questionSpanish && (
                <p className="text-xl text-blue-600 font-semibold">
                  {exercise.questionSpanish}
                </p>
              )}
            </div>
            {exercise.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(option)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-right font-semibold transition-all duration-200 ${
                  selectedAnswer === option
                    ? showResult
                      ? isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                    : showResult && option === exercise.correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'translation':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl text-gray-600 mb-3">תרגם לספרדית:</h3>
              <p className="text-3xl font-bold text-gray-800">
                {exercise.question}
              </p>
            </div>
            <input
              type="text"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              disabled={showResult}
              className={`w-full p-4 text-xl text-center border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                showResult
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
              placeholder="הקלד את התרגום כאן..."
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            {showResult && !isCorrect && (
              <p className="text-center text-green-600 font-semibold">
                התשובה הנכונה: {exercise.correctAnswer}
              </p>
            )}
          </div>
        );

      case 'fillInBlank':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl text-gray-600 mb-3">השלם את המשפט:</h3>
              <p className="text-2xl font-bold text-gray-800">
                {exercise.question}
              </p>
            </div>
            <input
              type="text"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              disabled={showResult}
              className={`w-full p-4 text-xl text-center border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                showResult
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
              placeholder="הקלד את התשובה..."
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            {exercise.hint && !showResult && (
              <p className="text-center text-gray-500 text-sm">
                💡 רמז: {exercise.hint}
              </p>
            )}
            {showResult && !isCorrect && (
              <p className="text-center text-green-600 font-semibold">
                התשובה הנכונה: {exercise.correctAnswer}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="card max-w-2xl mx-auto">
      {renderExerciseContent()}

      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={
            exercise.type === 'multipleChoice'
              ? !selectedAnswer
              : !inputAnswer.trim()
          }
          className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          בדוק תשובה
        </button>
      )}

      {showResult && (
        <div
          className={`mt-6 p-4 rounded-xl text-center font-bold text-lg ${
            isCorrect
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {isCorrect ? '✓ נכון! כל הכבוד!' : '✗ לא נכון, נסה שוב!'}
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;
