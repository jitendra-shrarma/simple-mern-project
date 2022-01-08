import React, {Component} from "react";
import {FormControl, Modal, Button, Container, Row, InputGroup} from 'react-bootstrap';

class RemoveUserButton extends Component {
	constructor(props) {
		super(props);
		this.state = {id: "", isOpen: false};
	}

	openModal = () => {this.setState({ isOpen: true })};
	closeModal = () => {
		this.setState({ id: ""});
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
						<Modal.Title>Remove User</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Container>
							<Row>
								<InputGroup className="mb-3">
									<InputGroup.Text id="id" className="col-3">User ID</InputGroup.Text>
									<FormControl
										name="id"
										type="text"
										onChange={this.handleInputChange}
										value={this.state.id}
										placeholder="User ID"
									/>
								</InputGroup>
							</Row>
						</Container>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" type="submit" onClick={this.submitForm}>
							Remove User
						</Button>
						<Button variant="secondary" type="button" onClick={this.closeModal}>
							Close
						</Button>
					</Modal.Footer>
				</Modal> 
			: 
				this.clearForm() && null
			}
			<Button variant={this.props.variant} onClick={this.openModal}>Remove User</Button>
		</div>
    	)
	}
}


export default RemoveUserButton;