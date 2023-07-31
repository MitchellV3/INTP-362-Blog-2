/*
 * This script uses the contextBridge and ipcRenderer modules from the electron package to expose a terminal object in the main world of the renderer process.
 * The terminal object has two methods: toTerm and incData.
 */

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("terminal", {
  // This method sends data from the renderer process to the main process using the ipcRenderer.invoke method.
  // The data is sent with the channel "terminal.toTerm".
  toTerm: (data) => ipcRenderer.invoke("terminal.toTerm", data),

  // This method listens for incoming data from the main process on the "terminal.incData" channel using the ipcRenderer.on method.
  // The provided callback function is called whenever data is received.
  incData: (callback) => ipcRenderer.on("terminal.incData", callback),
});
