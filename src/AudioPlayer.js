
class AudioPlayer {

    constructor(audioTagSelector, src) {
        this._audio = document.querySelector(audioTagSelector);
        this.audio.src = src;
        this.audio.volume = 1;
        this.availableFormats = ['mp3', 'wav', 'ogg', 'aif'];
    }

    get audio() {
        return this._audio;
    }

    play() {
        if (this.verifyType()) {
            this.audio.play()
        } else {
            console.log('Not available')
        }
    }

    pause() {
        this.audio.pause()
    }

    verifyType() {
        let res = this.audio.src.split(".")[1];
        let response = false;
        this.availableFormats.forEach(element => {
            if (element == res) {
                response = true;
            }
        });
        return response;

    }

    getReproductorDOM() {
        return this.reproductorDOM;
    }

}