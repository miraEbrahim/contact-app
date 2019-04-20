import React, { Component } from 'react';
import ListContacts from './ListContacs'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactAPI' 
import './index.css'


class App extends Component {
  state = {
    screen: 'list', // list, create
    contacts: []
  }
//use componentDidMount for AJAX API requests - If you need to dynamically fetch data or run an Ajax request, you should do it in componentDidMount()
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({contacts})
    })
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    })) 

  ContactsAPI.remove(contact)
  }
  render() {
    return (
      <div className="app">
        {this.state.screen === 'list' && (
          <ListContacts 
            contacts={this.state.contacts}
            onDeleteContacts={this.removeContact} 
            onNavigate={() => {
              this.setState({screen: 'create'})
            }} 

          />
        )}
        {this.state.screen === 'create' && (
          <CreateContact />
        )}
      </div>
    );
  }
}

export default App;
