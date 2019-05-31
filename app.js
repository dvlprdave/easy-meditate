const app = () => {
  const song = document.querySelector('.song')
  const play = document.querySelector('.play')
  const outline = document.querySelector('.moving-outline circle')
  const background = document.getElementById('background')

  //Sounds
  const sounds = document.querySelectorAll('.sound-picker button')
  //Time Display
  const timeDisplay = document.querySelector('.time-display')
  const timeSelect = document.querySelectorAll('.time-select button')
  //Get the length of the outline
  const outlineLength = outline.getTotalLength();
  //Duration
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength
  outline.style.strokeDashoffset = outlineLength

  //Stop and play sounds
  const checkPlaying = song => {
    if (song.paused) {
      song.play()
      play.src = './svg/pause.svg'
    } else {
      song.pause()
      play.src = './svg/play.svg'
    }
  }

  //Select different sound
  sounds.forEach(sound => {
    sound.addEventListener('click', function () {
      song.src = this.getAttribute('data-sound')
      background.src = this.getAttribute('data-image')
      checkPlaying(song)
    })
  })

  //PLay Soung
  play.addEventListener('click', () => {
    checkPlaying(song)
  })

  //Select duration
  timeSelect.forEach(option => {
    option.addEventListener('click', function () {
      fakeDuration = this.getAttribute('data-time')
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)} :${Math.floor(fakeDuration % 60)}`
    })
  })

  //Circle animation
  song.ontimeupdate = () => {
    let currentTime = song.currentTime
    let elapsed = fakeDuration - currentTime
    let seconds = Math.floor(elapsed % 60)
    let minutes = Math.floor(elapsed / 60)

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
    outline.style.strokeDashoffset = progress

    //Animate text
    timeDisplay.textContent = `${minutes}:${seconds}`

    if (currentTime >= fakeDuration) {
      song.pause()
      song.currentTime = 0
      play.src = './svg/play.svg'
    }
  }
}

app();