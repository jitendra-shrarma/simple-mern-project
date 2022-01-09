import React, {Component} from "react";
import {FormControl, Modal, Button, Form} from 'react-bootstrap';

export default class RemoveUserButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				id: "",
			},
			isOpen: false,
			isValidated: true,
			errors: {
				id: "",
			}
		};
	}
	openModal = () => {this.setState({ isOpen: true })};
	closeModal = () => {
		this.setState({ user: {id: "" }});
		this.setState({ isValidated: true});
		this.setState({ errors: {id: ""}});
		this.setState({ isOpen: false });
	};

	handleInput = (event) => {
		const { name, value } = event.target;
		this.setState({user: {[name]: value }});
	}

	validateForm = () => {
		let id = this.state.user.id;
		let pattern = /^[\d\w]{24}$/i;
		this.state.isValidated = false;
		if ( !id ){
			this.setState({errors: {id: "user's id invalid!"}});
		} else if ( !id.match(pattern) ) {
			this.setState({errors: {id: "user's id length must be equal 24."}});
		} else {
			this.state.isValidated = true;
		}
	}
	
	handleSubmit = (event) => {
		this.validateForm();
		console.log(this.state.isValidated);
		if ( !this.state.isValidated ){
			event.preventDefault();
      		event.stopPropagation();
		} else {
			const data = this.state.user;
			this.closeModal();
			this.props.handleFormData ? this.props.handleFormData(data) : console.log(data);
		}
	}

  	render(){
    	return(
		<div>
			{ this.state.isOpen ? 
				<Modal 
					show={this.state.isOpen} 
					onHide={this.closeModal}
				>
					<Form  onSubmit={this.handleSubmit} validated={this.state.isValidated} noValidate>
						<Modal.Header closeButton>
							<Modal.Title>Remove User</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Group controlId="validationRemoveUserID">
								<Form.Label>User ID</Form.Label>
								<FormControl
									name="id"
									type="text"
									value={this.state.user.id}
									placeholder="User ID"
									onChange={this.handleInput}
									required
									isInvalid
								/>
								<Form.Control.Feedback type="invalid">
									{this.state.errors.id}
								</Form.Control.Feedback>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="primary" type="submit">
								Remove User
							</Button>
							<Button variant="secondary" type="button" onClick={this.closeModal}>
								Close
							</Button>
						</Modal.Footer>
					</Form>
				</Modal> 
			: 
				null
			}
			<Button variant={this.props.variant} onClick={this.openModal}>Remove User</Button>
		</div>
    	)
	}
};
