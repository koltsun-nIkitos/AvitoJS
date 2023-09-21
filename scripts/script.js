"use strict";

const dataBase = JSON.parse(localStorage.getItem('awito')) || [];

const modalAdd = document.querySelector(".modal__add");
const addAd = document.querySelector(".add__ad");
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const catalog = document.querySelector(".catalog");
const modalItemm = document.querySelector(".modal__item");
const modalBtnWarning = document.querySelector(".modal__btn-warning");
const modalFileInput = document.querySelector(".modal__file-input");
const modalFileBtn = document.querySelector(".modal__file-btn");
const modalImageAdd = document.querySelector(".modal__image-add");

const textFileBtn = modalFileBtn.textContent;
const srcModalImage = modalImageAdd.src;


const elementsModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON');
    
const infoPhoto = {};

const saveDb = () =>{
    localStorage.setItem('awito', JSON.stringify(dataBase));
}

const checkForm = () =>{
    const valideForm = elementsModalSubmit.every(elem => elem.value);
    modalBtnSubmit.disabled = !valideForm;
    modalBtnWarning.style.display = valideForm ? "none" : "";
};

const closeModal = function(event) {
    const target = event.target;

    if (target.closest('.modal__close') ||
        target.classList.contains('modal') ||
        (event.code === 'Escape')){
        modalAdd.classList.add('hide');
        modalItemm.classList.add('hide');
        document.removeEventListener('keydown', closeModal);
        modalSubmit.reset();
        modalImageAdd.src = srcModalImage;
        modalFileBtn.textContent = textFileBtn;
        checkForm();
    }
};

const renderCard = () =>{
    catalog.textContent = '';

    dataBase.forEach((item, i) => {
        catalog.insertAdjacentHTML('beforeend', `
            <li class="card" data-id="${i}">
                <img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="test">
                <div class="card__description">
                    <h3 class="card__header">${item.nameItem}</h3>
                    <div class="card__price">${item.costItem} ₽</div>
                </div>
            </li>
        `);
    });

};

modalFileInput.addEventListener('change', (event) => {
    const target = event.target;

    const reader = new FileReader();

    const file = target.files[0];

    infoPhoto.filename = file.name;
    infoPhoto.size = file.size;

    reader.readAsBinaryString(file);
    reader.addEventListener('load', (event)=>{

        if (infoPhoto.size < 2000000){
            modalFileBtn.textContent = infoPhoto.filename;
            infoPhoto.base64 = btoa(event.target.result);
            modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`;
        }else{
            modalFileBtn.textContent = 'Файл не должен превышать 2мб';
            modalFileInput.value = '';
            checkForm();
        }

    })
})

modalSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    const itemObj = {};
    for (const elem of elementsModalSubmit) {
        itemObj[elem.name] = elem.value;
    }
    itemObj.image = infoPhoto.base64;

    dataBase.push(itemObj);
    closeModal({target : modalAdd});
    saveDb();
    renderCard();
});

modalSubmit.addEventListener('input', checkForm);

addAd.addEventListener('click', ()=>{
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    document.addEventListener('keydown', closeModal);
});

catalog.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('.card')){
        modalItemm.classList.remove('hide');
        document.addEventListener('keydown', closeModal);
    };
});


modalAdd.addEventListener('click', closeModal);
modalItemm.addEventListener('click', closeModal);

renderCard();