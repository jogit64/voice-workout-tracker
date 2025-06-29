import React, { useState } from "react";
import { Mic } from "lucide-react";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { Capacitor } from "@capacitor/core";

const RecordPage: React.FC = () => {
  const [recordedText, setRecordedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleStart = async () => {
    setIsRecording(true);
    setRecordedText("");

    try {
      await SpeechRecognition.start({
        language: "fr-FR",
        popup: true,
        partialResults: false,
        maxResults: 1,
      });

      SpeechRecognition.addListener("speechRecognitionResult", (result) => {
        if (result.matches && result.matches.length > 0) {
          setRecordedText(result.matches[0]);
        }
        setIsRecording(false);
      });

      SpeechRecognition.addListener("speechRecognitionError", (err) => {
        console.error("Erreur vocale :", err);
        setIsRecording(false);
      });
    } catch (err) {
      console.error("Erreur démarrage micro :", err);
      setIsRecording(false);
    }
  };

  const handleSave = () => {
    const workouts = JSON.parse(localStorage.getItem("workouts") || "[]");
    const newWorkout = {
      id: Date.now(),
      text: recordedText,
      date: new Date().toISOString(),
    };
    workouts.push(newWorkout);
    localStorage.setItem("workouts", JSON.stringify(workouts));
    setRecordedText("");
  };

  return (
    <div className="space-y-6 p-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Enregistrer un exercice
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Appuyez sur le micro et décrivez votre séance
        </p>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <button
          onClick={handleStart}
          className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white flex items-center justify-center shadow-lg"
        >
          <Mic size={48} />
        </button>

        <p className="text-center text-gray-600 dark:text-gray-400">
          {isRecording
            ? "🔴 Enregistrement en cours..."
            : recordedText
            ? "✓ Enregistrement terminé"
            : "Appuyez pour commencer"}
        </p>
      </div>

      {recordedText && (
        <>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Transcription :
            </h3>
            <p className="text-gray-700 dark:text-gray-300 italic">
              "{recordedText}"
            </p>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-blue-500 to-orange-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-orange-600 transition-colors flex items-center justify-center gap-2"
          >
            Sauvegarder
          </button>
        </>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          💡 Conseils d'utilisation
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Parlez clairement et proche du micro</li>
          <li>• Mentionnez le type d'exercice et le nombre</li>
          <li>• Exemple : "J'ai fait 50 squats et couru 3km"</li>
        </ul>
      </div>
    </div>
  );
};

export default RecordPage;
