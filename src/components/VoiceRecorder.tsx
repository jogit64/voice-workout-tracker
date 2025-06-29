import { useEffect, useState } from "react";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

export default function VoiceRecorder({
  onValidate,
}: {
  onValidate: (text: string) => void;
}) {
  const [available, setAvailable] = useState(false);
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);

  useEffect(() => {
    const check = async () => {
      const hasPerm = await SpeechRecognition.hasPermission();
      if (!hasPerm.permissionGranted) {
        await SpeechRecognition.requestPermission();
      }
      const avail = await SpeechRecognition.available();
      setAvailable(avail.available);
    };
    check();
  }, []);

  const startRecording = async () => {
    setTranscript(null);
    setRecording(true);
    await SpeechRecognition.start({
      language: "fr-FR",
      popup: false,
      maxResults: 1,
      partialResults: false,
    });

    SpeechRecognition.addListener("speechRecognitionResult", (result) => {
      if (result.matches && result.matches.length > 0) {
        setTranscript(result.matches[0]);
        setRecording(false);
      }
    });

    SpeechRecognition.addListener("speechRecognitionError", (err) => {
      console.error("Speech error", err);
      setRecording(false);
    });
  };

  const stopRecording = async () => {
    await SpeechRecognition.stop();
    setRecording(false);
  };

  return (
    <div className="p-4 space-y-4">
      {!available && (
        <p className="text-red-500">Reconnaissance vocale non disponible.</p>
      )}

      <button
        className="px-4 py-2 rounded-full bg-blue-600 text-white"
        onClick={recording ? stopRecording : startRecording}
      >
        {recording ? "🛑 Stop" : "🎙️ Démarrer"}
      </button>

      {transcript && (
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-sm text-gray-600 mb-2">Texte reconnu :</p>
          <p className="font-semibold">{transcript}</p>
          <button
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
            onClick={() => onValidate(transcript)}
          >
            ✅ Valider
          </button>
        </div>
      )}
    </div>
  );
}
