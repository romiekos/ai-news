"use client";

import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

import Room from "./room/Room";
import Bot from "./bot/Bot";
import Transition from "./room/Transition";
import { Preview } from "@/app/components/Preview";

import { useArticles } from "@/app/hooks/useArticles";
import { useTalk } from "@/app/hooks/useTalk";

export default function Studio() {
  const [userGesture, setUserGesture] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const {
    articles,
    activeArticle,
    areArticlesLoading,
    updateArticleAudioById,
    setNextActiveArticle,
  } = useArticles();

  const playTransitionSound = () => {
    const audio = new Audio("/assets/sounds/transition.mp3");
    audio.play();
  };

  const debouncedSetNextActiveArticle = debounce(() => {
    playTransitionSound();
    setTransitioning(true);
    setTimeout(() => {
      setNextActiveArticle();
    }, 1400);
    setTimeout(() => {
      setTransitioning(false);
    }, 3200);
  }, 500);

  const [showSmile, setShowSmile] = useState(true)
  const onArticleTalkEnd = useCallback(() => {
    setShowSmile(true)
    debouncedSetNextActiveArticle();
  }, [debouncedSetNextActiveArticle]);

  const { startTalking, fetchVoice, isTalking, audioNode } =
    useTalk(onArticleTalkEnd);

  const speak = useCallback(async () => {
    if (!activeArticle || isTalking.current) return;
    if (!activeArticle.audio) {
      const text =
        process.env.NODE_ENV === "development"
          ? "test this thing for audio check"
          : activeArticle.summary;

      const audioFile = await fetchVoice(text);
      if (audioFile) {
        activeArticle.audio = audioFile;
        updateArticleAudioById(activeArticle.uuid, audioFile);
        setShowSmile(false)
        startTalking(audioFile);
      }
    } else {
      setShowSmile(false)
      startTalking(activeArticle.audio);
    }
  }, [activeArticle, updateArticleAudioById, startTalking, fetchVoice]);

  useEffect(() => {
    if (!userGesture) return;
    setTimeout(() => {
      if (process.env.NODE_ENV === "development") {
        // debouncedSetNextActiveArticle();
        // speak();
        // setTimeout(() => {
        //   debouncedSetNextActiveArticle();
        // }, 2000);
      } else {
        speak();
      }
    }, 1000);
  }, [activeArticle, userGesture]);

  return (
    <div>
      <Room articles={articles} activeArticle={activeArticle} />
      <Bot isTalking={!showSmile} audioNode={audioNode} />

      {!userGesture ? (
        <div onClick={() => setUserGesture(true)}>
          <Preview />
        </div>
      ) : null}

      {transitioning || areArticlesLoading ? <Transition persist={areArticlesLoading} /> : null}
    </div>
  );
}
