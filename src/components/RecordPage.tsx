
import React, { useState } from 'react';
import { Mic, MicOff, Save, RotateCcw } from 'lucide-react';

const RecordPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);

  const handleStartRecording = () => {
    setIsRecording(true);
    // Simulation d'enregistrement
    const timer = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

    // Arrêt automatique après 10 secondes pour la démo
    setTimeout(() => {
      setIsRecording(false);
      setRecordedText("J'ai fait 100 squats et 50 pompes ce matin");
      clearInterval(timer);
    }, 3000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordedText("J'ai fait 100 squats et 50 pompes ce matin");
  };

  const handleSave = () => {
    // Sauvegarder l'enregistrement
    const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    const newWorkout = {
      id: Date.now(),
      text: recordedText,
      date: new Date().toISOString(),
      exercises: [
        { name: 'Squats', reps: 100 },
        { name: 'Pompes', reps: 50 }
      ]
    };
    workouts.push(newWorkout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
    
    // Reset
    setRecordedText('');
    setRecordingTime(0);
  };

  const handleReset = () => {
    setRecordedText('');
    setRecordingTime(0);
    setIsRecording(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Enregistrer un exercice
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Appuyez sur le micro et décrivez votre séance
        </p>
      </div>

      {/* Bouton d'enregistrement */}
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <button
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            className={`
              w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
              ${isRecording 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600'
              }
            `}
          >
            {isRecording ? (
              <MicOff size={48} className="text-white" />
            ) : (
              <Mic size={48} className="text-white" />
            )}
          </button>
          
          {isRecording && (
            <div className="absolute -inset-4 border-4 border-red-500 rounded-full animate-ping opacity-75"></div>
          )}
        </div>

        {/* Timer */}
        {isRecording && (
          <div className="text-2xl font-mono font-bold text-red-500">
            {formatTime(recordingTime)}
          </div>
        )}

        {/* Status */}
        <p className="text-center text-gray-600 dark:text-gray-400">
          {isRecording ? (
            <span className="text-red-500 font-medium">🔴 Enregistrement en cours...</span>
          ) : recordedText ? (
            <span className="text-green-500 font-medium">✓ Enregistrement terminé</span>
          ) : (
            "Appuyez pour commencer"
          )}
        </p>
      </div>

      {/* Texte transcrit */}
      {recordedText && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Transcription :
          </h3>
          <p className="text-gray-700 dark:text-gray-300 italic">
            "{recordedText}"
          </p>
        </div>
      )}

      {/* Actions */}
      {recordedText && (
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-blue-500 to-orange-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-orange-600 transition-colors flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Sauvegarder
          </button>
          
          <button
            onClick={handleReset}
            className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      )}

      {/* Conseils */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          💡 Conseils d'utilisation
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Parlez clairement et proche du micro</li>
          <li>• Mentionnez le type d'exercice et le nombre</li>
          <li>• Exemple: "J'ai fait 50 squats et couru 3km"</li>
        </ul>
      </div>
    </div>
  );
};

export default RecordPage;
