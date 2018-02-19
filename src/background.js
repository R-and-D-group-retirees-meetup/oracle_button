"use strict";

let current = "kiritan";

function getCurrentVoice() {
	return current;
}

function setCurrentVoice(selected) {
	current = selected;
}

function say() {
	const audioURL = chrome.extension.getURL(`sounds/${current}/oracle.wav`);
	const audio = new Audio();
	audio.src = audioURL;
	audio.play();
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    say();
    sendResponse(true);
});
