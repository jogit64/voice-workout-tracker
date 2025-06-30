import React, { useState } from "react";
import { Mic } from "lucide-react";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

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

      // ✅ Remplacement correct de l'event
      SpeechRecognition.addListener("partialResults", (result) => {
        if (result.matches && result.matches.length > 0) {
          setRecordedText(result.matches[0]);
        }
        setIsRecording(false);
      });

      // ❌ L'ancien listener "speechRecognitionError" est invalide
      // Tu peux le retirer ou écouter "listeningState" si besoin

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
    <div className="min-h-full flex flex-col justify-between p-6">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Enregistrer un exercice
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-sm">
            Appuyez sur le micro pour décrire votre séance d'entraînement
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handleStart}
            disabled={isRecording}
            className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 disabled:opacity-70 text-white flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Mic size={32} />
          </button>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400 max-w-xs">
            {isRecording
              ? "Popup d'enregistrement ouvert..."
              : "Touchez pour commencer"}
          </p>
        </div>

        {recordedText && (
          <div className="w-full max-w-sm space-y-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-start space-x-2 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                  Transcription détectée
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                "{recordedText}"
              </p>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-blue-500 to-orange-500 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-orange-600 transition-all duration-200 active:scale-95 shadow-sm"
            >
              Sauvegarder la séance
            </button>
          </div>
        )}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800/30">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 text-lg flex-shrink-0">💡</div>
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 text-sm">
              Conseils d'utilisation
            </h4>
            <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1.5 leading-relaxed">
              <li>• Parlez clairement après le clic</li>
              <li>• Mentionnez le type et la quantité</li>
              <li>• Exemple : "J'ai fait 50 squats et couru 3km"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordPage;
