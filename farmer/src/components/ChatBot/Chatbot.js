import React, { useState, useRef, useEffect } from "react";
import baseUiText from "./baseUiText "; // make sure no extra space
import { getBotReply } from "./api";

function Chatbot({ language: initialLanguage = "en" }) {
  const [language, setLanguage] = useState(initialLanguage);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => setLanguage(initialLanguage), [initialLanguage]);

  // ---- VOICE INPUT ----
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang =
        language === "en"
          ? "en-US"
          : language === "hi"
          ? "hi-IN"
          : language === "mr"
          ? "mr-IN"
          : "or-IN";
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        setInput(event.results[0][0].transcript);
      };
      recognitionRef.current = recognition;
    }
  }, [language]);

  const startVoiceInput = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current.start();
    }
  };

  // ---- TEXT TO SPEECH ----
  const speak = (text) => {
    if (!text || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel(); // stop ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);

    // Get available voices
    const voices = window.speechSynthesis.getVoices();

    // Select voice based on language
    let voice = null;
    if (language === "en") {
      voice = voices.find((v) => v.lang.startsWith("en")) || null;
      utterance.lang = "en-US";
    } else if (language === "hi") {
      voice = voices.find((v) => v.lang.startsWith("hi")) || null;
      utterance.lang = "hi-IN";
    } else if (language === "mr") {
      // Fallback to Hindi if Marathi voice not available
      voice = voices.find((v) => v.lang.startsWith("mr")) || voices.find((v) => v.lang.startsWith("hi"));
      utterance.lang = "mr-IN";
    } else {
      voice = voices.find((v) => v.lang.startsWith("or")) || null;
      utterance.lang = "or-IN";
    }

    if (voice) utterance.voice = voice;

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  // ---- SEND MESSAGE ----
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Show typing indicator
    setMessages((prev) => [...prev, { sender: "bot", text: "⏳ Thinking..." }]);

    try {
      const reply = await getBotReply(input, language);

      // Replace placeholder with actual reply
      setMessages((prev) => {
        const newMessages = prev.filter((m) => m.text !== "⏳ Thinking...");
        return [...newMessages, { sender: "bot", text: reply }];
      });

      speak(reply); // Speak bot reply
    } catch (err) {
      setMessages((prev) => {
        const newMessages = prev.filter((m) => m.text !== "⏳ Thinking...");
        return [...newMessages, { sender: "bot", text: "⚠️ Sorry, something went wrong!" }];
      });
      speak("Sorry, something went wrong!");
    }
  };

  // ---- INLINE STYLES ----
  const styles = {
    wrapper: { position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 },
    toggleBtn: {
      background: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "65px",
      height: "65px",
      fontSize: "26px",
      cursor: "pointer",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
    },
    container: {
      width: "400px",
      height: "550px",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      background: "white",
      boxShadow: "0px 6px 16px rgba(0,0,0,0.3)",
    },
    header: {
      background: "#4caf50",
      color: "white",
      padding: "12px",
      fontSize: "18px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    chatBox: {
      flex: 1,
      padding: "12px",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      background: "#f9f9f9",
    },
    inputArea: {
      display: "flex",
      padding: "10px",
      gap: "8px",
      borderTop: "1px solid #ddd",
      background: "#fff",
    },
    input: { flex: 1, padding: "10px", border: "1px solid #ddd", borderRadius: "8px" },
    btn: {
      padding: "10px 14px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      background: "#4caf50",
      color: "white",
    },
    messageUser: { background: "#d1e7dd", alignSelf: "flex-end", padding: "8px 12px", borderRadius: "10px", margin: "4px 0" },
    messageBot: { background: "#fff3cd", alignSelf: "flex-start", padding: "8px 12px", borderRadius: "10px", margin: "4px 0" },
  };

  return (
    <div style={styles.wrapper}>
      {!isOpen && <button style={styles.toggleBtn} onClick={() => setIsOpen(true)}>💬</button>}

      {isOpen && (
        <div style={styles.container}>
          <div style={styles.header}>
            {baseUiText[language].header}
            <button
              style={{ background: "transparent", border: "none", color: "white", fontSize: "20px", cursor: "pointer" }}
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
          </div>

          <div style={styles.chatBox}>
            {messages.map((msg, idx) => (
              <div key={idx} style={msg.sender === "user" ? styles.messageUser : styles.messageBot}>
                {msg.text}
              </div>
            ))}
          </div>

          <div style={styles.inputArea}>
            <input
              style={styles.input}
              type="text"
              placeholder={baseUiText[language].placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button style={styles.btn} onClick={sendMessage}>{baseUiText[language].send}</button>
            <button style={styles.btn} onClick={startVoiceInput}>🎤 {baseUiText[language].voice}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
