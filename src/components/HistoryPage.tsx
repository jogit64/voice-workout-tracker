
import React, { useState, useEffect } from 'react';
import { Calendar, Filter, TrendingUp } from 'lucide-react';

interface Workout {
  id: number;
  text: string;
  date: string;
  exercises: Array<{ name: string; reps: number }>;
}

const HistoryPage: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    setWorkouts(savedWorkouts);
  }, []);

  const groupWorkoutsByDate = (workouts: Workout[]) => {
    const groups: { [key: string]: Workout[] } = {};
    workouts.forEach(workout => {
      const date = new Date(workout.date).toLocaleDateString('fr-FR');
      if (!groups[date]) groups[date] = [];
      groups[date].push(workout);
    });
    return groups;
  };

  const getExerciseStats = () => {
    const stats: { [key: string]: number } = {};
    workouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        stats[exercise.name] = (stats[exercise.name] || 0) + exercise.reps;
      });
    });
    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  };

  const groupedWorkouts = groupWorkoutsByDate(workouts);
  const exerciseStats = getExerciseStats();
  const dates = Object.keys(groupedWorkouts).sort((a, b) => 
    new Date(b.split('/').reverse().join('-')).getTime() - 
    new Date(a.split('/').reverse().join('-')).getTime()
  );

  if (workouts.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Aucun historique
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Vos enregistrements d'exercices apparaîtront ici
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="bg-gradient-to-r from-blue-500 to-orange-500 text-white p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={24} />
          <h2 className="text-xl font-bold">Statistiques</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold">{workouts.length}</p>
            <p className="opacity-90 text-sm">Séances total</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{exerciseStats.length}</p>
            <p className="opacity-90 text-sm">Types d'exercices</p>
          </div>
        </div>
      </div>

      {/* Top exercices */}
      {exerciseStats.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Top exercices</h3>
          </div>
          <div className="p-4 space-y-3">
            {exerciseStats.slice(0, 3).map(([exercise, total], index) => (
              <div key={exercise} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold
                    ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'}
                  `}>
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">{exercise}</span>
                </div>
                <span className="text-blue-600 font-semibold">{total}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historique par date */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">Historique</h3>
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-500">
            <Filter size={20} />
          </button>
        </div>

        {dates.map(date => (
          <div key={date} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-white">{date}</h4>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {groupedWorkouts[date].map(workout => (
                <div key={workout.id} className="p-4">
                  <p className="text-gray-700 dark:text-gray-300 mb-2 italic">
                    "{workout.text}"
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {workout.exercises.map((exercise, index) => (
                      <span
                        key={index}
                        className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 px-2 py-1 rounded-full text-sm"
                      >
                        {exercise.name}: {exercise.reps}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {new Date(workout.date).toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
