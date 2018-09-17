"use strict";

const DEFAULT_VOICE = "kiritan";

/**
 * @type {Config}
 */
const DEFAULT_CONFIG = {
	voice: "kiritan",
	isOracleButtonVisible: true
};
Object.freeze(DEFAULT_CONFIG);

const LOCAL_STORAGE_KEY = "oracle_button_config";
/**
 * 
 * @param {Object} config 
 * @returns {boolean}
 */
function isValidConfig(config) {
	return config.hasOwnProperty("voice") && config.hasOwnProperty("isOracleButtonVisible");
}

/**
 * @returns {Config}
 */
function getConfig() {
	const config = localStorage.getItem(LOCAL_STORAGE_KEY);
	if (!config) {
		return DEFAULT_CONFIG;
	}

	try {
		const parsedConfig = JSON.parse(config);
		return isValidConfig(parsedConfig) ? parsedConfig : DEFAULT_CONFIG;
	} catch {
		console.warn("Unexpected Config structure");
		return  DEFAULT_CONFIG;
	}
	
}

/**
 * @param {Config} config
 */
function setConfig(config) {
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
}

/**
 * @returns {string}
 */
function getCurrentVoice() {
	const config = getConfig();
	return config.voice;
}

/**
 * @param {string} selected
 */
function setCurrentVoice(selected) {
	const config = getConfig();
	setConfig({
		voice: selected,
		isOracleButtonVisible: config.isOracleButtonVisible
	});
}

/**
 * @returns {boolean}
 */
function getOracleButtonVisibility() {
	return getConfig().isOracleButtonVisible;
}

/**
 * @param {boolean} shouldBeVisible
 */
function setOracleButtonVisiblity(shouldBeVisible) {
	const config = getConfig();
	setConfig({
		voice: config.voice,
		isOracleButtonVisible: shouldBeVisible
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
	const current = getConfig().voice;
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


