//SCSS file
import '../scss/main.scss';

'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import { Button } from 'react-bootstrap';
// let socket = io('http://localhost:3000');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// status: 'disconnected',
      // title: '',
			message: []
		}

		this.connect = this.connect.bind(this);
		this.handleData = this.handleData.bind(this);
	}

	componentWillMount() {
    this.socket = io('https://fa663fef.ngrok.io');
    this.socket.on('connect', this.connect);
    // this.socket.on('disconnect', this.disconnect.bind(this));
	}

	connect() {
		// alert("connected!");
    this.setState({ status: 'connected' });
	}
	// disconnect() {
  //   this.setState({ status: 'disconnected' });
	// }
	componentDidMount() {
	  // socket.on('news', this.handleData)
		// socket.on('news', function(data){
		// 	console.log(data);
		// });
		this.socket.on('test', this.handleData);

  }

	handleData(dataObj) {
		let data = JSON.parse(dataObj);
		console.log("handledata", data);
		// console.log("this state: " +this.state.message);
		this.setState({ message: this.state.message.concat(data) });
	}

	render() {
		// this.socket.on('test', function(data) {
		// 	console.log('test in did mount in socket' + data);
		// });
		console.log("in render: "+this.state.message)
		let commit;
			if (this.state.message !== []) {
			let obj = this.state.message;
			commit = obj.map(function(info, i){
				return (
					<div key={i}>
						<p><b>{ info.name }:</b> { info.message }</p>
	    		</div>
				)
			});
		}
	else commit = null;

    return (
			<div className="containing-div-all">
				<h1>GIT TOGETHER</h1>
      		<div className="containing-div">
						<div className="panel panel-default commits-container">
							<div className="panel-heading">
								<h5 className="panel-title">Commit Visualization</h5>
							</div>
							<div className="panel-body"> { commit } </div>
       			</div>

						<div className="panel panel-default terminal-container">
							<div className="panel-heading">
								<h5 className="panel-title">Terminal Container</h5>
							</div>
							<div className="panel-body"></div>
       			</div>
      			</div>
						</div>
    );
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
