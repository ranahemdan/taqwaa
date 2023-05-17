////////////////////////////////////////
//HADITHS FUNCTIONS
/////////////////////////////////
// var
let hadithAllBook = document.querySelector(".hadith-books");
let namePragH = ["سنن ابي داوود", "صحيح البخاري", "سنن ابن ماجه", "موطأ الامام مالك", "صحيح مسلم", "سنن النسائي", "سنن الترمزي"];
let nameBookHadith = document.querySelector(".all-hadiths .title")
let hadithTextDiv = document.querySelector(".all-hadiths .name-book");
let nextHadith = document.querySelector(".next-hadith");
let prevHadith = document.querySelector(".prev-hadith");



let search = document.getElementById("search-hadith");

getHadith();
////////////////////////////////////////////////////
//FUNCTION TO FETCH API FOR all text HADITH
function getHadith() {
  fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json").then((result) => {
    let myData = result.json();
    return myData;
  }).then((hadiyth) => {
    let i = 0;
    for (let name in hadiyth) {
      let nameBooks = hadiyth[name].collection[0].book;
      hadithAllBook.innerHTML +=
        `
            <li id = ${nameBooks}><a href="#hadith-text"> ${namePragH[i]} </a></li>
          `
      i++;
      let hadithsBook = document.querySelectorAll(".hadith-books li");
      hadithsBook.forEach((item) => {
        item.addEventListener("click", () => {
          nameBookHadith.innerHTML = (item.textContent)
          let itmBook = item.id;
          fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${itmBook}.json`)
            .then(response => response.json())
            .then(data => {
              let allHadiths = data.hadiths;
              let hadithText = [];
              let hadithNameGrade = [];
              let hadithGradeGrade = [];
              allHadiths.forEach((hadith) => {
                hadith.text === "" ? delete hadith.text === "" : hadithText.push(hadith.text);
                if (hadith.grades.length > 0) {
                  hadithNameGrade.push(hadith.grades[0].name);
                  hadithGradeGrade.push(hadith.grades[0].grade);
                } else {
                  hadithNameGrade.push("");
                  hadithGradeGrade.push("");
                }
              })
              //FUNCTIONS FOR CHANGE hadith
              let hadithIndex = 0;
              changeHadith(hadithIndex);
              //next btn
              nextHadith.addEventListener('click', () => {
                if (hadithIndex < hadithText.length - 1) {
                  hadithIndex++;
                } else {
                  hadithIndex = 0;
                }
                changeHadith(hadithIndex);
              })
              //prev btn
              prevHadith.addEventListener('click', () => {
                if (hadithIndex == 0) {
                  hadithIndex = hadithText.length - 1;
                } else {
                  hadithIndex--;
                }
                changeHadith(hadithIndex);
              })
              changeHadith(hadithIndex)
              function changeHadith(index) {
                hadithTextDiv.innerHTML = `<div class="hadith-info">
                ${hadithText[index]}
                <div class="info-grade text-start">
                  <span class="d-block mt-2">${hadithNameGrade[index]}</span>
                  <span class="d-block">${hadithGradeGrade[index]}</span>
                </div>
                </div>`;
              }
            })
        })
      })
    }
  })
}


