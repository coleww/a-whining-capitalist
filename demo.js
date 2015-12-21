window.AudioContext = window.AudioContext || window.webkitAudioContext
var ac = new AudioContext()
var synth = require('./')(ac)
var synth1 = require('./')(ac)
var synth2 = require('./')(ac)
// just connect and start the synth to make sure it plays,
    // edit as needed!
synth.connect(ac.destination)
synth1.connect(ac.destination)
synth2.connect(ac.destination)

window.setInterval(function() {
  synth.update({
    midiNote: 50 + ~~(Math.random() * 15),
    lfoL: Math.random() * 20,
    lfoR: Math.random() * 10,
    attack: Math.random(),
    decay: Math.random(),
    sustain: Math.random(),
    release: Math.random()},
    ac.currentTime)
  synth.start(ac.currentTime)
},
    2500)

window.setInterval(function() {
  synth1.update({midiNote: 60 + ~~(Math.random() * 15),
    lfoL: Math.random() * 20,
    lfoR: Math.random() * 10,
    attack: Math.random(),
    decay: Math.random(),
    sustain: Math.random(),
    release: Math.random()},
    ac.currentTime)
  synth1.start(ac.currentTime)
},
    1500)

window.setInterval(function() {
  synth2.update({midiNote: 70 + ~~(Math.random() * 15),
    lfoL: Math.random() * 20,
    lfoR: Math.random() * 10,
    attack: Math.random(),
    decay: Math.random(),
    sustain: Math.random(),
    release: Math.random()},
    ac.currentTime)
  synth2.start(ac.currentTime)
},
    5500)