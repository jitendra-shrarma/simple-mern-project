import React, {Component} from "react";
import {FormControl, Modal, Button, Form} from 'react-bootstrap';

class AddUserButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				name: "",
				email: "",
				address: "",
				joining_date: "",
			},
			isOpen: false,
			isValidated: true,
			errors: {
				name: "",
				email: "",
				address: "",
				joining_date: "",
			}
		};
	}
	
	openModal = () => {this.setState({ isOpen: true })};
  	closeModal = () => {
		this.setState({ user: { 
			name: "", 
			email: "",
			address: "", 
			joining_date: "",
		} });
		this.setState({ errors: {
			name: "", 
			email: "",
			address: "", 
			joining_date: "",
		} });
		this.setState({ isValidated: true });
		this.setState({ isOpen: false });
	};

	handleInput = (event) => {
		const { name, value } = event.target;
		this.setState({ user: {...this.state.user, [name]: value } });
	}

	validateForm = () => {
		let user = this.state.user;
		let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		this.state.isValidated = true;
		console.log(this.state.user);
		if ( !user.name ){
			this.state.errors.name = "name is invalid!";
			this.state.isValidated = false;
		}
		if ( !user.email || !user.email.match(pattern) ){
			this.state.errors.email = "email is invalid!";
			this.state.isValidated = false;
		}
		if ( !user.address ){
			this.state.errors.address = "address is invalid!";
			this.state.isValidated = false;
		}
		if ( !user.joining_date ){
			this.state.errors.joining_date = "date is invalid!";
			this.state.isValidated = false;
		}
		console.log(this.state.errors, this.state.isValidated);
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
							<Modal.Title>Add User</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<FormControl
									name="name"
									type="text"
									value={this.state.user.name}
									placeholder="User's Name"
									onChange={this.handleInput}
									required
									isInvalid
								/>
								<Form.Control.Feedback type="invalid">
									{this.state.errors.name}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<FormControl
									name="email"
									type="email"
									value={this.state.user.email}
									placeholder="User's Email ID"
									onChange={this.handleInput}
									required
									isInvalid
								/>
								<Form.Control.Feedback type="invalid">
									{this.state.errors.email}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Label>Address</Form.Label>
								<FormControl
									name="address"
									type="text"
									value={this.state.user.address}
									placeholder="User's Address"
									onChange={this.handleInput}
									required
									isInvalid
								/>
								<Form.Control.Feedback type="invalid">
									{this.state.errors.address}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Label>Joining Date</Form.Label>
								<FormControl
									name="joining_date"
									type="date"
									value={this.state.user.joining_date}
									onChange={this.handleInput}
									required
									isInvalid
								/>
								<Form.Control.Feedback type="invalid">
									{this.state.errors.joining_date}
								</Form.Control.Feedback>
							</Form.Group>
						
						</Modal.Body>
						<Modal.Footer>
							<Button variant="primary" type="submit" onClick={this.handleSubmit}>
								Add User
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
			<Button variant={this.props.variant} onClick={this.openModal}>Add User</Button>
		</div>
    	)
	}
}


export default AddUserButton;