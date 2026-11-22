'use strict';

const INTERACTION_EFFECTS={
  stone:{notes:[170,112],duration:.09,spacing:.03,volume:.034,wave:'triangle'},
  capture:{notes:[330,262,196],duration:.13,spacing:.045,volume:.024,wave:'triangle'},
  pass:{notes:[440,392],duration:.14,spacing:.075,volume:.02},
  select:{notes:[630],duration:.09,spacing:.05,volume:.018},
  swap:{notes:[520,690],duration:.12,spacing:.055,volume:.022,wave:'triangle'},
  found:{notes:[659,880,1175],duration:.14,spacing:.07,volume:.025},
  unlock:{notes:[523,659,784,1047,1319],duration:.25,spacing:.10,volume:.027},
  card:{notes:[622,830,1109],duration:.19,spacing:.08,volume:.022},
  door:{notes:[294,392,523],duration:.17,spacing:.07,volume:.024,wave:'triangle'},
  step:{notes:[240],duration:.065,spacing:.05,volume:.009,wave:'triangle'},
  supplies:{notes:[470,620,760],duration:.14,spacing:.05,volume:.024},
  chest:{notes:[330,523,784,1047],duration:.2,spacing:.09,volume:.024}
};
function playEffect(kind) {
  const effect=INTERACTION_EFFECTS[kind];
  if (!effect) return false;
  const {notes,duration,spacing,volume,wave}=effect;
  notes.forEach((note,i)=>tone(note,duration,volume,i*spacing,wave));
  return true;
}
