import React, {Component} from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import UsersList from "./components/UserList.component";


export default class App extends Component {
  	render(){
		return (
			<Container fluid="fluid-md">
				<Switch>
					<Route exact path={["/", "/users"]} component={UsersList} />
				</Switch>
			</Container>
		);
	}
}
