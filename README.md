# A WHINING CAPITALIST PIG SYNTH

twinkly bell thing

## WIKI

`npm install a-whining-capitalist`

## USE
```
window.AudioContext = window.AudioContext || window.webkitAudioContext
var ac = new AudioContext()
var capitalism = require('a-whining-capitalist')(ac)
capitalism.connect(ac.destination)

// set the frequency/ADSR
capitalism.update({midiNote: 72, attack: 0.3, decay: 0.1, sustain: 0.3, release: 0.5, peak: 0.3, mid: 0.1, end: 0.000001, lfoL: 0.3, lfoR: 0.6})
// and trigger it!
capitalism.start(ac.currentTime)


// destroy the oscillators completely. u probably would only wanna do this for garbage collection porpoises.
capitalism.stop(ac.currentTime)


// this will return an object containing all the nodes in the a-whining-capitalist audioGraph, for closer-to-the-metal manipulation than the update/start methods provide.
capitalism.nodes()


# DEVELOPMENT

```
npm install
npm run test # should pass! Yay!
```

# HEAR THE MAGIC!

- `npm run serve` boot a webserver at port 3000
- `npm run build` build demo.js to a bundle. Run this after making any changes to hear updates (or add [watchify](https://github.com/wham-js/web-audio-advent-calendar/blob/master/package.json#L8), i wanted to keep things "light")
- open `http://localhost:3000/` in a web browser and hear the magic (hopefully)

# RESOURCES


- [openmusic](https://github.com/openmusic) has a ton of helpful modules
- if you need a basic convolver impulse, [voila](https://github.com/mdn/voice-change-o-matic/tree/gh-pages/audio)