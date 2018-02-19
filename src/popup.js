"use strict";

const ORACLE = "https://www.oracle.com";

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

const bindEmergencyOracleButtonEvent = () => {
  document.getElementById("emergency-oracle").addEventListener("click", () => {
    chrome.windows.getAll({populate:true}, (windows) => {
      windows.forEach((window) => {
        window.tabs.forEach((tab) => {
          chrome.tabs.update(tab.id, {url: ORACLE});
        });
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  checkCurrentVoice();
  bindEmergencyOracleButtonEvent();
});
