import React, { Component } from "react";
import { Route } from "react-router-dom";
import ListContacts from "./ListContacs";
import CreateContact from "./CreateContact";
import * as ContactsAPI from "./utils/ContactAPI";
import "./index.css";

class App extends Component {
  state = {
    contacts: []
  };
  //use componentDidMount for AJAX API requests - If you need to dynamically fetch data or run an Ajax request, you should do it in componentDidMount()
  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState({ contacts });
    });
  }

  removeContact = contact => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }));

    ContactsAPI.remove(contact);
  };
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContacts={this.removeContact}
            />
          )}
        />
        <Route path="/create" component={CreateContact} />
      </div>
    );
  }
}

export default App;
