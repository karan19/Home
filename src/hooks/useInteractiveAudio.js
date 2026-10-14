import { useCallback, useEffect, useRef } from 'react';
import { getFeatureConfig, getRandomAudioFile } from '../config/interactiveFeatures';
import { mediaManager } from '../utils/mediaManager';

export function useInteractiveAudio(featureName) {
  const config = getFeatureConfig(featureName);
  const audioRef = useRef(null);

  const setRandomAudioSource = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const randomSrc = getRandomAudioFile(featureName);
    if (!randomSrc) return;

    const absoluteNext = new URL(randomSrc, window.location.origin).href;
    if (audio.src !== absoluteNext) {
      audio.src = randomSrc;
      audio.load();
    }
  }, [featureName]);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = false;
    audioRef.current = audio;
    setRandomAudioSource();

    const handleEnded = () => {
      window.dispatchEvent(new CustomEvent(config.audio.endEvent, { detail: false }));
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.currentTime = 0;

      if (mediaManager.currentAudio === audio) {
        mediaManager.stopCurrent();
      }

      audioRef.current = null;
    };
  }, [config.audio.endEvent, setRandomAudioSource]);

  const isPlaying = useCallback(() => {
    return audioRef.current ? mediaManager.isPlaying(audioRef.current) : false;
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    if (mediaManager.isPlaying(audio)) {
      mediaManager.stopCurrent();
      return false;
    }

    setRandomAudioSource();
    return mediaManager.play(audio, config.audio.playEvent, config.audio.endEvent);
  }, [config.audio.endEvent, config.audio.playEvent, setRandomAudioSource]);

  return {
    config,
    isPlaying,
    toggle
  };
}
