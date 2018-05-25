"use strict";

const addClickEvent = (body, element) => {
  element.addEventListener("click", () => {
    chrome.runtime.sendMessage({message: ""}, () => {
      "sended";
    });
  });
};

const setOra = () => {
  const imgURL = chrome.extension.getURL("icons/ora00128.png");
  const body = document.getElementsByTagName("body")[0];
  const img = document.createElement("img");
  img.src = imgURL;
  img.setAttribute("id", "oracle-button");
  img.setAttribute("height", "64");
  img.setAttribute("width", "64");
  img.setAttribute("style", "position:absolute; bottom:0%; right:0%; position: fixed; z-index: 2147483647; cursor: pointer");
  const element = body.appendChild(img);
  addClickEvent(body, element);
};

setOra();

const toggleOra = (shouldBeVisible) => {
  const oracleButton = document.getElementById("oracle-button");
  if (shouldBeVisible) {
    oracleButton.style.display = "block";
  } else {
    oracleButton.style.display = "none";
  }
};

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.hasOwnProperty("visibility")) {
    toggleOra(request.visibility);
  }
  sendResponse(true);
});
