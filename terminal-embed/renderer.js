// Creates a new instance of the Terminal class from xterm.js with the specified options.
const term = new Terminal({
  rightClickSelectsWord: true,
  fontSize: 16,
  fontFamily: "'Cartograph CF Light', Consolas, 'Courier New', monospace",
  theme: {
    background: "#1e1e1e",
  },
  experimentalCharAtlas: "dynamic",
  cursorStyle: "bar",
  cursorBlink: true,
});

// Set up the terminal addons and load them.
const fitAddon = new FitAddon.FitAddon();
term.loadAddon(fitAddon);

const searchAddon = new SearchAddon.SearchAddon();
term.loadAddon(searchAddon);

const webLinksAddon = new WebLinksAddon.WebLinksAddon();
term.loadAddon(webLinksAddon);

// Opens the terminal in the HTML element with the ID "terminal".
term.open(document.getElementById("terminal"));
// Fits the terminal to the size of the window.
fitAddon.fit();

// Prints the given text to the terminal.
// \x1B[38;2;252;133;174m is the color pink. \x1B[0m resets the color.
// \n\r is a new line and returns the cursor to the start of the line.
term.write("Hello from \x1B[38;2;252;133;174mxterm.js\x1B[0m \n\r");
term.write(">");

// Listens for data entered into the terminal by the user using the term.onData event and sends it to the main process.
// Sends the data to the main process using the terminal.toTerm method exposed by the preload script
term.onData((data) => {
  terminal.toTerm(data);
});

// Event listeners for incoming data from the main process using the terminal.incData method exposed by the preload script
// Writes the data to the terminal using the term.write method.
terminal.incData((event, data) => {
  term.write(data);
});

// Resizes the terminal when the window is resized.
// The Math.max function ensures that the terminal is at least 1 column and 1 row in size.
term.onResize((size) => {
  ptyProcess.resize(
    Math.max(size ? size.cols : term.cols, 1),
    Math.max(size ? size.rows : term.rows, 1)
  );
});
