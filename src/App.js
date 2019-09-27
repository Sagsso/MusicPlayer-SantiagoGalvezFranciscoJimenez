const play = '<path class="play" fill="#ffffff" d="M3 2l10 6-10 6z"></path>'
const pause = '<path class="pause" fill="#ffffff" d="M2 2h5v12h-5zM9 2h5v12h-5z"></path>'

let tracks = [
    { src: './assets/songs/SummerDays.mp3', img: './assets/images/SummerDays.jpg', title: 'Summer Days', artist: 'Martin Garrix', totalTime: '2:44' },
    { src: './assets/songs/Chuck_Berry_Is_on_Top.mp3', img: './assets/images/Chuck_Berry_Is_on_Top.jpg', title: 'Jhonny B. Goode', artist: 'Chuck Berry Is on Top', totalTime: '2:42' },
    { src: './assets/songs/Believer.mp3', img: './assets/images/Believer.jpg', title: 'Believer', artist: 'Imagine Dragons', totalTime: '3:29' },
    { src: './assets/songs/Should I Stay Or Should I Go.mp3', img: './assets/images/Should I Stay Or Should I Go.jpg', title: 'Should I Stay Or Should I Go', artist: 'The Clash', totalTime: '3:10' },
    { src: './assets/songs/Heathens.mp3', img: './assets/images/Heathens.jpg', title: 'Heathens', artist: 'Twenty One Pilots', totalTime: '3:11' },
    { src: './assets/songs/UGotThat.mp3', img: './assets/images/UGotThat.jpg', title: 'U Got That', artist: 'Halogen', totalTime: '2:53' },
    { src: './assets/songs/OldTownRoad.mp3', img: './assets/images/OldTownRoad.jpeg', title: 'Old Town Road', artist: 'Lil Nas X ft. Ray Cyrus', totalTime: '2:37' },
    { src: './assets/songs/GodsPlan.mp3', img: './assets/images/GodsPlan.jpg', title: 'GodsPlan', artist: 'Drake', totalTime: '3:19' },
    { src: './assets/songs/LSD.mp3', img: './assets/images/LSD.jpg', title: 'LSD', artist: 'Genius ft. Sia, Diplo', totalTime: '3:54' },
    { src: './assets/songs/NoGuidance.mp3', img: './assets/images/NoGuidance.jpg', title: 'No Guidance', artist: 'Chris Brown ft. Drake', totalTime: '4:22' },
    { src: './assets/songs/Panini.mp3', img: './assets/images/Panini.jpg', title: 'Panini', artist: 'Lil Nas X', totalTime: '1:56' },
    { src: './assets/songs/RightBack.mp3', img: './assets/images/RightBack.jpg', title: 'Right Back', artist: 'Khalid ft. A Boogie', totalTime: '4:14' },
    { src: './assets/songs/StressedOut.mp3', img: './assets/images/stressedout.jpg', title: 'Stressed Out', artist: 'Twenty One Pilots', totalTime: '3:22' },
    { src: './assets/songs/WalkItTalkIt.mp3', img: './assets/images/WalkItTalkIt.jpg', title: 'Walk It Talk It', artist: 'Migos ft. Drake', totalTime: '4:37' },
]

let trackElements = document.getElementsByClassName('track');
// for (let i = 0; i < trackElements.length; i++) {
//     tracks.push(trackElements[i].src);
// }

let $playlist = document.getElementById('playlist')
for (let i = 0; i < tracks.length; i++) {
    let item = document.createElement('li')
    item.setAttribute('draggable', 'true')
    item.setAttribute('ondragstart', 'drag(event)')
    item.src = tracks[i].src;
    item.innerHTML = `<span><span class="title" data-index="${i}">${tracks[i].title}</span> -
                    <span class="artist">${tracks[i].artist}</span></span><span class="totalTime">${tracks[i].totalTime}</span>`;
    $playlist.appendChild(item);
}

$playlist.children[0].classList.add('playing')


let myAudioPlayer = new MultimediaPlayer('#main audio', tracks, {
    play: document.querySelector('#btn-repro'),
    next: document.querySelector('#next'),
    back: document.querySelector('#back'),
    shuffle: document.querySelector('#shuffle'),
    title: document.querySelector('#title'),
    artist: document.querySelector('#artist'),
    album: document.querySelector('#album'),
    currentTime: document.querySelector('.currentTime'),
    totalTime: document.querySelector('.totalTime'),
    cover: document.querySelector('#top'),
    playlistMenu: document.querySelector('#playlist'),
    progressBar: document.querySelector('.progressBar'),
    loading: document.querySelector('.loading'),
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

//Drag & Drop functions
function allowDrop(ev) {
    ev.preventDefault();
}
let source;
function drag(ev) {
    source = ev.target;
    ev.dataTransfer.setData("text/plain", ev.target.innerHTML);
    ev.dataTransfer.effectAllowed = "move";
}
let player = new Audio()
// player.setAttribute('id', 'newAudio')
function drop(ev) {
    ev.preventDefault();
    let box = document.getElementById('playlist');
    let files = ev.dataTransfer.files;

    for (var i = 0, f; f = files[i]; i++){
    addSong(URL.createObjectURL(files[i]))
    }
    //console.log(ev)
}

function playFile(file) {
    player.src = URL.createObjectURL(file)
}
function addSong(src) {
    let item = document.createElement('li')
    item.setAttribute('draggable', 'true')
    item.setAttribute('ondragstart', 'drag(event)')
    item.src = src

    item.innerHTML = `<span><span class="title" data-index="n">NUEVA CANCIÓN</span> -
                    <span class="artist">clickeame, apenas sueno</span></span><span class="totalTime">totalTime</span>`;
    $playlist.appendChild(item);
    myAudioPlayer.addPlaylistListener();
}