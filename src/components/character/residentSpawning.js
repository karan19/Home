import {FORM_MS,DISSOLVE_MS} from './residentFormation.js';
export const SPAWN_LOCATIONS = ['sofa', 'desk', 'reading', 'bookshelf', 'stairs', 'dips', 'boxing', 'coffee', 'cooking', 'island', 'meditation'];
export const RESIDENT_STAY_MS = 5000;
export const RESIDENT_GAP_MS = 250;

export function nextResidentLocation(current, random = Math.random) {
 const choices = SPAWN_LOCATIONS.filter(location => location !== current);
 return choices[Math.min(choices.length - 1, Math.floor(random() * choices.length))];
}

// A cancellable single visit; React starts the next visit once its pose changes.
export function scheduleResidentVisit(current, onDisappear, onSpawn, {
 schedule = setTimeout, cancel = clearTimeout, random = Math.random,
} = {}) {
 let stopped = false, arrival;
 const departure = schedule(() => {
  if(stopped)return;
  onDisappear();
  arrival = schedule(() => {
   if(!stopped)onSpawn(nextResidentLocation(current, random));
  }, DISSOLVE_MS + RESIDENT_GAP_MS);
 }, FORM_MS + RESIDENT_STAY_MS);
 return () => { stopped = true; cancel(departure); if(arrival !== undefined)cancel(arrival); };
}
