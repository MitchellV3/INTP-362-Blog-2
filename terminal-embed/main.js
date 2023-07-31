const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const os = require("os");
const pty = require("node-pty");

// Set the shell depending on the OS
const shell = os.platform() === "win32" ? "cmd.exe" : "bash";
let ptyProcess;
let win;

// Create the browser window.
// The preload script is specified here.
function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  // Load the index.html file
  win.loadFile("index.html");

  // Kill the pty process and set win to null when the window is closed
  win.on("closed", () => {
    ptyProcess.kill();
    win = null;
  });

  // Spawn a new pty process with the specified shell and options
  ptyProcess = pty.spawn(shell, ["/K", "prompt $G"], {
    name: "xterm-color",
    cwd: process.env.HOME,
    env: process.env,
  });

  // Attach the onData event handler after the pty process is created
  // Send incoming data from the pty process to the renderer process
  ptyProcess.onData((data) => {
    win.webContents.send("terminal.incData", data);
  });
}

// Create the window when the app is ready
app.whenReady().then(() => {
  createWindow();

  // Handle incoming data from the renderer process
  // Write the data to the pty process
  ipcMain.handle("terminal.toTerm", (event, data) => {
    ptyProcess.write(data);
  });

  // Create a new window if there are no windows when the app is activated
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // Quit the app when all windows are closed (except on macOS)
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});
