//SCSS file
import '../scss/main.scss';

'use strict';
import io from 'socket.io-client';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 'disconnected',
      title: ''
		}
	}

	componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect.bind(this));
    this.socket.on('disconnect', this.disconnect.bind(this));
	}

	connect() {
    this.setState({ status: 'connected' });
	}

	disconnect() {
    this.setState({ status: 'disconnected' });
	}

	render() {
    return (
      <div>
      	<div className="myDiv">
      	  <h1>Hello Electron!</h1>

      	  <a href="/auth/github">Login /w Github</a>
      	</div>
      </div>
    );
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);