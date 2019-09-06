
class AudioPlayer {

    constructor(sources) {

        this.audio = document.createElement("audio");

        for (var i = 0; i < sources.length; i++) {
            var source = document.createElement("source");
            source.src = sources[i];
            this.audio.appendChild(source);
        }
        this.audio.volume = 1;
    }


    play() {
        this.audio.play().catch(function (e) {
            console.log(e);
        });
    }

    update(volume) {
        this.audio.volume = volume;
    }

}