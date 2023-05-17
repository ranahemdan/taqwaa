/////////////////////////////
//RANDOM-BACKGROUND-LANDING
//////////////////////////////
let landing = document.querySelector(".landing");

function getBackgroundRandom(min, max) {
  let images = [
    "images/back-land1.jpg", "images/back-land2.jpg",
    "images/back-land3.jpg", "images/back-land4.jpg",
    "images/back-land5.jpg", "images/back-land6.jpg",
    "images/back-land7.jpg", "images/back-land8.jpg",
    "images/back-land9.jpg", "images/back-land10.jpg",
    "images/back-land11.jpg"
];
landing.style.backgroundImage=`url('${images[Math.floor(Math.random() * (max - min + 1) ) + min]}')`
}
getBackgroundRandom(0, 10);
////////////////////
//ayah-random
//////////////
const ayahRandom = document.querySelector(".landing .ayah-section .ayah"); 
const ayahPlayerRndm = document.querySelector(".landing .ayah-player");
const surahNameRndm = document.querySelector(".surah-name-number .name-surah"); 
const ayahNumber = document.querySelector(".surah-name-number .number-ayah");

function getRndForAyah(min, max) {
  // ayahRandom.innerHTML = 
  fetch(`http://api.alquran.cloud/v1/ayah/${Math.floor(Math.random() * (max - min + 1)) + min}/ar.alafasy`)
    .then(response => response.json())
    .then(data => {
      let ayahTextRndm = data.data.text;
      let audioAyahRndm = data.data.audio;
      ayahRandom.innerHTML = ayahTextRndm;
      surahNameRndm.innerHTML = data.data.surah.name;
      ayahNumber.innerHTML = data.data.numberInSurah;
      // audio player
      const playRndm = document.querySelector(".landing .play-rndm")
      //play btn
      let isPlayingRndm = false;
      function togglePlayRndm() {
        if (isPlayingRndm) {
          ayahPlayerRndm.pause();
          playRndm.innerHTML = `<i class="fa-solid fa-play"></i>`
          playRndm.title = "play"
          isPlayingRndm = false;
        } else {
          AyahPlay()
          ayahPlayerRndm.play();
          playRndm.innerHTML = `<i class="fa-solid fa-pause"></i>`
          playRndm.title = "pause"
          isPlayingRndm = true;
        }
      }
      // when play
      playRndm.addEventListener('click', togglePlayRndm);
      // when ended
      ayahPlayerRndm.addEventListener('ended', () => {
        AyahPlay()
        ayahPlayerRndm.pause();
        isPlayingRndm = true;
        togglePlayRndm()
      })
      // ayahPlayerRndm.src
      function AyahPlay() {
        ayahPlayerRndm.src = audioAyahRndm;
      }
    })
}
getRndForAyah(1, 6236);
////////////////////////////////////
//QURAN FUNCTIONS
///////////////////////////////////////////
//MAIN VARIABLES
let audioPlayer = document.querySelector(".surah-player");
let allSurah = document.querySelector(".all-surahs");
let ayahTextDiv = document.querySelector(".ayah-text .text-aya");
let next = document.querySelector(".quran .next");
let prev = document.querySelector(".quran .prev");
let play = document.querySelector(".quran .play");
getSurah();

