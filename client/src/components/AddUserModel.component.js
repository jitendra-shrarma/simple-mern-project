import React, {Component} from "react";
import {FormControl, Modal, Button, Container, Row, Col, InputGroup} from 'react-bootstrap';

class AddUserButton extends Component {
	constructor(props) {
		super(props);
		this.state = {name: "", email: "", address: "", joining_date: "", isOpen: false};
	}
	
	openModal = () => {this.setState({ isOpen: true })};
  	closeModal = () => {
		this.setState({ name: "" });
		this.setState({ email: "" });
		this.setState({ address: "" });
		this.setState({ joining_date: "" });
		this.setState({ isOpen: false });
	};

	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({[name]: value });
	}

	clearForm = () => {
		Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
	}

	submitForm = () => {
		const data = this.state;
		this.clearForm();
		this.closeModal();
		delete data.isOpen;
		this.props.handleFormData ? this.props.handleFormData(data) : console.log(data);
	}

  	render(){
    	return(
		<div>
			{ this.state.isOpen ? 
				<Modal 
					show={this.state.isOpen} 
					onHide={this.closeModal}
				>
					<Modal.Header closeButton>
						<Modal.Title>Add User</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Container>
							<Row>
								<InputGroup className="mb-3">
									<InputGroup.Text id="name" className="col-3">Name</InputGroup.Text>
									<FormControl
										name="name"
										type="text"
										onChange={this.handleInputChange}
										value={this.state.name}
										placeholder="User's Name"
									/>
								</InputGroup>
							</Row>
							<Row>
								<InputGroup className="mb-3">
									<InputGroup.Text id="email" className="col-3">Email</InputGroup.Text>
									<FormControl
										name="email"
										type="email"
										onChange={this.handleInputChange}
										value={this.state.email}
										placeholder="User's Email ID"
									/>
								</InputGroup>
							</Row>
							<Row>
								<InputGroup className="mb-3">
									<InputGroup.Text id="address" className="col-3">Address</InputGroup.Text>
									<FormControl
										name="address"
										type="text"
										onChange={this.handleInputChange}
										value={this.state.address}
										placeholder="User's Address"
									/>
								</InputGroup>
							</Row>
							<Row>
								<InputGroup className="mb-3">
									<InputGroup.Text id="joining_date" className="col-3">Joining Date</InputGroup.Text>
									<FormControl
										name="joining_date"
										type="datetime-local"
										onChange={this.handleInputChange}
										value={this.state.joining_date}
									/>
								</InputGroup>
							</Row>
						</Container>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" type="submit" onClick={this.submitForm}>
							Add User
						</Button>
						<Button variant="secondary" type="button" onClick={this.closeModal}>
							Close
						</Button>
					</Modal.Footer>
				</Modal> 
			: 
				this.clearForm() && null
			}
			<Button variant={this.props.variant} onClick={this.openModal}>Add User</Button>
		</div>
    	)
	}
}


export default AddUserButton;