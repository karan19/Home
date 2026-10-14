/**
 * Media Manager - Ensures only one audio and poster are active at a time
 * 
 * When a new interactive item is clicked:
 * 1. Stops any currently playing audio
 * 2. Dispatches event to close any open poster
 * 3. Starts the new audio
 * 4. Dispatches event to open the new poster
 */

class MediaManager {
  constructor() {
    this.currentAudio = null;
    this.currentPlayEvent = null;
    this.currentEndEvent = null;
  }

  // Silent SVG previews use the same ownership as audio, so another interaction closes them.
  preview(owner, playEvent, endEvent, duration = 12000) {
    this.stopCurrent();
    this.currentAudio = owner;
    this.currentPlayEvent = playEvent;
    this.currentEndEvent = endEvent;
    this.previewTimer = setTimeout(() => this.stopCurrent(), duration);
    window.dispatchEvent(new CustomEvent(playEvent, { detail: true }));
    return true;
  }

  /**
   * Play audio and show poster, stopping any previous media first
   * @param {HTMLAudioElement} audioElement - The audio element to play
   * @param {string} playEvent - Event name to dispatch when playing starts
   * @param {string} endEvent - Event name to dispatch when playing ends
   */
  async play(audioElement, playEvent, endEvent) {
    // Stop any currently playing audio and close its poster
    this.stopCurrent();

    // Set new current audio
    this.currentAudio = audioElement;
    this.currentPlayEvent = playEvent;
    this.currentEndEvent = endEvent;

    // Play the new audio
    try {
      await audioElement.play();
      // Dispatch event to show the poster
      window.dispatchEvent(new CustomEvent(playEvent, { detail: true }));
      return true;
    } catch (error) {
      console.log('Audio play interrupted:', error);
      this.currentAudio = null;
      this.currentPlayEvent = null;
      this.currentEndEvent = null;
      return false;
    }
  }

  /**
   * Stop currently playing audio and close its poster
   */
  stopCurrent() {
    clearTimeout(this.previewTimer);
    this.previewTimer = null;
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      if (this.currentEndEvent) {
        window.dispatchEvent(new CustomEvent(this.currentEndEvent, { detail: false }));
      }
    }

    this.currentAudio = null;
    this.currentPlayEvent = null;
    this.currentEndEvent = null;
  }

  /**
   * Check if a specific audio is currently playing
   * @param {HTMLAudioElement} audioElement
   * @returns {boolean}
   */
  isPlaying(audioElement) {
    return this.currentAudio === audioElement && (Boolean(this.previewTimer) || !audioElement.paused);
  }

  /**
   * Toggle audio playback (play if paused, stop if playing)
   * @param {HTMLAudioElement} audioElement
   * @param {string} playEvent
   * @param {string} endEvent
   */
  async toggle(audioElement, playEvent, endEvent) {
    if (this.isPlaying(audioElement)) {
      // Stop this audio
      this.stopCurrent();
    } else {
      // Play this audio (will stop any other playing audio first)
      await this.play(audioElement, playEvent, endEvent);
    }
  }
}

// Export singleton instance
export const mediaManager = new MediaManager();
