import React, { Component } from 'react';
import ListContacts from './ListContacs'
import * as ContactsAPI from './utils/ContactAPI' 
import './index.css'


class App extends Component {
  state = {
    contacts: []
  }
//use componentDidMount for AJAX API requests
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({contacts})
    })
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    })) 
  }

  render() {
    return (
      <div>
        <ListContacts 
          onDeleteContacts={this.removeContact} 
           contacts={this.state.contacts} />
      </div>
    );
  }
}

export default App;
