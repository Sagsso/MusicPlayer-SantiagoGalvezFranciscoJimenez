let $btnPlay = document.getElementById('btn-play')

$btnPlay.onclick = (e) => {
    let $stressedOut = new AudioPlayer(['./assets/audios/StressedOut.mp3'])
    $stressedOut.play()
    console.log('Play')
}