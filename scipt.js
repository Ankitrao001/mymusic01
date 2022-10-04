const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio");
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev");
nextBtn = wrapper.querySelector("#next");
replay = wrapper.querySelector("#more-music")
progressArea = wrapper.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar");

// musicList = wrapper.querySelector(".music-list"),
// showMoreBtn = wrapper.querySelector("#more-music"),
// hideMusicBtn = musicList.querySelector("#close");


let musicIndex = Math.floor((Math.random()*allMusic.length)+1);


window.addEventListener("load", ()=>{
    loadMusic(musicIndex); //calling load music function once window loades
    // playingNow()
  });

//load music function
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = allMusic[indexNumb - 1].img;
    mainAudio.src = allMusic[indexNumb - 1].src;
    

}
//play music function
function playMusic(){
    wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();

}
//pause music function
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
  }
  
  //next music function
function nextMusic(){
    musicIndex++; //increment of musicIndex by 1
    //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
    // musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
   playMusic();
  }
  //prev music function
function prevMusic(){
    musicIndex--; //decrement of musicIndex by 1
    //if musicIndex is less than array length then musicIndex will be 1 so the first music play
    // musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
   playMusic()
    playingSong(); 
  }

replay.addEventListener("click",()=>{
    loadMusic(musicIndex);
   playMusic()

})

// play or pause button event
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPlay = wrapper.classList.contains("paused");
    //if isPlayMusic is true then call pauseMusic else call playMusic
    isMusicPlay ? pauseMusic() : playMusic();
    // playingNow();

  });

  //prev music button event
prevBtn.addEventListener("click", ()=>{
    prevMusic();
  });
  //next music button event
  nextBtn.addEventListener("click", ()=>{
    nextMusic();
  });





// update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime; //getting playing song currentTime
    const duration = e.target.duration; //getting playing song total duration
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    let musicCurrentTime = wrapper.querySelector(".current"),
     musicDuration = wrapper.querySelector(".duration");
    mainAudio.addEventListener("loadeddata", ()=>{
      // update song total duration
      let mainAdDuration = mainAudio.duration;
      let totalMin = Math.floor(mainAdDuration / 60);
      let totalSec = Math.floor(mainAdDuration % 60);
      if(totalSec < 10){ //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
      }
      musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
    // update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){ //if sec is less than 10 then add 0 before it
      currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  });

 // update playing song currentTime on according to the progress bar width
progressArea.addEventListener("click", (e)=>{
    let progressWidthval = progressArea.clientWidth; //getting width of progress bar
    let clickedOffSetX = e.offsetX; //getting offset x value
    let songDuration = mainAudio.duration; //getting song total duration
    
    console.log(mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration);
    playMusic(); //calling playMusic function
    // playingSong();
  });

  const repeatBtn = wrapper.querySelector("#repeat-plist");
  repeatBtn.addEventListener("click",()=>{
    let getText = repeatBtn.innerText; //getting innerText of icon
    //lets do different changes on different icon click using switch
    switch(getText){
        case "repeat" : //if this icon is repeat
        repeatBtn.innerText = "repeat_one";
        break;
        case "repeat_one": //if icon is repeat_one
        repeatBtn.innerText = "shuffle";
        break;
        case "shuffle": //if icon is shuffle
        repeatBtn.innerText = "repeat";
        break;

    }
  })
//above we changed the icon , noe lets work on what to do // after the song is ended

mainAudio.addEventListener("ended",()=>{
    let getText = repeatBtn.innerText;
    switch(getText){
        case "repeat" : //if this icon is repeat then simply we call the nextMusic function so the next song will play
       nextMusic();
        break;
        case "repeat_one": //if icon is repeat_one then  we 'll chnage the current playing song current time is equl to zero
        mainAudio.currentTime = 0;
        loadMusic(musicIndex);
        playMusic();
        break;
        case "shuffle": //if icon is shuffle
       let randIndex = Math.floor((Math.random()*allMusic.length) + 1)
       do{
        randIndex = Math.floor((Math.random()*allMusic.length)+1);
       }
       while(musicIndex == randIndex);
       musicIndex = randIndex; // passing randomIndex to musicIndex so that random song is played
       loadMusic(musicIndex); // calling load music function;
       playMusic();
    //    playingNow();
        break;

    }

});



























// showMoreBtn.addEventListener("click",()=>{
//     musicList.classList.toggle("show");
// });
// hideMusicBtn.addEventListener("click",()=>{
//     showMoreBtn.click();
// })
// const ulTag = wrapper.querySelector("ul");
// //lets create li according to the array length
// for(let i=0 ; i<allMusic.length ; i++){
//     let liTag = `
//     <li li-index="${i+1}">
//     <div class="row">
//     <span>${allMusic[i].name}</span>
//     <p>${allMusic[i].artist}</p>
//   </div>
  
//   <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
//   <audio class="${allMusic[i].src}" src="${allMusic[i].src}"></audio>
// </li>`;
// ulTag.insertAdjacentHTML("beforeend", liTag); //inserting the 
// let liAudioDuartion = ulTag.querySelector(`#${allMusic[i].src}`);
// let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
//  liAudioTag.addEventListener("loadeddata", ()=>{
//     let audioDuration = liAudioTag.duration;
//     let totalMin = Math.floor(audioDuration /60);
//     let totalSec = Math.floor(audioDuration % 60);
//     if(totalSec <10){
//         totalSec = `0{totalSec}`;

//     }
//     liAudioDuaration.innerText = `${totalMin}:${totalSec}`;
//     liAudioDuaration.setAttribute("t-duration", `${totalMin}:${totalSec}`)

// });

// }

// //let's work on play particular song on clcik
// const allLiTags = ulTag.querySelector("li");

// function playingNow(){
//     for(let j=0 ; j<Array.length; j++){
//         let audioTag = allLiTags[j].querySelector(".audio-duration");
//    if(allLiTags[j].classList.contains ("playing")){
//     allLiTags[j].classList.remove("playing");
//     let adDuration = audioTag.getAttribute("t-duration");
//     audioTag.innerText = adDuration;

//    }
//         //if there is an li tag which is li -index is equal to musicIndex //then this music is palaying now and we'll style it 
//         if(allLiTags[j].getAttribute("li-index") == musicIndex){
//             allLiTags[j].classList.add("playing"); 
//             audioTag.innerText = "Playing";
   
//         }
//         allLiTags[j].setAttribute("onclick","clicked(this)")
//     }
// }

// //lets play song on click
// function clicked(element){
//     //geeting li index of prticulatr clicked li tag
//     let getLiIndex = element.getAttribute("li-index");
//   musicIndex = getLiIndex; //updating current song index with clicked li index
//   loadMusic(musicIndex);
//   playMusic();
//   playingNow();

//     }