import React, { Component } from 'react';
import ListContacts from './ListContacs'
import contacts from './db/contacts.js'

class App extends Component {
  render() {
    return (
      <div>
        <ListContacts contacts={contacts} />
      </div>
    );
  }
}

export default App;
