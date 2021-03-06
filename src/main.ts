import { app, BrowserWindow } from "electron";
import * as path from "path";
import { windowBuilder } from "./window-builder";

let mainWindow: BrowserWindow;

function createWindow(): BrowserWindow {
  return windowBuilder
      .withSize(800, 600)
      .withPreloader(path.join(__dirname, 'preload.js'))
      .withHtmlFile('../index.html')
      .build();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  mainWindow = createWindow();
  createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
