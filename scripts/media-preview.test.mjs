import test from 'node:test';
import assert from 'node:assert/strict';
import { mediaManager } from '../src/utils/mediaManager.js';

test('silent portraits toggle, expire, and yield ownership to audio', async () => {
  const events = [];
  globalThis.window = {dispatchEvent: e => events.push([e.type,e.detail])};
  const owner = {paused:true,pause(){this.paused=true;},currentTime:0};
  mediaManager.preview(owner,'sachinPlaying','sachinPlaying',20);
  assert.equal(mediaManager.isPlaying(owner),true);
  await new Promise(resolve=>setTimeout(resolve,35));
  assert.equal(mediaManager.isPlaying(owner),false);
  assert.deepEqual(events,[['sachinPlaying',true],['sachinPlaying',false]]);
  mediaManager.preview(owner,'federerPlaying','federerPlaying');
  const audio = {...owner,async play(){this.paused=false;}};
  await mediaManager.play(audio,'tvPlaying','tvPlaying');
  assert.equal(mediaManager.isPlaying(audio),true);
  assert.deepEqual(events.slice(-2),[['federerPlaying',false],['tvPlaying',true]]);
  mediaManager.stopCurrent();
  delete globalThis.window;
});
