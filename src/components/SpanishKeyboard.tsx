import React from 'react';

interface SpanishKeyboardProps {
  onCharacterClick: (char: string) => void;
}

const SpanishKeyboard: React.FC<SpanishKeyboardProps> = ({ onCharacterClick }) => {
  const specialChars = [
    { char: 'á', label: 'á' },
    { char: 'é', label: 'é' },
    { char: 'í', label: 'í' },
    { char: 'ó', label: 'ó' },
    { char: 'ú', label: 'ú' },
    { char: 'ñ', label: 'ñ' },
    { char: 'ü', label: 'ü' },
    { char: '¿', label: '¿' },
    { char: '¡', label: '¡' },
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-4 mt-4">
      <p className="text-sm text-gray-600 mb-3 text-center">מקלדת אותיות ספרדית:</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {specialChars.map((item) => (
          <button
            key={item.char}
            onClick={() => onCharacterClick(item.char)}
            className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg font-bold text-xl text-gray-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpanishKeyboard;
