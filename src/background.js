"use strict";

let current = "kiritan";
let oracleButtonVisible = true;

function getCurrentVoice() {
	return current;
}

function setCurrentVoice(selected) {
	current = selected;
}

function getOracleButtonVisibile() {
	return oracleButtonVisible;
}

function setOracleButtonVisible(shouldBeVisible) {
	
	chrome.tabs.getSelected(null, (tab) => {
		chrome.tabs.sendMessage(tab.id, {visibility: shouldBeVisible}, (response) => {
				console.log("set");
				oracleButtonVisible = shouldBeVisible;
			});
	});
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
