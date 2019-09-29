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

let $playlist = document.getElementById('playlist')
for (let i = 0; i < tracks.length; i++) {
    let item = document.createElement('li')
    let src = tracks[i].src
    let title = tracks[i].title
    let artist = tracks[i].artist
    let total = tracks[i].totalTime
    addSong(src, title, artist, total)
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
    ev.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

}
let source;
function drag(ev) {
    source = this;
    ev.dataTransfer.setData("text/plain", this.innerHTML);
    ev.dataTransfer.effectAllowed = "move";
}

function dropFiles(ev) {
    ev.preventDefault();
    let box = document.getElementById('playlist');
    let files = ev.dataTransfer.files;

    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let blob = file.slice(file.size - 128, file.size);
            let reader = new FileReader();

            reader.onload = function (evt) {
                let buff = evt.target.result;
                let dataView = new DataView(buff)
                let src = URL.createObjectURL(files[i]);
                let title = readString(dataView, 3, 30)
                let artist = readString(dataView, 33, 30)
                console.log('TAG:', readString(dataView, 0, 3));
                console.log('title: ', readString(dataView, 3, 30)); // title
                console.log('artist: ', readString(dataView, 33, 30)); // artist
                console.log('album: ', readString(dataView, 63, 30)); // album
                console.log('year: ', readString(dataView, 93, 4)); // year
                addSong(src, title, artist)
                let obj = {
                    src: src,
                    img: null,
                    title: title,
                    artist: artist,
                    totalTime: null
                }
                tracks.push(obj)
                myAudioPlayer.addPlaylistListener();
            }
            reader.readAsArrayBuffer(blob);
        }
    } else {
        if (ev.target.localName === 'li') {

            ev.target.insertAdjacentElement('beforebegin', source)
            // source.innerHTML = ev.target.innerHTML;
            // ev.target.innerHTML = ev.dataTransfer.getData("text/plain");
        }
    }


}


function readString(dataView, offset, length) {
    let str = '';
    for (let i = offset; i < offset + length; i++) {
        str += String.fromCharCode(dataView.getUint8(i));
    }
    return str;
}

function addSong(src, title, artist, total) {
    let item = document.createElement('li')
    addDnD(item)
    item.src = src
    item.innerHTML = `<span><span class="title" data-index="${$playlist.children.length}">${title}</span> -
                                                <span class="artist">${artist}</span></span><span class="totalTime">${total}</span>`;
    $playlist.appendChild(item);

}

function addDnD(el) {
    console.log('added')
    el.setAttribute('draggable', 'true')
    el.addEventListener('dragstart', drag, false);
}

// function handleDrop(e) {

//     if (e.stopPropagation) {
//         e.stopPropagation(); // Stops some browsers from redirecting.
//     }

//     // Don't do anything if dropping the same column we're dragging.
//     if (source != this) {
//         // Set the source column's HTML to the HTML of the column we dropped on.
//         //alert(this.outerHTML);
//         //dragSrcEl.innerHTML = this.innerHTML;
//         //this.innerHTML = e.dataTransfer.getData('text/html');
//         let dropHTML = e.dataTransfer.getData('text/html');
//         // this.parentNode.removeChild(source);
//         this.insertAdjacentHTML('beforebegin', dropHTML);
//         console.log(this.previousSibling)
//         let dropElem = this.previousSibling;
//         addDnD(dropElem);

//     }
// }