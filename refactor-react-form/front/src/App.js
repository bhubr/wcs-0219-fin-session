import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import UserList from './components/UserList';
import AddUser from './components/UserForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Switch>
        <Route path="/" exact component={UserList} />
        <Route path="/add-user" exact component={AddUser} />
      </Switch>
    </div>
  );
}

export default App;
