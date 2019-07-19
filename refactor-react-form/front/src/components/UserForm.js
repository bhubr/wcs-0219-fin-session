import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      firstname: '',
      lastname: '',
      address: '',
      postcode: '',
      city: '',
      phone: '',
      avatar: '',
      subscribeNewsletter: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleChangeCheckbox(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      [name]: !prevState[name]
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users', this.state);
    } catch (err) {
      alert(`Error ${err.message}`);
    }
    
  }

  render() {
    const {
      email,
      password,
      firstname,
      lastname,
      address,
      postcode,
      city,
      phone,
      avatar,
      subscribeNewsletter
    } = this.state;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" value={email} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" value={password} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="firstname">First name</Label>
            <Input type="firstname" name="firstname" value={firstname} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="lastname">Last name</Label>
            <Input type="lastname" name="lastname" value={lastname} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="address" name="address" value={address} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="postcode">Post code</Label>
            <Input type="postcode" name="postcode" value={postcode} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input type="city" name="city" value={city} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input type="phone" name="phone" value={phone} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="avatar">Avatar</Label>
            <Input type="avatar" name="avatar" value={avatar} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="subscribeNewsletter"
                checked={subscribeNewsletter ? 'checked' : ''}
                onChange={this.handleChangeCheckbox}
              />{' '}
              Subscribe to newsletter
            </Label>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </Container>
    );
  }
}


export default UserForm;
