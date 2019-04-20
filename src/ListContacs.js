import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContacts: PropTypes.func.isRequired
  };

  state = {
    query: ""
  };

  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  clearQuery = () => {
    this.setState({ query: "" });
  };
  render() {
    const { contacts, onDeleteContacts } = this.props;
    const { query } = this.state;

    let showingContacts;
    if (query) {
      const match = new RegExp(escapeRegExp(this.state.query), "i");
      showingContacts = contacts.filter(contact => match.test(contact.name));
    } else {
      showingContacts = contacts;
    }

    showingContacts.sort(sortBy("name"));
    return (
      <div className="list-contacts">
        {/* {JSON.stringify(this.state)} to view the searched query on UI*/}
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="search contacts"
            value={this.state.query}
            onChange={event => this.updateQuery(event.target.value)}
          />
          <Link 
            to="/create"
            className="add-contact"
          >Add Contact
          </Link>
        </div>

        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              Now Showing {showingContacts.length} of {contacts.length} total
            </span>
            <button onClick={this.clearQuery}>Show All</button>
          </div>
        )}
        <ol className="contact-list">
          {showingContacts.map(contact => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}
              />
              <div className="contact-details">
                <p> {contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button
                onClick={() => onDeleteContacts(contact)}
                className="contact-remove"
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContacts: PropTypes.func.isRequired
};
export default ListContacts;
