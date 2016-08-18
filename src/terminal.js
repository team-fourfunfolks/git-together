import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Term extends Component {


	componentDidMount() {
		this.loadTerminal(ReactDOM.findDOMNode(this))
	}

	loadTerminal(node) { 
		const term = new Terminal({
		});
		term.cursorBlink = true;
		term.open(node);
		ipcRenderer.once('terminal-start', (event, arg) => {
			term.write(arg)
		})

		term.on('input', function(input) {
			ipcRenderer.send('term-input', input)
		})
		
		ipcRenderer.on('reply', (event, arg) => {
			term.write(arg)
		})
		
		term.prompt =  () => {
    	term.write('\r\n' + '$ ');
  	};
		term.prompt();

		term.on('key', function(key, ev) {
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
			<div id="terminal" style={{backgroundColor: "#000", color: '#ddd'}} >
			</div>
		)
	}
}

export default Term