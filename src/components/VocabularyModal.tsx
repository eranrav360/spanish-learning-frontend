import React from 'react';
import type { VocabularyItem } from '../types';

interface VocabularyModalProps {
  isOpen: boolean;
  onClose: () => void;
  vocabulary: VocabularyItem[];
  grammarNotes?: string;
  lessonTitle: string;
}

const VocabularyModal: React.FC<VocabularyModalProps> = ({
  isOpen,
  onClose,
  vocabulary,
  grammarNotes,
  lessonTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-white sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">📖 חומר לימוד</h2>
                <p className="text-sm text-blue-100 mt-1">{lessonTitle}</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Grammar Notes */}
            {grammarNotes && (
              <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4 mb-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h3 className="font-bold text-yellow-800 mb-1">הערת דקדוק</h3>
                    <p className="text-yellow-700 text-sm">{grammarNotes}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Vocabulary List */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📚</span>
                <span>אוצר מילים ({vocabulary.length} מילים)</span>
              </h3>

              <div className="grid gap-3">
                {vocabulary.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition-all border border-gray-200 hover:border-blue-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-blue-600">
                          {item.spanish}
                        </span>
                        <span className="text-gray-400">→</span>
                        <span className="text-lg text-gray-700">{item.hebrew}</span>
                      </div>
                    </div>
                    {item.example && (
                      <div className="mt-2 pr-4 border-r-2 border-green-400 bg-white rounded-lg p-2">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="text-green-600 font-semibold">דוגמה:</span>
                          <span className="italic">{item.example}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end border-t sticky bottom-0">
            <button
              onClick={onClose}
              className="btn-primary"
            >
              סגור והמשך
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyModal;
