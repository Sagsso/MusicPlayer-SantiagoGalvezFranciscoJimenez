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
        this.setPlayerInfo(0);
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
                this.changePlayingSong(getIndex(this.currentTrack + 1), this.currentTrack + 1, 'controls');
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
                    this.changePlayingSong(getIndex(this.currentTrack - 1), this.currentTrack - 1, 'controls');
                } else {
                    this.changePlayingSong(getIndex(this.tracks.length - 1), this.tracks.length - 1, 'controls');
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


        Array.from(this._DOMElements.playlistMenu.children).forEach(li => {
            li.onclick = (e) => {
                for (let j = 0; j < this._DOMElements.playlistMenu.children.length; j++) {
                    this._DOMElements.playlistMenu.children[j].classList.remove('playing')
                }
                li.classList.add('playing')

                let currentTrack;
                Array.from(this._DOMElements.playlistMenu.children).forEach(element => {
                    if (element.classList.contains('playing')) {
                        currentTrack = [...this._DOMElements.playlistMenu.children].indexOf(element)
                    }
                });
                this.changePlayingSong(li.dataset.index, currentTrack, 'click')
            }
        })

        // let songs = this._DOMElements['playlistMenu'];
        // console.log(songs.children.length)
        // for (let i = 0; i < songs.children.length; i++) {
        //     songs.children[i].onclick = (e) => {
        //         for (let j = 0; j < songs.children.length; j++) {
        //             songs.children[j].classList.remove('playing')
        //         }

        //         e.target.classList.add('playing')
        //         Array.from(this._DOMElements.playlistMenu.children).forEach(element => {
        //             if (element.classList.contains('playing')) {
        //                 console.log([...this._DOMElements.playlistMenu.children].indexOf(element))
        //             }
        //         });
        //         this.changePlayingSong(i, songs.children[i].src)
        //         // console.log([...songs.children].indexOf(el))
        //         console.log('Click in song')
        //     };

        // }
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

    changePlayingSong(index, ct, mode) {
        console.log(index)
        if (ct <= this.tracks.length - 1) {
            this.currentTrack = ct;
        } else {
            this.currentTrack = 0;
            index = this._DOMElements.playlistMenu.children[this.currentTrack].dataset.index
        }
        this.audioPlayer.audio.src = this._DOMElements.playlistMenu.children[this.currentTrack].src;
        console.log('Current track' + this.currentTrack)

        this._DOMElements.loading.classList.add('loading');
        this.play();

        let element = this._DOMElements.playlistMenu.children[this.currentTrack];
        if (mode == 'controls') {
            let playing = this._DOMElements.playlistMenu.querySelector('.playing');
            playing.classList.remove('playing');
            element.classList.add('playing');
        }
        element.scrollIntoView(true)
        this.setPlayerInfo(index);
    }

    setPlayerInfo(i) {
        console.log(i)
        let element = this._DOMElements.playlistMenu.children[this.currentTrack];
        this._DOMElements.title.innerHTML = element.querySelector('.title').innerHTML;
        this._DOMElements.artist.innerHTML = element.querySelector('.artist').innerHTML;
        this._DOMElements.cover.style.backgroundImage = `url('${this.tracks[i].img || './assets/images/noImage.png'}')`;
    }

    startTimeUpdateListener() {

        this.audioPlayer.audio.ontimeupdate = () => {
            let total = this.audioPlayer.audio.duration;
            let current = this.audioPlayer.audio.currentTime;
            let progress = current / total;
            this.updateProgressBar(progress * 100);
            if (current <= total) {
                this._DOMElements.currentTime.innerHTML = this.formatCurrentTime(current);
            }

            if (current == total && this.audioPlayer.audio.paused) {
                this._DOMElements.play.removeChild(this._DOMElements.play.firstChild);
                this._DOMElements.play.innerHTML = play
                let nextTrack = this.currentTrack + 1;
                setTimeout(this.changePlayingSong.bind(this), 2000, getIndex(nextTrack), nextTrack, 'controls');
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