import { useEffect, useState, useRef } from "react";
import AudioMotionAnalyzer from "audiomotion-analyzer";

const WIDTH = 160;
const HEIGHT = 60;

export default function Mouth({
  isTalking,
  audioNode,
}: {
  isTalking: boolean;
  audioNode: AudioNode | null;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [audioMotionAnalyzer, setAudioMotionAnalyzer] =
    useState<AudioMotionAnalyzer | null>(null);
  const isInitiated = useRef(false);
  useEffect(() => {
    if (!canvasRef.current || !audioNode) return;
    if (audioMotionAnalyzer) {
      audioMotionAnalyzer.connectedSources.forEach((source) => {
        audioMotionAnalyzer.disconnectInput(source);
      });
      audioMotionAnalyzer.connectInput(audioNode);
      return;
    }

    if (isInitiated.current) return;
    isInitiated.current = true;
    const audioMotion = new AudioMotionAnalyzer(canvasRef.current, {
      source: audioNode,
      width: WIDTH,
      height: HEIGHT,
      ansiBands: false,
      showScaleX: false,
      bgAlpha: 0,
      overlay: true,
      mode: 10,
      channelLayout: "single",
      splitGradient: true,
      gradient: "steelblue",
      fillAlpha: 1,
      lineWidth: 3,
      mirror: -1,
      radial: false,
      reflexAlpha: 1,
      reflexBright: 1,
      reflexRatio: 0.5,
      showPeaks: false,
    });
    setAudioMotionAnalyzer(audioMotion);
  }, [audioNode]);

  return (
    <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/3 z-50 rounded-full w-[160px]">
      <div
        style={{ filter: "contrast(10) brightness(0.7) hue-rotate(25deg)" }}
        className={`w-[160px] mt-6 ${!isTalking ? "opacity-0" : ""}`}
        ref={canvasRef}
      ></div>
      <img
        src="/assets/bot/mouth/smile.svg"
        alt="mouth"
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 translate-y-1/2 w-[160px] ${
          isTalking ? "opacity-0" : ""
        }`}
      />
    </div>
  );
}
