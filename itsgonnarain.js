// inspiration from https://teropa.info/blog/2016/07/28/javascript-systems-music.html

// create an audio context https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
const audioCtx = new AudioContext();

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
        // buffer source knows how to play an AudioBuffer
        // this AudioBufferSourceNode reacts in in the AudioBuffer data and streams it to other notes.
        let sourceNode = audioCtx.createBufferSource();
        // give the buffersource the audio buffer we have
        sourceNode.buffer = audioBuffer;
        // connect the buffer source to our audio context's destination (the speakers)
        sourceNode.connect(audioCtx.destination);
        // start the music
        sourceNode.start();
        // just in case something goes wrong
    } catch (error) {
        console.log(error)
    }
}

getSound()