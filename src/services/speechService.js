import usePosStore from "@/store/usePosStore";

const speechService = {
  /**
   * -------------------------------------------------------
   * Timeline + Voice Announcement
   * -------------------------------------------------------
   */
  announce({ timeline, speech = null, type = "info" }) {
    const store = usePosStore.getState();

    if (timeline) {
      store.addTimeline(timeline, type);
    }

    if (speech) {
      this.say(speech);
    }
  },

  /**
   * -------------------------------------------------------
   * Speak Plan Summary
   * -------------------------------------------------------
   */
  summarize(text) {
    this.say(text);
  },

  /**
   * -------------------------------------------------------
   * Speak Text
   * -------------------------------------------------------
   */
  say(text) {
    if (!text) return;

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    // Stop anything already speaking
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onstart = () => {
      usePosStore.getState().setIsSpeaking(true);
    };

    utterance.onend = () => {
      usePosStore.getState().setIsSpeaking(false);
    };

    utterance.onerror = () => {
      usePosStore.getState().setIsSpeaking(false);
    };

    // Voice Settings
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Pick an English voice if available
    const voices = window.speechSynthesis.getVoices();

    const preferredVoice =
      voices.find((voice) => voice.lang === "en-US") ||
      voices.find((voice) => voice.lang.startsWith("en")) ||
      voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  },

  /**
   * -------------------------------------------------------
   * Stop Current Speech
   * -------------------------------------------------------
   */
  stop() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    usePosStore.getState().setIsSpeaking(false);
  },

  /**
   * -------------------------------------------------------
   * Is Currently Speaking
   * -------------------------------------------------------
   */
  isSpeaking() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return false;
    }

    return window.speechSynthesis.speaking;
  },
};

export default speechService;
