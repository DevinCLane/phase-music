// inspiration from https://teropa.info/blog/2016/07/28/javascript-systems-music.html

// create an audio context https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
const audioCtx = new AudioContext();

// grab the stop button
const stop = document.getElementById('stop')

function startLoop(audioBuffer, pan = 0, rate = 1) {
        // buffer source knows how to play an AudioBuffer
        // this AudioBufferSourceNode reacts in in the AudioBuffer data and streams it to other notes.
        const sourceNode = audioCtx.createBufferSource();

        // set up panning
        const pannerNode = audioCtx.createStereoPanner();

        // give the buffersource the audio buffer we have
        sourceNode.buffer = audioBuffer;

        // let's loop the audio
        sourceNode.loop = true;

        // set our loop start and stop points;
        let loopStart = 1.9
        let loopEnd = 3.2

        sourceNode.loopStart = loopStart;
        sourceNode.loopEnd = loopEnd;

        // set playback rate
        sourceNode.playbackRate.value = rate;
        // set the panning to pan value
        pannerNode.pan.value = pan;

        // connect the source node to the panner node
        sourceNode.connect(pannerNode);
        // connect the panner node to the buffer source to our audio context's destination (the speakers)
        pannerNode.connect(audioCtx.destination)

        // start the music, only play between our loops
        // first argument is when to start playing, we set to 0 to say immediately
        // second argument is the offset of how far in to our song to start playing, we set to the loop beginning
        sourceNode.start(0, loopStart)

        // add event listener to the stop button
        stop.addEventListener('click', () => {
            // stop the music if we click
            sourceNode.stop();
        })
}



async function getSound() {
    // define our audio file
    const sound = 'can-i-still-walk-2022-11-28.mp3'
    try {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        // use the Fetch API to request the audio file
        const response = await fetch(sound)
        // await the response, invoke arrayBuffer() method, to use the binary ArrayBuffer object, which is a generic, fixed-length raw binary data buffer
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
        const arrayBuffer = await response.arrayBuffer()
        // call the decodeAudioData method from the audio context to turn the mp3 arraybuffer into a decoded audiobuffer
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)

        // call our start loop function to start the audio loop
        // 2nd argument is for panning (-1 is left 1 is right)
        // 3rd argument is playback rate
        startLoop(audioBuffer, -1)
        startLoop(audioBuffer, 1, 1.008);

        // just in case something goes wrong
    } catch (error) {
        console.log(error)
    }
}