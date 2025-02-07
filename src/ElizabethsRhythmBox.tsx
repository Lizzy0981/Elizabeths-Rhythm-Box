<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import { Music, Volume2, Heart } from 'lucide-react';

interface InstrumentButtonProps {
  instrument: Instrument;
  isActive: boolean;
  onPlay: (name: string) => void;
}

type Instrument = {
  name: string;
  color: string;
  icon: string;
  key: string;
};

const INSTRUMENTS: Instrument[] = [
  { name: 'Kick', color: '#FF6B6B', icon: '🥁', key: 'a' },
  { name: 'Snare', color: '#4ECDC4', icon: '🔔', key: 'b' },
  { name: 'HiHat', color: '#45B7D1', icon: '🎶', key: 'c' },
  { name: 'Clap', color: '#FFA07A', icon: '👏', key: 'd' },
  { name: 'Crash', color: '#98D8C8', icon: '💥', key: 'e' },
  { name: 'Tom', color: '#F08A5D', icon: '🎵', key: 'f' },
  { name: 'Perc', color: '#F08A5D', icon: '🎚️', key: 'g' },
  { name: 'Cowbell', color: '#B83B5E', icon: '🐮', key: 'h' },
  { name: 'Synth', color: '#6A2C70', icon: '🎹', key: 'i' }
];

const AUDIO_FILES = new Map();

const preloadAudio = (instrument: string) => {
  const audio = new Audio(`/sounds/${instrument.toLowerCase()}.wav`);
  audio.preload = 'auto';
  AUDIO_FILES.set(instrument, audio);
};

// Precarga todos los sonidos
INSTRUMENTS.forEach(instrument => preloadAudio(instrument.name));

const InstrumentButton: React.FC<InstrumentButtonProps> = ({ instrument, isActive, onPlay }) => (
  <button
    className={`w-28 h-28 rounded-2xl shadow-lg flex flex-col items-center justify-center text-white font-bold text-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 active:scale-95 ${
      isActive ? 'animate-bounce-once' : ''
    }`}
    style={{ backgroundColor: instrument.color }}
    onClick={() => onPlay(instrument.name)}
  >
    <span className="text-3xl mb-2">{instrument.icon}</span>
    <span>{instrument.name}</span>
    <span className="text-sm opacity-75">({instrument.key})</span>
  </button>
);

