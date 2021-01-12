import audioCtx from './audioContext';

let startTime = 0;
// USER UPDATE VALUES
let padMap: any = [];
let tempo = 60;

// RESET WHEN STARTING
let currentNote = 0;
let nextNoteTime = 0.0; // when the next note is due.

let lookahead = 8.0;
let scheduleAheadTime = 0.120;

export const nextNote = () => {
  const secondsPerBeat = 60.0 / tempo;
  // Add beat length to last beat time
  nextNoteTime += secondsPerBeat;
  // Advance the beat number, wrap to zero
  currentNote++;
  if (currentNote === 4) {
    currentNote = 0;
  }
}

export const notesInQueue: any = [];

function scheduleNote(beatNumber: number, time: number) {
  console.log(new Date().getTime() / 1000, 'beatNumber ', beatNumber, 'time ', time);
  // push the note on the queue, even if we're not playing.
  notesInQueue.push({ note: beatNumber, time: time });
}

let timerID: number | undefined;
export const scheduler = () => {
  let currentTime = audioCtx.currentTime;
  currentTime -= startTime;
  // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
  while (nextNoteTime < currentTime + scheduleAheadTime) {
    // Convert noteTime to context time.
    scheduleNote(currentNote, nextNoteTime);
    nextNote();
  }
  timerID = window.setTimeout(scheduler, lookahead);
}

// UPDATE VALUES
export const resetCounters = () => {
  nextNoteTime = 0.0;
  startTime = audioCtx.currentTime + 0.200;
};

export const stop = () => {
  currentNote = 0;
  window.clearTimeout(timerID);
}

export const updatePadMap = (map: any) => padMap = map;

export const updateTempo = (bpm: number) => tempo = bpm;