//FUNCTION TO FETCH API FOR all DATA QURAN 
function getSurah() {
  fetch("http://api.alquran.cloud/v1/quran/ar.alafasy").then((result)=> {
  let myData = result.json();
  return myData;
}).then((quran) => {
  for (let surah in quran.data.surahs) {
    allSurah.innerHTML += 
    ` <a href ="#aya-text" class="col-lg-4 col-md-6">
        <div class="container-surah d-flex justify-content-between align-items-center rounded-2">
            <div class="info-surah">
              <span class = "number"><span class = "num">${quran.data.surahs[surah].number}</span></span>
              <span class = "name-surah">${quran.data.surahs[surah].name}</span>
            </div>
            <span class = "number-of-ayaht font-monospace">${quran.data.surahs[surah].ayahs.length}آيات</span>
        </div>
      </a>
    `
  }
  //AUDIO VARIABLES
  let surahs = document.querySelectorAll(".all-surahs .container-surah");
  let ayahAudio;
  let ayahText;
  //FUNCTION TO FETCH API FOR DATA SURAH AND FETCH ALL AUDIO AND TEXT FOR AYAHS
  surahs.forEach((item, index) => {
    item.addEventListener("click", () => {
      fetch(`http://api.alquran.cloud/v1/surah/${index + 1}/ar.alafasy`)
        .then(response => response.json())
        .then(data => {
          let allAyahs = data.data.ayahs;
          ayahAudio = [];
          ayahText = [];
          allAyahs.forEach(ayah => {
            ayahAudio.push(ayah.audio);
            ayahText.push(ayah.text);
          })
          //FUNCTIONS FOR AUTO CHANGE AYAHS 
          let ayahIndex = 0;
          changeAyah(ayahIndex);
          audioPlayer.addEventListener('ended', () => {
            ayahIndex++;
            if (ayahIndex < ayahAudio.length) {
              changeAyah(ayahIndex);
            }else {
              ayahIndex = 0;
              changeAyah(ayahIndex);
              audioPlayer.pause();
              isPlaying = true;
              togglePlay()
            }
          })
          //next btn
          next.addEventListener('click', ()=>{
            if (ayahIndex < ayahAudio.length - 1) {
              ayahIndex++;
            } else {
              ayahIndex = 0;
            }
            changeAyah(ayahIndex);
          })
          //prev btn
          prev.addEventListener('click', ()=>{
            if (ayahIndex == 0) {
              ayahIndex = ayahAudio.length - 1;
            } else {
              ayahIndex--;
            }
            changeAyah(ayahIndex);
          })
          //play btn
          let isPlaying = false;
          togglePlay()
          function togglePlay() {
            if (isPlaying) {
              audioPlayer.pause();
              play.innerHTML = `<i class="fa-solid fa-play"></i>`
              play.title = "play"
              isPlaying = false;
            } else {
              audioPlayer.play();
              play.innerHTML = `<i class="fa-solid fa-pause"></i>`
              play.title = "pause"
              isPlaying = true;
            }
          }
          play.addEventListener('click', togglePlay)
          function changeAyah(index) {
            audioPlayer.src = ayahAudio[index];
            ayahTextDiv.innerHTML = ayahText[index];
            ayahText[index].length > 200 ? ayahTextDiv.style.padding = "30px 20px" : ayahTextDiv.style.padding = "40px 50px";
          }
      })
    })
  })
  moreAndLess()
})
}
////////////////////////////
//show less and more surah
//////////////////////////////
let btnSeeMore = document.querySelector(".quran .see-more");
function moreAndLess() {
  let surahAll = document.querySelectorAll(".all-surahs a");
  if (surahAll.length >= 30) {
    for (let i = 30; i < surahAll.length; i++) {
      const ele = surahAll[i];
      ele.classList.add("hide");
      btnSeeMore.addEventListener('click', () => {
        ele.classList.toggle("hide");
        ele.classList.toggle("show");
        ele.classList.contains("hide") ? btnSeeMore.innerHTML = "مشاهدة المزيد" : btnSeeMore.innerHTML = "مشاهدة القليل";
      })
    }
  } 
}
// //////////////////////
// dekr function
/////////////////////////////

let allelemntsDekr = document.querySelector(".dekr-moslem .all-azkar-moslem");
/////////////////////////////////
// function to fetch category dekr
/////////////////////////
getDekrEle();
function getDekrEle() {
  const myArray = Object.values(dekr);
  myArray.forEach((ele) => {
    let category = ele[0].category;
    allelemntsDekr.innerHTML += `
    <div class="dekr"><a href="dekr.html"> ${category}</a></div>
    `
  })
}