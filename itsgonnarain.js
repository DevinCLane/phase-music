// inspiration from https://teropa.info/blog/2016/07/28/javascript-systems-music.html

console.log('hi')

// create an audio context https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
const audioCtx = new AudioContext();

async function getSound() {
    // define our audio file
    const sound = 'can-i-still-walk-2022-11-28.mp3'
    try {
        // use the Fetch API to request the audio file
        const response = await fetch(sound)
        // await the response, invoke arrayBuffer() method, to use the binary ArrayBuffer object 
        const arrayBuffer = await response.arrayBuffer()
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)
        // once all this is done, we log to make sure it worked
        return console.log('decoded', audioBuffer)
        // just in case something goes wrong
    } catch (error) {
        console.log(error)
    }
}

getSound()