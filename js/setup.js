'use strict';

const QUANTITY_WIZARDS = 4;

const WIZARD_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

const WIZARD_SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

const COAT_COLOR = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const EYES_COLOR = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

const wizards = [];
const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;
const similarItemElement = similarWizardTemplate.querySelector(`.setup-similar-item`);

const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

const renderWizard = function (wizard) {
  const wizardElement = similarItemElement.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getWizardsList = function () {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < QUANTITY_WIZARDS; i++) {
    const wizard = {
      name: getRandomElement(WIZARD_NAMES) + ` ` + getRandomElement(WIZARD_SURNAMES),
      coatColor: getRandomElement(COAT_COLOR),
      eyesColor: getRandomElement(EYES_COLOR)
    };

    wizards[i] = wizard;
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};
getWizardsList();

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);

