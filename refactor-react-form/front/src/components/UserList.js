import React from 'react';
import axios from 'axios';
import { Alert, Container, Table } from 'reactstrap';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      errorMessage: ''
    };
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const res = await axios.get('/api/users');
      const { data: users } = res;
      this.setState({ users });
    } catch (err) {
      this.setState({
        errorMessage: err.message
      });
    }
  }
  render() {
    const { users, errorMessage } = this.state;
    return (
      <Container>
        {
          errorMessage && (
            <Alert color="danger">
              {errorMessage}
            </Alert>
          )
        }
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td><img className="UserList-avatar" src={user.avatar} alt={user.firstname} /></td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default UserList;
