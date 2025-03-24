const audio = new Audio();
const playlist = [
    { title: 'Song 1', artist: 'Artist 1', src: 'assets/songs/song1.mp3' },
    { title: 'Song 2', artist: 'Artist 2', src: 'assets/songs/song2.mp3' }
];
let currentSongIndex = 0;

const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlistElement = document.getElementById('playlist');

// Load the first song
loadSong(currentSongIndex);

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<img src="assets/images/pause.png" alt="Pause">';
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<img src="assets/images/play.png" alt="Play">';
    }
});

// Previous song
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    audio.play();
});

// Next song
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    audio.play();
});

// Update progress bar
audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent;
    currentTime.textContent = formatTime(audio.currentTime);
});

// Seek functionality
progress.addEventListener('input', () => {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Update volume
volume.addEventListener('input', () => {
    audio.volume = volume.value;
});

// Load a song
function loadSong(index) {
    const song = playlist[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    audio.addEventListener('loadedmetadata', () => {
        duration.textContent = formatTime(audio.duration);
    });
}

// Format time (MM:SS)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Populate playlist
playlist.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        audio.play();
    });
    playlistElement.appendChild(li);
});
