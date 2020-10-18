'use strict';

const QUANTITY_WIZARDS = 4;

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;

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

const FIREBALL_COLOR = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
];

const wizards = [];
const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;
const similarItemElement = similarWizardTemplate.querySelector(`.setup-similar-item`);

const setup = document.querySelector(`.setup`);
const setupOpen = document.querySelector(`.setup-open`);
const setupClose = setup.querySelector(`.setup-close`);
const setupUserName = setup.querySelector(`.setup-user-name`);

const setupWizard = {
  coat: {
    element: setup.querySelector(`.wizard-coat`),
    input: setup.querySelector(`input[name = 'coat-color']`)
  },
  eyes: {
    element: setup.querySelector(`.wizard-eyes`),
    input: setup.querySelector(`input[name = 'eyes-color']`)
  },
  fireball: {
    element: setup.querySelector(`.setup-fireball-wrap`),
    input: setup.querySelector(`input[name = 'fireball-color']`)
  }
};

let getRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

let changeWizardColor = (object, array, property) => {
  object.element.addEventListener(`click`, () => {
    const color = getRandomElement(array);
    object.element.style = `${property}: ${color}`;
    object.input.value = `${color}`;
  });
};

let onPopupEscPress = (evt) => {
  if (evt.key === `Escape` && setupUserName !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
};

let openPopup = () => {
  setup.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
  changeWizardColor(setupWizard.coat, COAT_COLOR, `fill`);
  changeWizardColor(setupWizard.eyes, EYES_COLOR, `fill`);
  changeWizardColor(setupWizard.fireball, FIREBALL_COLOR, `background`);
};

let closePopup = () => {
  setup.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);
};

setupOpen.addEventListener(`click`, () => {
  openPopup();
});

setupOpen.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, () => {
  closePopup();
});

setupClose.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

setupUserName.addEventListener(`invalid`, () => {
  if (setupUserName.validity.valueMissing) {
    setupUserName.setCustomValidity(`Обязательное поле`);
  } else {
    setupUserName.setCustomValidity(``);
  }
});

const setupWizardForm = document.querySelector(`.setup-wizard-form`);

setupWizardForm.addEventListener(`submit`, () => {
  const valueLength = setupUserName.value.length;

  if (setupUserName.checkValidity() == valueLength < MIN_NAME_LENGTH) {
    setupUserName.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - valueLength} симв.`);
  } else if (setupUserName.checkValidity() == valueLength > MAX_NAME_LENGTH) {
    setupUserName.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} симв.`);
  } else {
    setupUserName.setCustomValidity(``);
  }
});
/*
setupUserName.addEventListener(`input`, () => {
  const valueLength = setupUserName.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    setupUserName.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    setupUserName.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} симв.`);
  } else {
    setupUserName.setCustomValidity(``);
  }

  setupUserName.reportValidity();
});
*/
let renderWizard = (wizard) => {
  const wizardElement = similarItemElement.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

let getWizardsList = () => {
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

setup.querySelector(`.setup-similar`).classList.remove(`hidden`);
