
import React from 'react';
import { Calendar, TrendingUp, Target, Zap } from 'lucide-react';

interface HomePageProps {
  onStartRecording: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartRecording }) => {
  const todayStats = {
    exercises: 3,
    duration: 45,
    calories: 320,
    streak: 7
  };

  const recentWorkouts = [
    { time: '14:30', exercise: '100 squats', duration: '5 min' },
    { time: '09:15', exercise: '50 pompes', duration: '3 min' },
    { time: '08:00', exercise: 'Course 5km', duration: '25 min' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-orange-500 text-white p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-2">Bonjour ! 👋</h2>
        <p className="opacity-90">Prêt pour une nouvelle séance ?</p>
        
        <button
          onClick={onStartRecording}
          className="mt-4 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          <Zap size={20} />
          Enregistrer un exercice
        </button>
      </div>

      {/* Stats du jour */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Target size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{todayStats.exercises}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Exercices</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <TrendingUp size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{todayStats.duration}min</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Durée</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Zap size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{todayStats.calories}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Calories</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Calendar size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{todayStats.streak}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Jours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activités récentes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Aujourd'hui</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentWorkouts.map((workout, index) => (
            <div key={index} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{workout.exercise}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{workout.time}</p>
              </div>
              <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 px-2 py-1 rounded-full">
                {workout.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
