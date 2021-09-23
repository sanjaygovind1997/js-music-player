//Song collection & song index
const songs = ['energy','funnysong','tenderness','sunny'];

let songIndex = 0;

// Required elemnts
const audio = document.getElementsByTagName('audio')[0];
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const repeatBtn = document.querySelector('#repeat');
const musicContainer = document.querySelector('.music-container');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');

loadSong(songIndex);

function loadSong(index){
    audio.src = `music/bensound-${songs[index]}.mp3`;
}

function nextSong(){
    

}

function prevSong(){}

playBtn.addEventListener('click',()=>{
    if (musicContainer.classList.contains('play')){
        musicContainer.classList.remove('play');
        audio.pause();
    }else{
        musicContainer.classList.add('play');
        audio.play();
    }
});

