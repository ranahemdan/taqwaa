//loading page
window.addEventListener("load", () =>{
  const loader = document.querySelector(".loader-section");
  loader.classList.add("hidden");
});
//////////////////////////////////////
//DATE HIJRI
//////////////////////////////////
let dateHijri = document.querySelector(".date-hijri .container");
const date = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateHijri.innerHTML = date.toLocaleDateString('ar-SA', options);
////////////////////////////
//DIGITAL CLOCK
///////////////////////////
//vars
// let session = document.getElementById("session");
function displayTime() {
  const time = new Date(); 
  const optionsTime = { hour: 'numeric', minute: '2-digit'};
  document.getElementById("hour").innerHTML = time.toLocaleTimeString('ar-EG', optionsTime)
}
setInterval(displayTime, 1000);
///////////////////////
// creating year in footer
//////////////////////////
let creatYear = document.querySelector(".creating-year");
let year = date.getFullYear();
creatYear.innerHTML = year;
////////////////////////////////////////
//HADITHS FUNCTIONS
/////////////////////////////////
//MAIN VARIABLES
let hadithDiv = document.querySelectorAll(".hadith-book-items");
let namePrag = [ "سنن ابي داوود", "صحيح البخاري", "سنن ابن ماجه" ,"موطأ الامام مالك", "صحيح مسلم", "سنن النسائي", "سنن الترمزي"]
getHadithBook();
////////////////////////////////////////////////////
//FUNCTION TO FETCH API FOR all DATA HADITH
function getHadithBook() {
  fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json").then((result) => {
    let myData = result.json();
    return myData;
  }).then((hadiyth) => {
    let i = 0;
    for (let name in hadiyth) {
      let nameBooks = hadiyth[name].collection[0].book;
      hadithDiv.forEach( x => {
        x.innerHTML +=
          `
            <li id = ${nameBooks}><a class="dropdown-item" href="hadiths.html#${nameBooks}"> ${namePrag[i]} </a></li>
          `
        })
          i++;
    }
  })  
}

