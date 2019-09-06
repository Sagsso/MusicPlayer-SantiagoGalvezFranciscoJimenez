
class AudioPlayer {

    constructor(btnPlay) {
        console.log(btnPlay.getAttribute("src"))
        this.audio = document.createElement("audio");
        this.source = document.createElement("source");
        this.source.src = `./${btnPlay.getAttribute("src")}`;
        this.audio.appendChild(this.source);
        this.audio.volume = 1;
        this.reproductorDOM = document.getElementById('container');
    }


    play() {
        this.audio.play().catch(function (e) {
            console.log(e);
        });
    }

    pause() {
        this.audio.pause()
    }

}