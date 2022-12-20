⏈ Phase Music in JavaScript ⏈
=============================

by [Devin Lane](https://www.devinlane.com/)

What is this?
-------------

Following inspiration from [Tero Parviainen's](https://teropa.info/blog/2016/07/28/javascript-systems-music.html) writing on ["systems music"](https://en.wikipedia.org/wiki/Systems_music), I've created [phase music](https://en.wikipedia.org/wiki/Phase_music) in the spirit of Steve Reich's [It's Gonna Rain.](https://en.wikipedia.org/wiki/It%27s_Gonna_Rain)

Systems music explores how a process applied to sound creates slowly evolving changes. Phase music explores how two identical musical phrases played with a steady, but slightly different, tempo on two different instruments creates new rhythms and harmonies over time.

I discovered Tero's work when he was a judge for [BitRate](https://bitrate.devpost.com/), [Google Magenta](https://magenta.tensorflow.org/)'s music and machine learning hackathon. My team won the contest for our work on [Dear Diary](https://deardiary.ai/) in 2020, which I detailed [here](https://magenta.tensorflow.org/dear-diary).

Why make this?
--------------

I'm interested in exploring web audio as a compositional tool. This includes, for example: systems music, generative music, data sonification, and effects processing--viewing code as a musical instrument and the web as a musical medium.

I intend tools like these to enable new musical expression for both experienced and novice musicians.

How does it work?
-----------------

* I wrote a piece of music and took a small snippet as a loop.
* Two identical loops of this piece are played, one panned to your left speaker, one panned to your right speaker (because of this, the effects will be more pronounced on headphones or two individual stereo speakers.)
* The playback speeds differ slightly between the two loops, which causes their [phase](https://en.wikipedia.org/wiki/Phase_(waves)) to shift over time, resulting in new harmonies and rhythms as they grow out of alignment and back again.

How did you make it?
--------------------

The [Web audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) and JavaScript play central roles here. As previously mentioned, [Tero's blog](https://teropa.info/blog/2016/07/28/javascript-systems-music.html) was an invaluable resource in building this.

1.  We set up an [`AudioContext()`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)
2.  When `play` is pressed, a function `getSound` is called, which uses the Fetch API to grab the audio file.
3.  The audio file is fed into a raw [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) object, then we call the `decodeAudioData()` method to decode the audio data from the `ArrayBuffer`. This is our `audioBuffer`.
4.  We call a separate function `startLoop` twice, panning one loop hard left, one hard right. We set the playback speed of one loop ~0.005 faster than the other.
5.  Within `startLoop` we call [`AudioBufferSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode), which reads our `audioBuffer`.
6.  We then set up our panning, our loop points, and we connect the nodes to the destination of our `AudioContext`.
7.  Importantly, we build a `stop` button, which calls the `.stop()` method on our `sourceNode`.

What optimizations would you build with more time?
--------------------------------------------------

Some features that I haven't built that would be nice:

* Allow users to upload their own audio files
* Add user control for the loop start and stop points
* Add user control for the audio playback speed
* Add user control for the panning
* Add a record feature, allowing downloadable audio files
* Allow users to create accounts and save their work
* Allow users to share their work with a link to the site