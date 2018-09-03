import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Markdown from "react-markdown";
import { UnControlled as CodeMirror } from 'react-codemirror2';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started. <code>src/App.js</code> and save to reload.
        </p>
        <Markdown/>
        <Markdown source={"# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)."} /> 
      </div>
    );
  }
}

export default App;
