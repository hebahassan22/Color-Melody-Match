import React, { useState, useEffect } from 'react';

const colors = [
  { name: 'Red', hex: '#ff4c4c', sound: '/sounds/red.mp3' },
  { name: 'Green', hex: '#4cff4c', sound: '/sounds/green.mp3' },
  { name: 'Blue', hex: '#4c4cff', sound: '/sounds/blue.mp3' }
];

export default function ColorMelodyGame() {
  const [targetColor, setTargetColor] = useState(null);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    pickRandomColor();
  }, []);

  const pickRandomColor = () => {
    const random = colors[Math.floor(Math.random() * colors.length)];
    const audio = new Audio(random.sound);
    audio.play();
    setTargetColor(random);
    setMessage('Which color made the sound?');
  };

  const handleChoice = (color) => {
    if (!targetColor) return;
    if (color.name === targetColor.name) {
      setMessage('✅ Correct!');
      setScore(score + 1);
      setTimeout(() => pickRandomColor(), 1000);
    } else {
      setMessage('❌ Try again!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">🎵 Color Melody Match</h1>
      <p className="mb-4 text-2xl italic animate-pulse text-yellow-300">{message}</p>
      <div className="flex gap-12 mb-8">
        {colors.map((color) => (
          <div className="flex flex-col items-center" key={color.name}>
            <button
              onClick={() => handleChoice(color)}
              style={{ backgroundColor: color.hex }}
              className="w-48 h-48 rounded-full shadow-2xl border-4 border-white hover:scale-105 transition-transform duration-300"
              aria-label={color.name}
            ></button>
            <span className="mt-2 text-lg font-semibold">{color.name}</span>
          </div>
        ))}
      </div>
      <p className="text-2xl font-bold">Score: {score}</p>
    </div>
  );
}
