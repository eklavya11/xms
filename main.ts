"use strict";

// Import parts of electron to use.
import {app, BrowserWindow} from "electron";
import path from "path";
import url from "url";

// Keep a global reference of the window object, if you don"t, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null = null;

// Keep a reference for dev mode.

// TODO: Not working.
const dev: boolean = true;//process.env.NODE_ENV === "development";

console.log(`Development mode: ${dev}`);

function createWindow(): void {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1250,
		height: 768,
		show: false,
		//frame: false,
		center: true,
		title: "XMS",
		hasShadow: true,
		minWidth: 1140,
		transparent: true,
		resizable: true,

		webPreferences: {
			// Explicitly set node integration.
			nodeIntegration: true
		}

		// TODO: Prevents loading from SCSS style sheets via @import (which translates to 'require()' under the hood).
		/* webPreferences: {
			nodeIntegration: false,
			preload: "./preload.js"
		} */
	});

	mainWindow.on("unresponsive", () => {
		// TODO: Restart window after timeout + check if still unresponsive?
	});

	// .. and load the index.html of the app.
	let indexPath: string;

	if (dev && process.argv.indexOf("--noDevServer") === -1) {
		indexPath = url.format({
			protocol: "http:",

			// Use port 7070 to avoid conflicts with other apps.
			host: "localhost:7070",
			pathname: "index.html",
			slashes: true
		});
	}
	else {
		indexPath = url.format({
			protocol: "file:",
			pathname: path.join(__dirname, "dist", "index.html"),
			slashes: true
		});
	}

	mainWindow.loadURL(indexPath);

	// Don"t show until we are ready and loaded
	mainWindow.once("ready-to-show", () => {
		mainWindow!.show();

		// Open the DevTools automatically if developing
		if (dev) {
			mainWindow!.webContents.openDevTools();
		}
	});

	// Emitted when the window is closed.
	mainWindow.on("closed", function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q.
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On macOS it is common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});