import api from "./js/api.js";
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const select = document.querySelector(".breed-select");
select.classList.add("is-hidden");

new SlimSelect({
    select: select,
    settings: {
        alwaysOpen: false,
        openPosition: "down",
        closeOnSelect: true,
    }
});

const loader = document.querySelector(".loader");
const errorMessage = document.querySelector(".error");
errorMessage.classList.add("is-hidden");
const catInfo = document.querySelector(".cat-info");

api.fetchBreeds()
    .then(optionsList => {
        console.log(optionsList);
        optionsList.forEach(element => {
           let option = document.createElement("option");
           option.setAttribute("value", element.id);
           option.classList.add("option");
           select.append(option);
           option.textContent = element.name;
        });
        
        select.classList.remove("is-hidden");
        loader.classList.add("is-hidden");
    })
    .catch(err => {
        loader.classList.add("is-hidden");
        Notiflix.Notify.failure("Not good buddy...");
    });

select.addEventListener("change", (event) => {
    loader.classList.remove("is-hidden");
    catInfo.classList.add("is-hidden");
    errorMessage.classList.add("is-hidden");
    api.fetchCatByBreed(event.currentTarget.value)
    .then(result => {
        console.log(result);        
        catInfo.innerHTML = 
        `
        <div class="cat-data"><img src="${result[0].url}" width="300px" class="cat-image" alt="">
        <div class="breed-info"><h2 class="breed-name">${result[0].breeds[0].name}</h2>
        <p class="breed-description">${result[0].breeds[0].description}</p>
        <p class="breed-temperament"><span>Temperament: </span>${result[0].breeds[0].temperament}</p></div></div>`;  
        loader.classList.add("is-hidden");
        catInfo.classList.remove("is-hidden");
       
    })
});