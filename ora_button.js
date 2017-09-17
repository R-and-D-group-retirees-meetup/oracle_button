"use strict"

const addClickEvent = (body, element) => {
  element.addEventListener("click", () => {
    const audioURL = chrome.extension.getURL("sounds/oracle.wav");
    const audio = new Audio();
    audio.src = audioURL;
    audio.play();
  });
};

const setOra = () => {
  const imgURL = chrome.extension.getURL("icons/ora128.png");
  const body = document.getElementsByTagName("body")[0];
  const img = document.createElement("img");
  img.src = imgURL;
  img.setAttribute("height", "64");
  img.setAttribute("width", "64");
  img.setAttribute("style", "position:absolute; bottom:0%; right:0%; position: fixed;");
  const element = body.appendChild(img);
  addClickEvent(body, element);
};

setOra();
