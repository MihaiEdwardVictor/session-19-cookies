const languageButtons = document.querySelectorAll(".js-language-switcher");
const LOCAL_STORAGE_KEY = "myApp_language";

let appLanguage = "EN";

// Fetching Data
function fetchContent(language = getLanguageFromLocalStorage()) {
  fetch("./data/content.json")
    .then((response) => response.json())
    .then((responseJSON) => updateContentUI(responseJSON[language]));
}

setTimeout(() => fetchContent(), 5000);

function updateContentUI(data) {
  let contentToBeAdded = "";
  Object.values(data).forEach((element) => (contentToBeAdded += `<p class="col">${element}</p>`));

  const contentSection = document.querySelector("#content");
  contentSection.innerHTML = contentToBeAdded;
}

function updateSalutationUI() {
  const salutationSection = document.querySelector("#salutation");

  const name = "John";
  salutationSection.innerHTML = `Heya ${getCookie() === "true" ? name : "Guest User"}!`;
}

updateSalutationUI();

// Language Switcher - event handling
languageButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    setLanguageFromLocalStorage(button.textContent);

    setTimeout(() => fetchContent(), 500);
  });
});

// Storage
function getLanguageFromLocalStorage() {
  // if LS.get ...
  // else 'EN'
  return localStorage.getItem(LOCAL_STORAGE_KEY) || "EN";
}

function setLanguageFromLocalStorage(languageValue) {
  localStorage.setItem(LOCAL_STORAGE_KEY, languageValue);
}

// Cookie
function setCookie(value = true, daysToExpire) {
  const whenToExpire = new Date();
  whenToExpire.setDate(whenToExpire + daysToExpire);

  const cookieValue = encodeURIComponent(value);
  const cookieExpirationDate = whenToExpire.toUTCString();

  document.cookie = `myApp_consent=${cookieValue}; expires=${cookieExpirationDate}; path=/`;

  updateSalutationUI();
}

function getCookie(name = "myApp_consent") {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    // check if cookie starts with the desired name
    if (cookie.indexOf(name + "=") === 0) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }

  return false;
}