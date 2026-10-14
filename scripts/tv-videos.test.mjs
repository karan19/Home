import test from 'node:test';import assert from 'node:assert/strict';
import {chooseTVVideo,fitTVVideo,TV_VIDEOS} from '../src/config/tvVideos.js';
test('empty TV library waits for supplied videos',()=>{assert.equal(chooseTVVideo([],null),null);});
test('remote supports one video and avoids immediate repeats with several',()=>{
 const videos=[{src:'/a.mp4'},{src:'/b.mp4'},{src:'/c.mp4'}];
 assert.equal(chooseTVVideo(videos.slice(0,1),'/a.mp4').src,'/a.mp4');
 assert.equal(chooseTVVideo(videos,'/a.mp4',()=>0).src,'/b.mp4');
});
test('portrait and ultrawide videos stay inside the TV without distortion',()=>{
 for(const [w,h]of [[9,16],[16,9],[21,9]]){const [x,y]=fitTVVideo(1.125,.625,w,h);assert(x<=1.125&&y<=.625);assert(Math.abs(x/y-w/h)<1e-10);}
});

test('only the five latest videos are available',()=>{assert.deepEqual(TV_VIDEOS.map(v=>v.src),[1,2,3,4,5].map(i=>`/videos/tv/latest-${i}.mp4`));});
