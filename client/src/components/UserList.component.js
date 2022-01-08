import React from "react";
import UserDataService from "../services/user.service";

import {Container, Row, Col, Stack, Table} from "react-bootstrap";
import AddUserButton from "./AddUserModel.component";
import RemoveUserButton from "./RemoveUserModel.component";


export default class UsersList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {users: []};
		this.getUsers();
	}

	setUsers = (data) => {
		this.setState({users: data});
	}
	
	getUsers = () => {
		UserDataService.getAll()
			.then((response) => {
				this.setUsers(response.data);
			})
			.catch((e) => {
				console.log(e);
			}
		);
	}
	
	addUser = (user) => {
		UserDataService.create(user)
			.then((response) => {
				console.log(response.data);
				this.setState((prevState, props) => {
					return { users: [...prevState.users, response.data] };
				})		
			})
			.catch((e) => {
				console.log(e);
			}
		);
		console.log("added user", user);
	}

	removeUser = (id) => {
		if (id) {
			UserDataService.remove(id)
				.then((response) => {
					this.setState((prevState, props) => {
						prevState.users.splice(prevState.users.findIndex(
							user => user.id === id
						), 1);
						return prevState;
					})		
				})
				.catch((e) => {
					console.log(e);
				}
			);
		}
		console.log("removed user", this.state.users)
	}

	renderUser(user, index) {
		let joining_date = new Date(user.joining_date).toLocaleString();
		return (
		  	<tr key={user.id}>
				<td>{user.id}</td>
				<td>{user.name}</td>
				<td>{user.email}</td>
				<td>{user.address}</td>
				<td>{joining_date}</td>
		  	</tr>
		)
	}

  	render(){
    	return (
			<div>
				<Container fluid="fluid-md" className="mx-0" style={{"background": "#803482"}}>
					<Container>
						<Row className="p-3" >
							<Col>
								<Stack direction="horizontal" className="float-end" gap={3}>
									<AddUserButton 
										variant="success"
										handleFormData={(data) => this.addUser(data)}
									/>
									<RemoveUserButton 
										variant="danger"
										handleFormData={(data) => this.removeUser(data.id)}
									/>
								</Stack>
							</Col>
						</Row>
					</Container>
				</Container>
				<Container className="mt-3">
					<Table bordered striped hover variant="light">
						<thead>
							<tr>
								<th>User ID</th>
								<th>Name</th>
								<th>Email</th>
								<th>Address</th>
								<th>Joining Date</th>
							</tr>
						</thead>
						<tbody>
							{this.state.users.map(this.renderUser)}
						</tbody>
					</Table>
				</Container>
			</div>
    	);
	}
}