import { toast } from "sonner";

const SpeechRecognitionAPI =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const speechRecognition = new SpeechRecognitionAPI();

const isSpeechRecognitionAvailable = () =>
  "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

export default {
  setup: () => {
    if (!isSpeechRecognitionAvailable()) {
      toast.info("SpeechRecognition API not available");
      return null;
    }
    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    return speechRecognition;
  },
  start: () => {
    if (!speechRecognition) {
      toast.error("SpeechRecognition API not available");
      return;
    }

    speechRecognition.start();
  },
  stop: () => {
    if (speechRecognition) {
      speechRecognition.stop();
    }
  },
};