export default function ElizabethsRhythmBox() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const playSound = useCallback(async (instrument: string) => {
    try {
      console.log('Playing sound for:', instrument); // Debug log
      let audio = AUDIO_FILES.get(instrument);
      
      if (!audio) {
        console.log('Reloading audio for:', instrument); // Debug log
        preloadAudio(instrument);
        audio = AUDIO_FILES.get(instrument);
      }

      if (audio) {
        audio.volume = volume;
        audio.currentTime = 0; // Reinicia el sonido
        await audio.play();
        setActiveKey(instrument);
        setTimeout(() => setActiveKey(null), 300);
      } else {
        console.error('Audio not found for:', instrument);
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, [volume]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const instrument = INSTRUMENTS.find(i => i.key === event.key);
      if (instrument) {
        playSound(instrument.name);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [playSound]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-white mb-8 flex items-center gap-2">
        <Music /> 
        Elizabeth's Rhythm Box 
        <Heart className="text-red-300" />
      </h1>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        {INSTRUMENTS.map((instrument) => (
          <InstrumentButton 
            key={instrument.name} 
            instrument={instrument}
            isActive={activeKey === instrument.name}
            onPlay={playSound}
          />
        ))}
      </div>

      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-6 py-3 rounded-full text-xl font-bold text-white transition-colors duration-300 ${
            isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isPlaying ? 'Stop' : 'Play'}
        </button>

        <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
          <Volume2 className="text-white" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>

      <p className="text-white text-center text-lg">
        Press keys A-I on your keyboard or click the buttons to create your rhythm!
      </p>
    </div>
  );
=======
import React, { useState, useEffect, useCallback } from 'react';
import { Music, Volume2, Heart } from 'lucide-react';

interface InstrumentButtonProps {
  instrument: Instrument;
  isActive: boolean;
  onPlay: (name: string) => void;
}

type Instrument = {
  name: string;
  color: string;
  icon: string;
  key: string;
};

const INSTRUMENTS: Instrument[] = [
  { name: 'Kick', color: '#FF6B6B', icon: '🥁', key: 'a' },
  { name: 'Snare', color: '#4ECDC4', icon: '🔔', key: 'b' },
  { name: 'HiHat', color: '#45B7D1', icon: '🎶', key: 'c' },
  { name: 'Clap', color: '#FFA07A', icon: '👏', key: 'd' },
  { name: 'Crash', color: '#98D8C8', icon: '💥', key: 'e' },
  { name: 'Tom', color: '#F08A5D', icon: '🎵', key: 'f' },
  { name: 'Perc', color: '#F08A5D', icon: '🎚️', key: 'g' },
  { name: 'Cowbell', color: '#B83B5E', icon: '🐮', key: 'h' },
  { name: 'Synth', color: '#6A2C70', icon: '🎹', key: 'i' }
];

const AUDIO_FILES = new Map();

const preloadAudio = (instrument: string) => {
  const audio = new Audio(`/sounds/${instrument.toLowerCase()}.wav`);
  audio.preload = 'auto';
  AUDIO_FILES.set(instrument, audio);
};

// Precarga todos los sonidos
INSTRUMENTS.forEach(instrument => preloadAudio(instrument.name));

const InstrumentButton: React.FC<InstrumentButtonProps> = ({ instrument, isActive, onPlay }) => (
  <button
    className={`w-28 h-28 rounded-2xl shadow-lg flex flex-col items-center justify-center text-white font-bold text-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 active:scale-95 ${
      isActive ? 'animate-bounce-once' : ''
    }`}
    style={{ backgroundColor: instrument.color }}
    onClick={() => onPlay(instrument.name)}
  >
    <span className="text-3xl mb-2">{instrument.icon}</span>
    <span>{instrument.name}</span>
    <span className="text-sm opacity-75">({instrument.key})</span>
  </button>
);

export default function ElizabethsRhythmBox() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const playSound = useCallback(async (instrument: string) => {
    try {
      console.log('Playing sound for:', instrument); // Debug log
      let audio = AUDIO_FILES.get(instrument);
      
      if (!audio) {
        console.log('Reloading audio for:', instrument); // Debug log
        preloadAudio(instrument);
        audio = AUDIO_FILES.get(instrument);
      }

      if (audio) {
        audio.volume = volume;
        audio.currentTime = 0; // Reinicia el sonido
        await audio.play();
        setActiveKey(instrument);
        setTimeout(() => setActiveKey(null), 300);
      } else {
        console.error('Audio not found for:', instrument);
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, [volume]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const instrument = INSTRUMENTS.find(i => i.key === event.key);
      if (instrument) {
        playSound(instrument.name);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [playSound]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-white mb-8 flex items-center gap-2">
        <Music /> 
        Elizabeth's Rhythm Box 
        <Heart className="text-red-300" />
      </h1>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        {INSTRUMENTS.map((instrument) => (
          <InstrumentButton 
            key={instrument.name} 
            instrument={instrument}
            isActive={activeKey === instrument.name}
            onPlay={playSound}
          />
        ))}
      </div>

      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-6 py-3 rounded-full text-xl font-bold text-white transition-colors duration-300 ${
            isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isPlaying ? 'Stop' : 'Play'}
        </button>

        <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
          <Volume2 className="text-white" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>

      <p className="text-white text-center text-lg">
        Press keys A-I on your keyboard or click the buttons to create your rhythm!
      </p>
    </div>
  );
>>>>>>> f9d5a15c1619738b2959756be257a2c2bb4242dd
}