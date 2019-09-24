const play = '<path class="play" fill="#ffffff" d="M3 2l10 6-10 6z"></path>'
const pause = '<path class="pause" fill="#ffffff" d="M2 2h5v12h-5zM9 2h5v12h-5z"></path>'

let tracks = [
    { src: './assets/songs/SummerDays.mp3', img: './assets/images/SummerDays.jpg', title: 'Summer Days', artist: 'Martin Garrix' },
    { src: './assets/songs/Heathens.mp3', img: './assets/images/Heathens.jpg', title: 'Heathens', artist: 'Twenty One Pilots' },
    { src: './assets/songs/UGotThat.mp3', img: './assets/images/UGotThat.jpg', title: 'U Got That', artist: 'Halogen' },
    { src: './assets/songs/OldTownRoad.mp3', img: './assets/images/OldTownRoad.jpeg', title: 'Old Town Road', artist: 'Lil Nas X ft. Ray Cyrus' },
    { src: './assets/songs/GodsPlan.mp3', img: './assets/images/GodsPlan.jpg', title: 'GodsPlan', artist: 'Drake' },
    { src: './assets/songs/LSD.mp3', img: './assets/images/LSD.jpg', title: 'LSD', artist: 'Genius ft. Sia, Diplo' },
    { src: './assets/songs/NoGuidance.mp3', img: './assets/images/NoGuidance.jpg', title: 'No Guidance', artist: 'Chris Brown ft. Drake' },
    { src: './assets/songs/Panini.mp3', img: './assets/images/Panini.jpg', title: 'Panini', artist: 'Lil Nas X' },
    { src: './assets/songs/RightBack.mp3', img: './assets/images/RightBack.jpg', title: 'Right Back', artist: 'Khalid ft. A Boogie' },
    { src: './assets/songs/StressedOut.mp3', img: './assets/images/stressedout.jpg', title: 'Stressed Out', artist: 'Twenty One Pilots' },
    { src: './assets/songs/WalkItTalkIt.mp3', img: './assets/images/WalkItTalkIt.jpg', title: 'Walk It Talk It', artist: 'Migos ft. Drake' },
]

let trackElements = document.getElementsByClassName('track');
// for (let i = 0; i < trackElements.length; i++) {
//     tracks.push(trackElements[i].src);
// }

let $playlist = document.getElementById('playlist')

for (let i = 0; i < tracks.length; i++) {
    let item = document.createElement('li')
    item.innerHTML = `<span><span class="title">${tracks[i].title}</span> -
                    <span class="artist">${tracks[i].artist}</span></span><span class="totalTime">2:54</span>`;
    $playlist.appendChild(item);
}

$playlist.children[0].classList.add('playing')


let myAudioPlayer = new MultimediaPlayer('#main audio', tracks, {
    play: document.querySelector('#btn-repro'),
    next: document.querySelector('#next'),
    back: document.querySelector('#back'),
    title: document.querySelector('#title'),
    artist: document.querySelector('#artist'),
    album: document.querySelector('#album'),
    currentTime: document.querySelector('.currentTime'),
    totalTime: document.querySelector('.totalTime'),
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


