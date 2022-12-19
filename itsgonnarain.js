// inspiration from https://teropa.info/blog/2016/07/28/javascript-systems-music.html

// create an audio context https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
const audioCtx = new AudioContext();

function startLoop(audioBuffer) {
        // buffer source knows how to play an AudioBuffer
        // this AudioBufferSourceNode reacts in in the AudioBuffer data and streams it to other notes.
        let sourceNode = audioCtx.createBufferSource();
        // give the buffersource the audio buffer we have
        sourceNode.buffer = audioBuffer;
        // let's loop the audio
        sourceNode.loop = true;
        // set our loop start and stop points;
        const loopStart = 2.22
        const loopEnd = 2.9
        sourceNode.loopStart = loopStart;
        sourceNode.loopEnd = loopEnd;
        // connect the buffer source to our audio context's destination (the speakers)
        sourceNode.connect(audioCtx.destination);
        // start the music, only play between our loops
        // first argument is when to start playing, we set to 0 to say immediately
        // second argument is the offset of how far in to our song to start playing, we set to the loop beginning
        sourceNode.start(0, loopStart)
        // grab the stop button
        const stop = document.getElementById('stop')
        // add event listener
        stop.addEventListener('click', () => {
            // stop the music if we click
            sourceNode.stop();
        })
}

async function getSound() {
    // define our audio file
    const sound = 'can-i-still-walk-2022-11-28.mp3'
    try {
        // use the Fetch API to request the audio file
        const response = await fetch(sound)
        // await the response, invoke arrayBuffer() method, to use the binary ArrayBuffer object, which is a generic, fixed-length raw binary data buffer
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
        const arrayBuffer = await response.arrayBuffer()
        // call the decodeAudioData method from the audio context to turn the mp3 arraybuffer into a decoded audiobuffer
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)

        // call our start loop function to start the audio loop
        startLoop(audioBuffer)
        startLoop(audioBuffer)

        // just in case something goes wrong
    } catch (error) {
        console.log(error)
    }
}