/**
 * Roof Videos Configuration
 * 
 * Array of video files that can be displayed on the roof
 * A random video is selected on each page load
 */

const videoModules = import.meta.glob('../assets/roofVideos/*.{mp4,MP4,webm,WEBM,mov,MOV}', {
  eager: true,
  import: 'default'
});

const AUTO_DISCOVERED_VIDEOS = Object.values(videoModules).filter(Boolean);

const FALLBACK_VIDEOS = [
  new URL('../assets/roofVideos/Animation3.mp4', import.meta.url).href
];

export const ROOF_VIDEOS = AUTO_DISCOVERED_VIDEOS.length
  ? AUTO_DISCOVERED_VIDEOS
  : FALLBACK_VIDEOS;

/**
 * Select a random video from the array
 * @returns {string} Path to randomly selected video
 */
export const getRandomVideo = () => {
  const randomIndex = Math.floor(Math.random() * ROOF_VIDEOS.length);
  return ROOF_VIDEOS[randomIndex];
};

/**
 * Get video by index (for testing or specific selection)
 * @param {number} index - Index of video to get
 * @returns {string} Path to video
 */
export const getVideoByIndex = (index) => {
  if (index >= 0 && index < ROOF_VIDEOS.length) {
    return ROOF_VIDEOS[index];
  }
  return ROOF_VIDEOS[0]; // Default to first video
};

/**
 * Get total number of available videos
 * @returns {number} Number of videos
 */
export const getVideoCount = () => {
  return ROOF_VIDEOS.length;
};
