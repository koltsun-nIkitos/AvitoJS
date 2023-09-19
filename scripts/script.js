"use strict";

const modalAdd = document.querySelector(".modal__add");
const addAd = document.querySelector(".add__ad");
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');

addAd.addEventListener('click', ()=>{
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
});

modalAdd.addEventListener('click', (event)=>{
    const target = event.target;

    if (target.closest('.modal__close') ||
        target === modalAdd){
        modalAdd.classList.add('hide');
        modalSubmit.reset();
    }   
});


console.log(1);