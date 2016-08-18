import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Terminal from 'xterm';
import {ipcRenderer} from 'electron-prebuilt'


class Term extends Component {
	componentDidMount() {
		this.loadTerminal(ReactDOM.findDOMNode(this))
	}

	loadTerminal(node) { 
		const term = new Terminal({
		});
		term.cursorBlink = true;
		if (term) console.log("yes term")
		term.open(node);
		term.prompt = function () {
    	term.write('\r\n' + '$ ');
  	};
		term.prompt();

		term.on('key', function (key, ev) {
			var printable = (
			!ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
			);
			if (ev.keyCode === 13) term.prompt();
      else if (ev.keyCode === 8) {
			if (term.x > 2) {
			term.write('\b \b');
			}
			} else if (printable) {
			term.write(key);
			}
		})

    term.on('paste', function (data, ev) {
    term.write(data);
  });
}
	
	render () {
		//let term = new terminal();
		//term.fit();
		return (
			<div id="terminal" style={{backgroundColor: "#000"}} >
			</div>
		)
	}
}

export default Term