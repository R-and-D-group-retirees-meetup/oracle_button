"use strict";

const DEFAULT_VOICE = "kiritan";

function getCurrentVoice() {
	const current = localStorage.current;
	return current ? current : DEFAULT_VOICE;
}

function setCurrentVoice(selected) {
	localStorage.current = selected;
}

function getOracleButtonVisibility() {
	const isOracleButtonVisible = localStorage.isOracleButtonVisible;
	return isOracleButtonVisible ? isOracleButtonVisible : true;
}

function setOracleButtonVisiblity(shouldBeVisible) {
	localStorage.isOracleButtonVisible = shouldBeVisible;
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
	const audioURL = chrome.extension.getURL(`sounds/${getCurrentVoice()}/oracle.wav`);
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
