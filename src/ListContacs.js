import React, { Component } from 'react';

class ListContacts extends Component {
  //the only property on our component class that we alwayse have to specift
  render() {
    console.log('props', this.props)
    return <ol className="contact-list" />;
  }
}

export default ListContacts;
