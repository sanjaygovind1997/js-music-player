//Song collection & song index

const songs = ['energy','funnysong','tenderness','sunny'];

let songIndex = 0;

// Required elemnts

const audio = document.querySelector('audio');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const repeatBtn = document.querySelector('#repeat');
const musicContainer = document.querySelector('.music-container');
const progressContainer = document.querySelector('.progress-container');
const metaContainer = document.querySelector('.meta-container');
const coverImage = document.querySelector('#cover-image');
const title = document.querySelector('#title');
const progress = document.querySelector('.progress');

// Load the first song

loadSong(songs[songIndex]);

// Controll / Update Functions

function loadSong(song){
    
    title.innerText = song;
    audio.src = `music/bensound-${song}.mp3`;
    coverImage.src = `imgs/${song}.jpg`;
}

function pauseSong(){

    audio.pause();
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
}

function playSong(){

    audio.play();
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
}

function nextSong(){

    songIndex++;
    if (songIndex > (songs.length - 1)){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong(){

    songIndex--;
    if (songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function repeatSong(){

    audio.load();
    playSong();
}

function setProgress(event){
    // determining the fraction of progress container div covered by CLICK

    const progressFraction = event.offsetX / progressContainer.offsetWidth;

    // Setting progress and play head to that point

    progress.setAttribute('style',`width:${progressFraction * 100}%`);
    audio.currentTime = progressFraction * audio.duration;
}

function updateProgress(){

    // Finding progress percenatge and timestamp
    let {duration,currentTime} = audio;
    if(isNaN(duration)){
        duration = 0;
    }
    progressPercent = (currentTime / duration) * 100;

    const current = formatedTime(currentTime);
    const totalPlaybackTime = formatedTime(duration);

    // Setting progress and timer

    progress.setAttribute('style',`width:${progressPercent}%;`);
    progress.style.width = `${progressPercent}%;` // Cross-compatibility

    metaContainer.querySelector('.timer').innerText = `${current}/${totalPlaybackTime}`;
}

// Function for formating time to display on timer

function formatedTime(time){
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if(seconds < 10){
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`
}

// Event Listeners

playBtn.addEventListener('click',()=>{

    isPlaying = musicContainer.classList.contains('play');
    if (isPlaying){
        pauseSong();
    }else{
        playSong();
    }
});

nextBtn.addEventListener('click',nextSong);

prevBtn.addEventListener('click',prevSong);

repeatBtn.addEventListener('click',repeatSong);

audio.addEventListener('timeupdate',updateProgress);

progressContainer.addEventListener('click',setProgress);

audio.addEventListener('ended',nextSong);


// optimize updateProgress Fn