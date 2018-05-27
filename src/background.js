"use strict";

let current = "kiritan";
let isOracleButtonVisible = true;

function getCurrentVoice() {
	return current;
}

function setCurrentVoice(selected) {
	current = selected;
}

function getOracleButtonVisibility() {
	return isOracleButtonVisible;
}

function setOracleButtonVisiblity(shouldBeVisible) {
	isOracleButtonVisible = shouldBeVisible;
	sendToggleMessage(shouldBeVisible, () => {
			return;
	});
}

function sendToggleMessage(shouldBeVisible, callback) {
	chrome.windows.getAll({populate:true}, (windows) => {
		windows.forEach((window) => {
			window.tabs.forEach((tab) => {
				chrome.tabs.sendMessage(tab.id, {visibility: shouldBeVisible},callback);
			});
		});
	});
};

function say() {
	const audioURL = chrome.extension.getURL(`sounds/${current}/oracle.wav`);
	const audio = new Audio();
	audio.src = audioURL;
	audio.play();
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
		if (request.message === "say") {
			say();
			sendResponse(true);
		} else if (request.message === "initVisibility") {
			sendResponse(true);
			sendToggleMessage(getOracleButtonVisibility(), () => {
					return;
			});
		}
});
