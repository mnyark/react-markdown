import React, { Component } from "react";
import Markdown from "react-markdown";
import { UnControlled as CodeMirror } from "react-codemirror2";
import Peer from "peerjs";
import Automerge from "automerge";
import "./App.css";
import "codemirror/mode/markdown/markdown";
import debounce from "lodash.debounce";


class App extends Component {
  state = {
    code:
      "# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson).",
    peerId: null,
    id: null,
    initialized: false,
    peer: new Peer(),
    conn: null,
    connected: false
  };

  componentWillMount = () => {
    const { peer } = this.state;
    peer.on("open", id => this.setState({ id, initialized: true }));
    peer.on("connection", conn => {
      if(window.confirm(`Peer ${conn.peer} wants to view your editor`)){
        conn.on("open", () => conn.send(this.state.code));
        conn.on("data", data => this.setState({ code: data }));
        this.setState({ conn });
      }else{
        conn.close();
      }
    });
  };

  onChange = debounce((editor,data,value) => {
    const { conn } = this.state;
    if (conn) conn.send(value);
    this.setState({ code:value });
  },10);

  onInputChange = event => {
    const peerId = event.target.value;
    console.log(peerId);
    this.setState({ peerId });
  };

  handleSubmit = event => {
    const { peerId, peer , id} = this.state;
    if(peerId === id){
      window.alert("Sorry!. You cannot connect to yourself")
    }else{
      let conn = peer.connect(peerId);
      conn.on("open", () => console.log("open"));
      conn.on("data", data => this.setState({ code: data }));
      this.setState({ conn });
      console.log("connect");
    }
    event.preventDefault();
  };
  render() {
    return (
      

      <div className = "container-fluid" style={{  margin: "auto", paddingTop: "20px" }}>
      <div className = "row">
      <div className = "col">
        <h4>your id: {this.state.id}</h4>
        </div>
        
        <div className = "flex-row-reverse">
        <form className = "col d-inline">
          <input className = "" placeholder="enter your peer's id" onChange={this.onInputChange} />
          <button className = "t btn btn-outline-light" onClick={this.handleSubmit}>connect</button>
        </form>
        </div>
        </div>
        <div style={{paddingTop: "1em"}}>
          <CodeMirror
            options={{ lineNumbers: true, mode: "markdown" }}
            onChange={this.onChange}
            value={this.state.code}
          />
        </div>
        <div>
          <Editor source={this.state.code} />
        </div>
      </div>
    );
  }
}

class Editor extends Component {
  render() {
    return <Markdown source={this.props.source} />;
  }
}

export default App;
