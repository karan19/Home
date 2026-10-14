// Selected Desktop videos, normalized to H.264/AAC for TV playback.
export const TV_VIDEOS = [
 { title: 'Video 1', src: '/videos/tv/latest-1.mp4' },
 { title: 'Video 2', src: '/videos/tv/latest-2.mp4' },
 { title: 'Video 3', src: '/videos/tv/latest-3.mp4' },
 { title: 'Video 4', src: '/videos/tv/latest-4.mp4' },
 { title: 'Video 5', src: '/videos/tv/latest-5.mp4' },
];

export function chooseTVVideo(videos,currentSrc,random=Math.random){
 if(!videos.length)return null;
 const alternatives=videos.filter(video=>video.src!==currentSrc);
 const choices=alternatives.length?alternatives:videos;
 return choices[Math.min(choices.length-1,Math.floor(random()*choices.length))];
}
export function fitTVVideo(width,height,videoWidth,videoHeight){
 const ratio=videoWidth>0&&videoHeight>0?videoWidth/videoHeight:width/height;
 return ratio>width/height?[width,width/ratio]:[height*ratio,height];
}
