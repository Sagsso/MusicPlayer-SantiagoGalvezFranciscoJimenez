const play = '<path class="play" fill="#ffffff" d="M3 2l10 6-10 6z"></path>'
const pause = '<path class="pause" fill="#ffffff" d="M2 2h5v12h-5zM9 2h5v12h-5z"></path>'
let $btnRepro = document.getElementById('btn-repro')
let $stressedOut = new AudioPlayer($btnRepro)

$btnRepro.onclick = (e) => {
    if ($btnRepro.classList.contains('btn-play')) {
        $btnRepro.removeChild($btnRepro.firstChild);
        $btnRepro.innerHTML = pause
        $btnRepro.classList.remove('btn-play')
        $btnRepro.classList.add('btn-pause')

        $stressedOut.play()
        console.log('Play')
    } else {
        $btnRepro.removeChild($btnRepro.firstChild);
        $btnRepro.innerHTML = play
        $btnRepro.classList.remove('btn-pause')
        $btnRepro.classList.add('btn-play')

        $stressedOut.pause()
        console.log('Pause')
    }
}

let $cora = document.querySelector('.cora')
$cora.onclick = (e) => {
    let $coraColor = document.querySelector('.cora-color')
    if ($coraColor.classList.contains('pressed')) {
        document.querySelector('.cora-color').style.fill = '#6d6d6d'
    } else {
        document.querySelector('.cora-color').style.fill = '#ff564c'
    }
    $coraColor.classList.toggle('pressed')
    $coraColor.classList.toggle('unpressed')

}



