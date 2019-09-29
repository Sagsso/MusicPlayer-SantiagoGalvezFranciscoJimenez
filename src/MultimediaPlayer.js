class MultimediaPlayer extends DOMGui {

    constructor(audioTagSelector, tracks, guiParams = undefined) {
        super();

        this.tracks = tracks;
        this._audioPlayer = new AudioPlayer(audioTagSelector, this.tracks[0].src);
        this.currentTrack = 0;


        this._DOMElements = {
            play: undefined,
            next: undefined,
            back: undefined,
            title: undefined,
            shuffle: undefined,
            artist: undefined,
            album: undefined,
            cover: undefined,
            currentTime: undefined,
            totalTime: undefined,
            progressBar: undefined,
            playlistMenu: undefined,
            loading: undefined
        }
        this.setDOMElements(guiParams);
        this.addListeners();
        this.addPlaylistListener();
        this.setPlayerInfo();
    }

    get audioPlayer() {
        return this._audioPlayer;
    }

    addListeners() {

        this.startTimeUpdateListener();
        this.audioPlayer.audio.onloadedmetadata = () => {
            this._DOMElements.totalTime.innerHTML = this.formatCurrentTime(this.audioPlayer.audio.duration);
            this._DOMElements.loading.classList.remove('loading');

        }
        this.addButtonListener('play',
            () => {
                if (this.audioPlayer.audio.paused) {
                    this.audioPlayer.play();
                    this._DOMElements.play.removeChild(this._DOMElements.play.firstChild);
                    this._DOMElements.play.innerHTML = pause
                } else {
                    this.audioPlayer.pause();
                    this._DOMElements.play.removeChild(this._DOMElements.play.firstChild);
                    this._DOMElements.play.innerHTML = play
                }

                this._DOMElements.play.classList.toggle('btn-play');
                this._DOMElements.play.classList.toggle('btn-pause');
            });

        this.addButtonListener('next',
            () => {
                this.changePlayingSong(this.currentTrack + 1);
            });


        this.addButtonListener('progressBar',
            (e) => {
                let position = e.offsetX;
                let totalW = 240;
                let progress = position / totalW;
                this.updateProgressBar(progress * 100);
                this.audioPlayer.audio.currentTime = this.audioPlayer.audio.duration * progress;
            });

        this.addButtonListener('back',
            () => {
                if ((this.currentTrack - 1) >= 0) {
                    this.changePlayingSong(this.currentTrack - 1);
                } else {
                    this.changePlayingSong(this.tracks.length - 1);
                }
            });

        this.addButtonListener('shuffle',
            () => {

            });
    }

    addButtonListener(btnName, callback) {
        this._DOMElements[btnName].onclick = callback;
    }

    addPlaylistListener() {
        console.log('Eventos de nueva canción añadidos');

        let songs = this._DOMElements['playlistMenu'];
        console.log(songs.children.length)
        for (let i = 0; i < songs.children.length; i++) {
            songs.children[i].onclick = () => {
                for (let j = 0; j < songs.children.length; j++) {
                    songs.children[j].classList.remove('playing')
                }
                songs.children[i].classList.add('playing')
                this.changePlayingSong(i, songs.children[i].src)
                console.log('Click in song')
            };

        }
    }

    play() {
        if (this.audioPlayer.audio.paused) {
            this.audioPlayer.play();
            this._DOMElements.play.removeChild(this._DOMElements.play.firstChild);
            this._DOMElements.play.innerHTML = pause
        } else {
            this.audioPlayer.pause();
            this._DOMElements.play.removeChild(this._DOMElements.play.firstChild);
            this._DOMElements.play.innerHTML = play
        }

        this._DOMElements.play.classList.toggle('btn-play');
        this._DOMElements.play.classList.toggle('btn-pause');
    }

    changePlayingSong(index, src) {
        console.log(index)
        if (index <= this.tracks.length - 1) {
            this.currentTrack = index;
        } else {
            this.currentTrack = 0;
        }
        this.audioPlayer.audio.src = src || this.tracks[this.currentTrack].src;
        console.log(this.currentTrack)

        this.play();
        this._DOMElements.loading.classList.add('loading');
        let playing = this._DOMElements.playlistMenu.querySelector('.playing');
        playing.classList.remove('playing');
        let element = this._DOMElements.playlistMenu.children[this.currentTrack];
        element.classList.add('playing');
        element.scrollIntoView(true)
        this.setPlayerInfo();
    }

    setPlayerInfo() {
        let element = this._DOMElements.playlistMenu.children[this.currentTrack];
        this._DOMElements.title.innerHTML = element.querySelector('.title').innerHTML;
        this._DOMElements.artist.innerHTML = element.querySelector('.artist').innerHTML;
        this._DOMElements.cover.style.backgroundImage = `url('${this.tracks[this.currentTrack].img || './assets/images/noImage.png'}')`;
    }

    startTimeUpdateListener() {

        this.audioPlayer.audio.ontimeupdate = () => {
            let total = this.audioPlayer.audio.duration;
            let current = this.audioPlayer.audio.currentTime;
            let progress = current / total;
            this.updateProgressBar(progress * 100);
            this._DOMElements.currentTime.innerHTML = this.formatCurrentTime(current);

            if (current == total && this.audioPlayer.audio.paused) {
                this._DOMElements.play.removeChild(this._DOMElements.play.firstChild);
                this._DOMElements.play.innerHTML = play
                let nextTrack = this.currentTrack + 1;
                setTimeout(this.changePlayingSong.bind(this), 2000, nextTrack);
            }

        }
    }

    formatCurrentTime(currentTime) {

        let rounded = Math.round(currentTime)
        let minutes = Math.floor(rounded / 60)

        // console.log(rounded)
        let result = "";

        if (rounded < 10) {
            result = `${minutes}:0${rounded}`;
        } else if (rounded >= 10 && rounded <= 59) {
            result = `${minutes}:${rounded}`;
        } else if (rounded >= 60) {
            rounded = Math.floor(rounded % 60)
            result = (rounded < 10) ? `${minutes}:0${rounded}` : `${minutes}:${rounded}`
            // result = `${minutes}:${rounded}`;
        }
        return result;
    }

    updateProgressBar(progress) {
        this._DOMElements.progressBar.querySelector('.fillProgress').style.width = `${progress}%`;
    }

}