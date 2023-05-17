let dekrBooks = document.querySelector(".dekr-page .dekr-books");
let allAzkarDiv = document.querySelector(".all-azkar");
let allAzkar = document.querySelector(".all-azkar .container");
/////////////////////////////////
// function to fetch elazkar
/////////////////////////
getDekr();
function getDekr() {
  const myArray = Object.values(dekr);
  myArray.forEach((ele) => {
    let category = ele[0].category;
    dekrBooks.innerHTML += `
    <li data-type="${category}"><a href="#${category}">${category}</a></li>
    `
  })
  let azkarItems = document.querySelectorAll(".dekr-books li");
  let titleDekr = document.querySelector(".all-azkar .title");
  azkarItems.forEach((item) => {
    item.addEventListener("click", () => {
      allAzkarDiv.style.padding = "20px 0"
      allAzkar.innerHTML = "";
      let itemDataType = item.dataset.type + "";
      let content = dekr[itemDataType]
      content.forEach((element, index) => {
        let elementCategory= element.category;
        let elementText = element.content;
        let elementCount = parseInt(element.count);
        let elementDescription = element.description;
        let elementReference = element.reference;
        titleDekr.innerHTML = elementCategory;
        allAzkar.id = elementCategory;
        allAzkar.innerHTML += `
        <div class="dekr p-3 mb-4" id="count${index}">
          <div class="content"> ${elementText} </div>
          <span class="description mb-2 d-block"> ${elementDescription} </span>
          <div class="reference text-start"> ${elementReference} </div>
          <div class="count"> ${elementCount} </div>
        </div>
        `
        // counter
        let dekrElement = document.querySelectorAll(".all-azkar .dekr");
        dekrElement.forEach((itemDekr) => {
          itemDekr.addEventListener("click", () => {
            (itemDekr.children[3].textContent) -= 1;
            if (itemDekr.children[3].innerHTML <= 0) {
              itemDekr.remove();
            }
          })
        })
      })
    })
  })
}
