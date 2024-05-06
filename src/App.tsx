"use client";
import audio_file from "./sounds/cry.mp3";
import { useState, useEffect, useRef } from "react";

 const phrases = [
      "No",
      "Are you sure?",
      "What if I asked really nicely?",
      "Pretty please",
      "PLEASE ..",
      "But :*(",
      "I am going to die",
      "Yep im dead",
      "ok ur talking to my ghost",
      "please .........................",
      ":((((",
      "No, but you can try again later!",
      "Are you sure you can handle my cuteness?",
      "What if I said yes to your cute face?",
      "Pretty please... with a cherry on top?",
      "PLEASE .. don't make me blush too much!",
      "But :*( I can't resist your charm!",
      "I am going to die of adorableness!",
      "Yep I'm melting... like ice cream in the sun!",
      "OK, you win... for now!",
      "Pleaseeeeeeeeee?",
      ":( But I'll still give you a hug!",
      "PRETTY PLEASE with sprinkles on top?",
      "Estoy muerto de amor!",
      "No, but my heart says otherwise!",
  ];

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState<boolean>(false);
  const [noButtonText, setNoButtonText] = useState<string>(phrases[0]);
  const yesButtonSize = noCount * 20 + 16;
  const [_, setMessage] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    
    const playAudio = () => {
      if (audioRef.current) {
        const audio = audioRef.current;
        audio.play().catch(error => {
          console.error('Autoplay failed:', error);
        });
      }
    };

    const documentHasInteracted = () => {
      return ['mousedown', 'keydown', 'touchstart', 'wheel'].some(eventType =>
        document.body.classList.contains(eventType)
      );
    };

    if (documentHasInteracted()) {
      playAudio();
    } else {
      const firstInteractionHandler = () => {
        document.body.removeEventListener('mousedown', firstInteractionHandler);
        playAudio();
      };
      document.body.addEventListener('mousedown', firstInteractionHandler);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []); 


  const handleYesClick = () => {
    setYesPressed(true);
    setMessage("Yes");
  }

   const handleNoClick = () => {
    setNoCount(noCount + 1);
    setMessage("No");
    setNoButtonText(phrases[noCount % phrases.length]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-300 to-purple-400">
      <audio ref={audioRef} src={audio_file} autoPlay /> {/* Added autoPlay for mobile */}
      {yesPressed ? (
        <>
          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="Kissing bears" className="h-48" />
          <div className="my-4 text-2xl md:text-4xl font-bold text-white">WOOOOOO!!!!! ;))</div>
        </>
      ) : (
        <>
          <img
            className="h-48 mb-4"
            src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
            alt="Bears with roses"
          />
          <h1 className="my-4 text-2xl md:text-4xl font-bold text-white">Will you be mine forever?</h1>
          <div className="flex flex-col md:flex-row items-center">
            <button
              className={`mb-2 md:mb-0 mr-0 md:mr-4 rounded bg-pink-500 px-4 py-2 font-bold text-white hover:bg-pink-700`}
              style={{ fontSize: yesButtonSize }}
              onClick={handleYesClick}
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
            >
              {noButtonText}
            </button>
          </div>
        </>
      )}
    </div>
  );
}