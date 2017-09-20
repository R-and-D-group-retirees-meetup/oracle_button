const checkCurrentVoice = () => {
  const currentVoice = chrome.extension.getBackgroundPage().getCurrentVoice();
  const currentRadio = document.querySelector(`input[value="${currentVoice}"]`);
  currentRadio.checked = true;
  bindClickEvents();
};

const bindClickEvents = () => {
  const radios = document.getElementsByName("voice");
  radios.forEach((element) => {
    element.addEventListener("click", () => {
      chrome.extension.getBackgroundPage().setCurrentVoice(element.value);
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  checkCurrentVoice();
});
