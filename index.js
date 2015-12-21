var makeDistortionCurve = require('make-distortion-curve')
var MIDIUtils = require('midiutils')
var adsr = require('a-d-s-r')
// yr function should accept an audioContext, and optional params/opts
module.exports = function (ac, opts) {
  // make some audioNodes, connect them, store them on the object
  var audioNodes = {}

  var oscillator1 = ac.createOscillator(ac)
  oscillator1.type = 'triangle'
  oscillator1.detune.value = Math.random()
  var oscillator2 = ac.createOscillator(ac)
  oscillator2.type = 'square'
  oscillator2.detune.value = Math.random()
  var oscillator3 = ac.createOscillator(ac)
  oscillator3.type = 'sawtooth'
  oscillator3.detune.value = Math.random()
  var oscillator4 = ac.createOscillator(ac)
  oscillator4.type = 'sine'
  oscillator4.detune.value = Math.random()

  var oscillator5 = ac.createOscillator(ac)
  oscillator5.type = 'sawtooth'
  oscillator5.detune.value = Math.random()
  var oscillator6 = ac.createOscillator(ac)
  oscillator6.type = 'triangle'
  oscillator6.detune.value = Math.random()

  var delayA = ac.createDelay(0.2322)
  var delayB = ac.createDelay(0.252752313103222)
  var delayC = ac.createDelay(0.27222)

  var filterA = ac.createBiquadFilter()
  filterA.Q.value = 12
  filterA.type = 'peaking'
  filterA.detune.value = Math.random()


  // that one distortion curve that everyone copy pastes from stack overflow anyways

  // make a distortion pedal! yay!
  var distortionA = ac.createWaveShaper()
  distortionA.curve = makeDistortionCurve(800)

  var filterB = ac.createBiquadFilter()
  filterB.Q.value = 12
  filterB.type = 'bandpass'
  filterB.detune.value = Math.random()

  // that one distortion curve that everyone copy pastes from stack overflow anyways

  // make a distortion pedal! yay!
  var distortionB = ac.createWaveShaper()
  distortionB.curve = makeDistortionCurve(100)

  var filterC = ac.createBiquadFilter()
  filterC.Q.value = 7
  filterC.type = 'lowpass'
  filterC.detune.value = Math.random()

  // that one distortion curve that everyone copy pastes from stack overflow anyways

  // make a distortion pedal! yay!
  var distortionC = ac.createWaveShaper()
  distortionC.curve = makeDistortionCurve(1000)



  var gainA = ac.createGain()
  gainA.gain.value = 0.333333333333333
  var gainB = ac.createGain()
  gainB.gain.value = 0.333333333333333
  var gainC = ac.createGain()
  gainC.gain.value = 0.333333333333333
  var gainZ = ac.createGain()
  gainZ.gain.value = 0.5



  var filterZ = ac.createBiquadFilter()
  filterZ.Q.value = 12
  filterZ.type = 'highshelf'
  filterZ.detune.value = Math.random()

  // that one distortion curve that everyone copy pastes from stack overflow anyways

  var delayZ = ac.createDelay(0.222)

  // make a distortion pedal! yay!
  var distortionZ = ac.createWaveShaper()
  distortionZ.curve = makeDistortionCurve(750)
  distortionZ.oversample = '4x'


  var volume = ac.createGain()
  volume.gain.setValueAtTime(0, ac.currentTime)

  //  START OF CHAIN (NOT MARKOV)

  oscillator1.connect(delayA)

  oscillator5.connect(filterA.frequency)
  oscillator5.connect(gainZ.gain)
  oscillator5.frequency.value = 0.133

  oscillator4.connect(delayB)
  oscillator6.connect(filterB.frequency)
  oscillator6.connect(gainC.gain)
  oscillator6.frequency.value = 0.273

  oscillator2.connect(delayC)
  oscillator3.connect(delayC)

  delayA.connect(filterA)
  delayB.connect(filterB)
  delayC.connect(filterC)

  filterA.connect(gainA)
  filterB.connect(gainB)
  filterC.connect(gainC)

  oscillator1.connect(gainA)
  oscillator5.connect(gainA)

  oscillator4.connect(gainB)
  oscillator6.connect(gainB)

  oscillator2.connect(gainC)
  oscillator3.connect(gainC)

  gainA.connect(distortionA)
  gainB.connect(distortionB)
  gainC.connect(distortionC)

  distortionC.connect(delayZ)
  delayZ.connect(filterZ)
  distortionC.connect(gainZ)
  filterZ.connect(gainZ)
  gainZ.connect(distortionZ)

  distortionA.connect(volume)
  distortionB.connect(volume)
  distortionZ.connect(volume)
  // END OF CHAIN

  audioNodes.oscillator1 = oscillator1
  audioNodes.oscillator2 = oscillator2
  audioNodes.oscillator3 = oscillator3
  audioNodes.oscillator4 = oscillator4
  audioNodes.oscillator5 = oscillator5
  audioNodes.oscillator6 = oscillator6
  audioNodes.delayA = delayA
  audioNodes.delayB = delayB
  audioNodes.delayC = delayC
  audioNodes.delayZ = delayZ
  audioNodes.gainA = gainA
  audioNodes.gainB = gainB
  audioNodes.gainC = gainC
  audioNodes.filterA = filterA
  audioNodes.filterB = filterB
  audioNodes.filterC = filterC
  audioNodes.filterZ = filterZ
  audioNodes.distortionA = distortionA
  audioNodes.distortionB = distortionB
  audioNodes.distortionC = distortionC
  audioNodes.distortionZ = distortionZ
  audioNodes.volume = volume
  audioNodes.settings = {
    attack: 0.01,
    decay: 0.05,
    sustain: 0.4,
    release: 0.1,
    peak: 0.3,
    mid: 0.1,
    end: 0.00000000000001 // lol idk wtf
  }

  // bzzzzz
  oscillator1.start(ac.currentTime)
  oscillator2.start(ac.currentTime)
  oscillator3.start(ac.currentTime)
  oscillator4.start(ac.currentTime)
  oscillator5.start(ac.currentTime)
  oscillator6.start(ac.currentTime)

  return {
    connect: function (input) {
      audioNodes.volume.connect(input)
    },
    start: function (when) {
      adsr(audioNodes.volume, when, audioNodes.settings)
    },
    stop: function (when) {
      console.log('SOMETIMES I DOUBT YR COMMITMENT 2 THE PARTY\np.s. yr oscillators are destroyed, make a new synth plz')
      oscillator1.stop(when)
      oscillator2.stop(when)
      oscillator3.stop(when)
      oscillator4.stop(when)
      oscillator5.stop(when)
      oscillator6.stop(when)
    },
    update: function (opts, when) {
      // available opts:
      // {midiNote: 62, lfoL: , lfoR: , freq, attack: , decay: , sustain: , release: , peak: , mid:}
      Object.keys(opts).forEach(function (k) {
        var v = opts[k]
        if (k == 'midiNote' || k == 'freq') {
          var freq = k == 'midiNote' ? MIDIUtils.noteNumberToFrequency(v) : v

          audioNodes.oscillator1.frequency.setValueAtTime(freq * 2.0, when)
          audioNodes.oscillator2.frequency.setValueAtTime(freq * 2.0, when)
          audioNodes.oscillator3.frequency.setValueAtTime(freq * 8.0, when)
          audioNodes.oscillator4.frequency.setValueAtTime(freq * 4.0, when)
          audioNodes.oscillator5.frequency.setValueAtTime(freq * 2.0, when)
          audioNodes.oscillator6.frequency.setValueAtTime(freq * 4.0, when)

          filterA.frequency.setValueAtTime(freq / (2 + Math.random()), when)
          filterB.frequency.setValueAtTime(freq * (2 + Math.random()), when)
          filterC.frequency.setValueAtTime(freq / (Math.random()), when)
          filterZ.frequency.setValueAtTime(freq * (1.5 + Math.random()), when)

        } else if (k == 'lfoL' || k == 'lfoR') {
          var node = k == 'lfoL' ? audioNodes.oscillator5 : audioNodes.oscillator6
          node.frequency.setValueAtTime(v, when)
        } else {
          // just an ADSR value
          audioNodes.settings[k] = v
        }
      })
    },
    nodes: function () {
      // returns an object of `{stringKey: audioNode}` for raw manipulation
      return audioNodes
    }
  }
}