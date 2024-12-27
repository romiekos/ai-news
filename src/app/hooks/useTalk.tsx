"use client";
import { useState, useEffect, useRef } from "react";

export function useTalk(onEnd?: () => void) {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioNode, setAudioNode] = useState<AudioNode | null>(null);
  const isTalking = useRef(false);

  const blobToBuffer = async (audioBlob: Blob): Promise<AudioBuffer> => {
    if (!audioContext) throw new Error("Audio context is not initialized");
    const arrayBuffer = await audioBlob.arrayBuffer();
    return await audioContext.decodeAudioData(arrayBuffer);
  };

  const startTalking = async (audioBlob: Blob) => {
    if (!audioContext) throw new Error("Audio context is not initialized");
    if (isTalking.current || !audioBlob.size) return;
    isTalking.current = true;
    try {
      const audioBuffer = await blobToBuffer(audioBlob);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);

      setAudioNode(source);

      source.onended = () => {
        isTalking.current = false;
        onEnd?.();
      };

      source.start();
    } catch (error) {
      console.error("Error playing audio:", error);
      isTalking.current = false;
    }
  };

  const stopTalking = () => {
    isTalking.current = false;
  };

  const fetchVoice = async (text: string) => {
    const response = await fetch(`/api/voice`, {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    const audioFile = await response.blob();
    try {
      startTalking(audioFile);
      return audioFile;
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  useEffect(() => {
    const audioContext = new AudioContext();
    setAudioContext(audioContext);
  }, []);

  return { isTalking, audioNode, startTalking, stopTalking, fetchVoice };
}
