"use strict";

const dataBase = [];

const modalAdd = document.querySelector(".modal__add");
const addAd = document.querySelector(".add__ad");
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const catalog = document.querySelector(".catalog");
const modalItemm = document.querySelector(".modal__item");
const modalBtnWarning = document.querySelector(".modal__btn-warning");

const elementsModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON');
    


const closeModal = function(event) {
    const target = event.target;

    if (target.closest('.modal__close') || target === this){
        this.classList.add('hide');
        if (this === modalAdd){
            modalSubmit.reset();
        }
    }

};

const closeModalEscape = (event) => {
    if (event.code === 'Escape'){
        modalAdd.classList.add('hide');
        modalItemm.classList.add('hide');
        document.removeEventListener('keydown', closeModalEscape);
    }
};

modalSubmit.addEventListener('input', ()=>{
    const valideForm = elementsModalSubmit.every(elem => elem.value);
    modalBtnSubmit.disabled = !valideForm;
    modalBtnWarning.style.display = valideForm ? "none" : "";
})

addAd.addEventListener('click', ()=>{
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    document.addEventListener('keydown', closeModalEscape);
});

modalAdd.addEventListener('click', closeModal);
modalItemm.addEventListener('click', closeModal);

modalSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    const itemObj = {};
    for (const elem of elementsModalSubmit) {
        itemObj[elem.name] = elem.value;
    }

    dataBase.push(itemObj);
    modalSubmit.reset();
    console.log(dataBase);
});

catalog.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('.card')){
        modalItemm.classList.remove('hide');
        document.addEventListener('keydown', closeModalEscape);
    };
});



