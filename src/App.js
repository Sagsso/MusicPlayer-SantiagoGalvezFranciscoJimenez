const play = '<path class="play" fill="#ffffff" d="M3 2l10 6-10 6z"></path>'
const pause = '<path class="pause" fill="#ffffff" d="M2 2h5v12h-5zM9 2h5v12h-5z"></path>'

let $btnRepro = document.getElementById('btn-repro')
// let $stressedOut = new AudioPlayer($btnRepro)

let tracks = []

let trackElements = document.getElementsByClassName('track');
for (let i = 0; i < trackElements.length; i++) {
    tracks.push(trackElements[i].href);
}

let myAudioPlayer = new MultimediaPlayer('#main audio', tracks, {
    play: document.querySelector('#btn-repro'),
    next: document.querySelector('#next'),
    back: document.querySelector('#back'),
    title: document.querySelector('#title'),
    artist: document.querySelector('#artist'),
    album: document.querySelector('#album'),
    cover: document.querySelector('#top'),
    playlistMenu: document.querySelector('#playlist'),
    progressBar: document.querySelector('.progressBar'),
});

// $btnRepro.onclick = (e) => {
//     if ($btnRepro.classList.contains('btn-play')) {
//         $btnRepro.removeChild($btnRepro.firstChild);
//         $btnRepro.classList.remove('btn-play')
//         $btnRepro.classList.add('btn-pause')

//         // $stressedOut.play()
//         console.log('Play')
//     } else {
//         $btnRepro.removeChild($btnRepro.firstChild);
//         $btnRepro.innerHTML = play
//         $btnRepro.classList.remove('btn-pause')
//         $btnRepro.classList.add('btn-play')

//         // $stressedOut.pause()
//         console.log('Pause')
//     }
// }

let $cora = document.getElementById('cora')
$cora.onclick = (e) => {
    let $coraColor = document.querySelector('.cora-color')
    $coraColor.classList.toggle('pressed')
    $coraColor.classList.toggle('unpressed')
}

let $shuffle = document.getElementById('shuffle')
$shuffle.onclick = (e) => {
    let $shuffleColor = document.querySelector('.shuffle-color')
    $shuffleColor.classList.toggle('pressed')
    $shuffleColor.classList.toggle('unpressed')
}

let $repeat = document.getElementById('repeat')
$repeat.onclick = (e) => {
    let $repeatColor = document.querySelector('.repeat-color')
    $repeatColor.classList.toggle('pressed')
    $repeatColor.classList.toggle('unpressed')
}

let $menu = document.querySelector('.menu');
$menu.onclick = (e) => {
    document.querySelector('#main').classList.toggle('show');
    document.querySelector('#playlist').classList.toggle('show');
}




