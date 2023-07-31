# The Electron App Development Cycle

![Electron Logo](./img/logo.png)

In my last post, I covered the basic concepts of Electron, why it has such a _divisive_ reputation, why you would choose it, and how to get started with it. As with basically any framework, it can be really difficult to grasp the concepts until you've actually built something with it. This time, I'll be walking through the development cycle of the start of a project.

## The Project

I'm going to be walking through the process of creating a small portion of a personal project I've been working on. We'll be creating an Electron app with an integrated, usable terminal. This will be done with the help of [xterm.js](https://xtermjs.org/), and [node-pty](https://github.com/microsoft/node-pty). For the front-end, we won't be using any frameworks, just plain old HTML, CSS, and JavaScript, for simplicity's sake.

### Alright, what do these do?

#### xterm.js

- xterm.js is a front-end component that provides a terminal emulator for web apps, we'll use it to render the terminal in our Electron app.

#### node-pty

- node-pty is a module that provides a pseudo-terminal interface for Node.js, we'll use it to create a shell session for the terminal emulator to interact with. Which essentially means that it will give us proper read and write functionality for the terminal to properly interact with our computer.

## The Setup

I touched on the setup a little bit in my last post, but ultimately, your best bet is to read the official [Electron Quick Start Guide](https://www.electronjs.org/docs/tutorial/quick-start). What I _will_ do is quickly go over installing the dependencies we'll need for this project, and setting up the basic structure of the project.

### Installing Dependencies

Assuming you have a basic Electron project set up, we basically just need to install node-pty, xterm.js, and any addons we want to use with xterm.js. The terminal should be open in the root directory of your project, and we'll run the following command:

```bash
npm install node-pty xterm xterm-addon-fit xterm-addon-web-links xterm-addon-search
```

This will install all of the dependencies we need for this project. You can check that they were installed by looking at the `package.json` file in the root directory of your project. You should see something similar to this:

```json
{
  "dependencies": {
    "node-pty": "^1.0.0",
    "xterm": "^5.2.1",
    "xterm-addon-fit": "^0.7.0",
    "xterm-addon-search": "^0.12.0",
    "xterm-addon-web-links": "^0.8.0"
  }
}
```

### Project Structure

The project structure is pretty simple, we’ll need an index.html file to display the terminal, a main.js file to set up the Electron app and handle communication between the renderer process and the main process, a renderer.js file to set up and configure the terminal in the renderer process, and a preload.js file to expose methods for communication between the renderer process and the main process. Everything can just be kept in the root directory of the project to keep things simple.

## Setting up the Electron App
